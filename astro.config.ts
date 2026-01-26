import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'

import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeExpressiveCode from 'rehype-expressive-code'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import rehypeShiki from '@shikijs/rehype'
import remarkEmoji from 'remark-emoji'
import remarkMath from 'remark-math'

import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import type { ExpressiveCodeTheme } from 'rehype-expressive-code'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://wegoagain.dev',
  integrations: [mdx(), react(), sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 1234,
    host: true,
  },
  devToolbar: {
    enabled: false,
  },
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noreferrer', 'noopener'],
        },
      ],
      rehypeHeadingIds,
      rehypeKatex,
      [
        rehypeExpressiveCode,
        {
          themes: ['github-light', 'github-dark'],
          plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
          useDarkModeMediaQuery: false,
          themeCssSelector: (theme: ExpressiveCodeTheme) =>
            `[data-theme="${theme.name.split('-')[1]}"]`,
          defaultProps: {
            wrap: false,
            collapseStyle: 'collapsible-auto',
            overridesByLang: {
              'ansi,bat,bash,batch,cmd,console,powershell,ps,ps1,psd1,psm1,sh,shell,shellscript,shellsession,text,zsh':
                {
                  showLineNumbers: false,
                },
            },
          },
          styleOverrides: {
            codeFontSize: '0.875rem',
            codeLineHeight: '1.75',
            borderRadius: '0.75rem',
            borderColor: 'oklch(var(--border))',
            codeFontFamily: 'var(--font-mono)',
            codePaddingBlock: '1rem',
            codePaddingInline: '0',
            codeBackground:
              'color-mix(in oklab, oklch(var(--secondary)) 20%, transparent)',
            frames: {
              editorActiveTabForeground: 'oklch(var(--foreground))',
              editorActiveTabBackground:
                'color-mix(in oklab, oklch(var(--secondary)) 20%, transparent)',
              editorActiveTabIndicatorBottomColor: 'transparent',
              editorActiveTabIndicatorTopColor: 'transparent',
              editorTabBorderRadius: '0.75rem 0.75rem 0 0',
              editorTabBarBackground: 'transparent',
              editorTabBarBorderBottomColor: 'oklch(var(--border))',
              frameBoxShadowCssValue: 'none',
              terminalBackground:
                'color-mix(in oklab, oklch(var(--secondary)) 20%, transparent)',
              terminalTitlebarBackground: 'transparent',
              terminalTitlebarBorderBottomColor: 'oklch(var(--border))',
              terminalTitlebarForeground: 'oklch(var(--foreground))',
            },
            lineNumbers: {
              foreground: 'oklch(var(--muted-foreground))',
            },
            uiFontFamily: 'var(--font-sans)',
          },
        },
      ],
      [
        rehypeShiki,
        {
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
          inline: 'tailing-curly-colon',
        },
      ],
    ],
    remarkPlugins: [remarkMath, remarkEmoji],
  },
})
