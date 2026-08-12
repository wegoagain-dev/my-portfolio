import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'wegoagain.dev',
  description:
    'IT engineer working across Microsoft 365, identity, endpoint management and security, with a focus on cloud infrastructure, Azure and AI automation.',
  href: 'https://wegoagain.dev',
  author: 'Tawfiq',
  locale: 'en-GB',
  featuredPostCount: 2,
  postsPerPage: 10,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/work',
    label: 'work',
  },
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/photos',
    label: 'photos',
  },
  {
    href: '/about',
    label: 'about',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/wegoagain-dev',
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/tawfiq-r-379746198/',
    label: 'LinkedIn',
  },
  {
    href: 'https://x.com/wegoagain_dev',
    label: 'X',
  },
  {
    href: 'https://substack.com/@wegoagaindev',
    label: 'Substack',
  },
  {
    href: 'mailto:tawfiqrahman00@gmail.com',
    label: 'Email',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  X: 'lucide:twitter',
  Substack: 'lucide:book-open',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
