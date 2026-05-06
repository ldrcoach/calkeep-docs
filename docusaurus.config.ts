import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'CalKeep Docs',
  tagline:
    'One product for calendars, contacts, bookings, tasks, processes, and pipeline.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.calkeep.com',
  baseUrl: '/',

  organizationName: 'ldrcoach',
  projectName: 'calkeep-docs',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl:
            'https://github.com/ldrcoach/calkeep-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Local-search plugin — interim search until Algolia DocSearch is approved.
  // Indexes content at build time and ships as a small JS bundle.
  // When Algolia keys land, replace this with the `themeConfig.algolia`
  // block at the bottom of this file (currently commented).
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: '/',
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  themeConfig: {
    image: 'img/calkeep-social-card.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'CalKeep Docs',
      logo: {
        alt: 'CalKeep',
        src: 'img/calkeep-appicon.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://calkeep.com',
          label: 'calkeep.com',
          position: 'right',
        },
        {
          href: 'https://github.com/ldrcoach/calkeep-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Product',
          items: [
            {label: 'Sign in', href: 'https://calkeep.com/login'},
            {label: 'Pricing', href: 'https://calkeep.com/pricing'},
            {label: 'Support', href: 'https://calkeep.com/support'},
          ],
        },
        {
          title: 'Docs',
          items: [
            {label: 'Getting started', to: '/getting-started'},
            {label: 'FAQ', to: '/faq'},
            {
              label: 'Edit on GitHub',
              href: 'https://github.com/ldrcoach/calkeep-docs',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {label: 'Privacy', href: 'https://calkeep.com/privacy'},
            {label: 'Terms', href: 'https://calkeep.com/terms'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} CalKeep. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    // ----------------------------------------------------------------
    // Algolia DocSearch — pending application approval.
    // When Algolia delivers credentials by email, paste them here and
    // remove the `themes:` local-search block higher up in this file.
    //
    // algolia: {
    //   appId: 'YOUR_APP_ID',
    //   apiKey: 'YOUR_SEARCH_ONLY_PUBLIC_API_KEY',
    //   indexName: 'calkeep',
    //   contextualSearch: true,
    //   searchPagePath: 'search',
    // },
    // ----------------------------------------------------------------
  } satisfies Preset.ThemeConfig,
};

export default config;
