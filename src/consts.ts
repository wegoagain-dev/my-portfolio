import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Tawfiq's DevOps Page",
  DESCRIPTION: "Tawfiq's journey to DevOps: portfolio and blog.",
  EMAIL: "tawfiqrahman00@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 5,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Homepage for my DevOps journey",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "X (Twitter)",
    HREF: "https://x.com/wegoagain_dev",
  },
  {
    NAME: "GitHub",
    HREF: "https://github.com/wegoagain-dev",
  },
  {
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/tawfiq-a-379746198/",
  },
  {
    NAME: "SubStack",
    HREF: "https://substack.com/@wegoagaindev",
  },
];
