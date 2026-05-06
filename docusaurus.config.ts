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

  themeConfig: {
    image: 'img/calkeep-social-card.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    metadata: [
      // Algolia DocSearch ownership verification — emitted as a <meta>
      // tag on every page. Allows Algolia's verifier to confirm the
      // domain is ours before activating live search. Safe to leave
      // permanently; the tag is tiny and silent to end users.
      {
        name: 'algolia-site-verification',
        content: '0B87228BA0B57BAF',
      },
    ],
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
    algolia: {
      appId: '7N85NWC2Z2',
      // Search-only API key (public, restricted to read-only queries on
      // the index below — safe to commit to a public repo). The admin
      // API key is never used here and lives only in the Algolia
      // dashboard for index management.
      apiKey: 'c6360058afca586de275d88a5f00d0a5',
      indexName: 'CalKeep Documentation',
      contextualSearch: true,
      searchPagePath: 'search',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
