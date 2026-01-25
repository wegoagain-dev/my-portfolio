import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'wegoagain',
  description:
    'DevOps Engineer focused on building reliable infrastructure and scalable systems. Focusing on system design and AI workflows to optimise automation',
  href: 'https://wegoagain.dev',
  author: 'Tawfiq',
  locale: 'en-GB',
  featuredPostCount: 3,
  postsPerPage: 10,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/projects',
    label: 'projects',
  },
  {
    href: '/blog',
    label: 'blog',
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
    href: 'https://www.linkedin.com/in/tawfiq-a-379746198/',
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
