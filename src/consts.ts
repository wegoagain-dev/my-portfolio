import type { SvgComponent } from "astro/types"
import Email from "@/assets/icons/email.svg"
import GitHub from "@/assets/icons/github.svg"
import LinkedIn from "@/assets/icons/linkedin.svg"
import Substack from "@/assets/icons/substack.svg"
import Twitter from "@/assets/icons/twitter.svg"

export const SITE = {
  title: "wegoagain.dev",
  description:
    "IT engineer working in Azure, learning identity and access management and cloud engineering.",
  locale: "en-GB",
  dir: "ltr",
  defaultPageImage: "/static/opengraph-image.png",
  defaultPostImage: "/static/1200x630.png",
} as const

export const NAVIGATION = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/photos", label: "Photos" },
]

export const SOCIALS: { href: string; label: string; icon: SvgComponent }[] = [
  { href: "https://github.com/wegoagain-dev", label: "GitHub", icon: GitHub },
  {
    href: "https://www.linkedin.com/in/tawfiq-r-379746198/",
    label: "LinkedIn",
    icon: LinkedIn,
  },
  { href: "https://x.com/wegoagain_dev", label: "X", icon: Twitter },
  {
    href: "https://substack.com/@wegoagaindev",
    label: "Substack",
    icon: Substack,
  },
  { href: "mailto:tawfiqrahman00@gmail.com", label: "Email", icon: Email },
]
