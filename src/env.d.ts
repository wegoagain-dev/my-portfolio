/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare global {
  interface Window {
    __mobileMenuCleanup?: () => void
    __headerScrollCleanup?: () => void
    __scrollToTopCleanup?: () => void
  }
}

export {}
