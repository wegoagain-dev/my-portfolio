---
title: "How I connect to my AI agent with SSH keys"
description: "My phone suddenly couldn't sign in to my homelab. The fix was SSH keys, so here's how they actually work and how I use them to reach Hermes."
date: 2026-11-13
authors:
  - tawfiq
tags:
  - ssh
  - security
  - homelab
---

## Introduction

I run [Hermes Agent](https://hermes-agent.nousresearch.com), an open-source AI agent, on an old ThinkPad at home. It's the same box that runs my K3s homelab. I talk to it from Hermes Desktop on my Mac and from the Hermes app on my iPhone.

One morning the phone app stopped connecting with this error:

> SSH server doesn't allow password sign-in, use private key instead

Nothing was broken. A few days earlier I'd turned off password logins for SSH on the ThinkPad, and the phone was still trying to sign in with a password. Fixing it properly meant giving the phone its own SSH key, and that made me sit down and understand how key pairs actually work instead of just copying commands.

This post covers how everything connects, why I turned passwords off, and how the public/private key part works.

## How everything connects

I don't open any ports to the internet. My devices reach the ThinkPad over [Tailscale](https://tailscale.com), and for Hermes, SSH is the only way in.

```txt showLineNumbers=false
iPhone (Hermes app) / Mac (Hermes Desktop)
        │  Tailscale
        ▼
ThinkPad, port 22 (SSH, keys only)
        │  port forward inside the SSH connection
        ▼
Hermes, listening on 127.0.0.1 only
```

Hermes only listens on `127.0.0.1`, which means it only accepts connections from the ThinkPad itself. The apps reach it by opening an SSH connection and forwarding a port through it. If you can't get through SSH, you can't get to Hermes at all.

You can do the same thing by hand from a terminal:

```sh title="Mac" showLineNumbers=false
ssh -N -L 9119:127.0.0.1:9119 me@thinkpad
```

That forwards port 9119 on my Mac through the SSH connection to port 9119 on the ThinkPad, so `http://127.0.0.1:9119` on the Mac opens the dashboard.

## Turning off password logins

With passwords allowed, anything that can reach port 22 can keep guessing. Tailscale and my home network already limit who can reach it, but there's no reason to leave the option there when every device I own can use a key.

On Ubuntu it's two lines in a drop-in file:

```ini title="/etc/ssh/sshd_config.d/00-no-password.conf" showLineNumbers=false
PasswordAuthentication no
KbdInteractiveAuthentication no
```

:::warning[The file name matters]
Ubuntu cloud images ship `/etc/ssh/sshd_config.d/50-cloud-init.conf` with `PasswordAuthentication yes` in it. For most settings, `sshd` uses the **first** value it reads, and it reads the drop-in files in alphabetical order. A file called `99-no-password.conf` would lose to the cloud-init one and passwords would stay on. Starting the name with `00-` makes sure it's read first.
:::

Don't trust the file, check what `sshd` actually ended up with. The first command checks the config for mistakes before you reload anything:

```sh showLineNumbers=false
sudo sshd -t
sudo systemctl reload ssh
sudo sshd -T | grep -E 'passwordauth|kbdinteractive'
```

Both should say `no`. Keep your current SSH session open while you test a new one, so a mistake can't lock you out.

## How the public/private key thing works

An SSH key comes in two halves that are generated together.

- The **public key** goes on the server, in `~/.ssh/authorized_keys`. Think of it as a lock you're happy to fit on the door: anyone can see it, and it can't be used to get in.
- The **private key** stays on your device, and it's the only thing that fits that lock.

When the phone connects, the server sends it a random challenge. The phone signs the challenge with its private key and sends back the signature. The server checks the signature against the public key it has on file, and if it matches, you're in.

That's why it's better than a password:

- **The private key never crosses the network.** Only the signature does, and it's different every time, so there's nothing useful for anyone to capture and replay.
- **It can't be guessed.** A password can be guessed or tried over and over. An ed25519 key can't be brute-forced in any realistic amount of time.
- **Each device can have its own key.** That makes losing a device a one-line fix, which is the next section.

## One key per device

Every device gets its own key pair, and the comment at the end of each line says which device it belongs to:

```txt title="~/.ssh/authorized_keys (keys shortened)" showLineNumbers=false
ssh-ed25519 AAAAC3Nza...  macbook
ssh-ed25519 AAAAC3Nza...  iphone
```

If I lose the phone, I delete the `iphone` line and the phone is locked out. The Mac keeps working and nothing else has to change. With one shared key, or a password, I'd have to change it everywhere.

## Setting up the phone

The Hermes app could only **import** a key, not generate one. So I made the key on my Mac:

```sh title="Mac" showLineNumbers=false
ssh-keygen -t ed25519 -C "iphone" -f ~/.ssh/iphone_ed25519
```

That creates two files: `iphone_ed25519` (private) and `iphone_ed25519.pub` (public). The `.pub` line went into `~/.ssh/authorized_keys` on the ThinkPad, and I checked it worked from the Mac before touching the phone:

```sh title="Mac" showLineNumbers=false
ssh -i ~/.ssh/iphone_ed25519 me@thinkpad 'echo it works'
```

Then I AirDropped the private key to the phone, imported it in the app, and deleted the copy from Files.

:::caution[Moving a private key around]
The best practice is to generate the key **on the device that will use it**, so the private half never leaves it. I couldn't here, because the app only supports import. If you have to move a key, treat the file like a password: send it directly (AirDrop, not email or chat), import it, and delete every copy you don't need. Whoever has that file can log in.
:::

In the app, the connection settings are:

- **SSH host:** the ThinkPad's Tailscale name
- **User / port:** my Linux user, port `22`
- **Auth:** the imported private key
- **Dashboard:** `127.0.0.1`, port `9119`, through the SSH tunnel

## Why this matters for my day job

I work with Entra ID and Intune every day, and this turned out to be the same idea as the passwordless sign-in methods I deal with at work. Passkeys and Windows Hello for Business both use a key pair: the private key stays with the user (Windows Hello keeps it in the device's TPM), the service holds the public key, and signing in means signing a challenge. No secret crosses the network and there's nothing to phish or guess.

Seeing it at the SSH level, where you can read every file involved, made the Microsoft version make a lot more sense.

## What I'd improve next

- **Protect the keys themselves.** A key with no passphrase is only as safe as the device it's on. Hardware-backed keys (Secure Enclave on Apple devices, or a YubiKey) would mean the private key can't be copied off at all.
- **Limit what each key can do.** `authorized_keys` supports options that restrict a key, for example to port forwarding only. The phone doesn't need a full shell.
- **Look at Tailscale SSH**, which uses Tailscale identities instead of key files, so there's nothing to copy between devices in the first place.
