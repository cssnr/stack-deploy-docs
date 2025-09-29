import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

const settings = {
  siteTitle: 'Docker Deploy', // For Site Sidebar
  title: 'Docker Stack Deploy Action', // For Actual Title
  name: 'Deploy to Docker from GitHub Actions', // For Meta Tag
  description: {
    short:
      'Easily Deploy a Docker Swarm or Compose Stack File to a Remote Host over SSH from the Actions Workspace.',
    long: 'Easily Deploy a Docker Swarm or Compose Stack File to a Remote Docker host over SSH with Keyfile or Password Authentication from the Actions Workspace.',
  },
  image: '/images/logo/logo512.png',
  color: '#0064FC',
  docs_repo: 'https://github.com/cssnr/stack-deploy-docs',
  source_repo: 'https://github.com/cssnr/stack-deploy-action',
  actions_url: 'https://github.com/marketplace/actions/docker-stack-deploy',
}

// https://vitepress.dev/reference/site-config
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  srcDir: './docs',
  // base: '/path/',
  vite: {
    server: {
      allowedHosts: true,
    },
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          git: 'vscode-icons:file-type-git',
        },
      }),
    ],
  },
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
    toc: { level: [2] },
  },

  title: settings.title,
  description: settings.description.short,
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    // ['link', { rel: 'icon', type: 'image/svg', sizes: 'any', href: '/images/logo/logo.svg' }],
    ['link', { rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/logo/logo32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/logo/logo16.png' }],

    ['meta', { name: 'darkreader-lock' }],

    ['meta', { name: 'theme-color', content: settings.color }],
    ['meta', { name: 'description', content: settings.description.long }],

    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: settings.name }],
    ['meta', { property: 'og:title', content: settings.title }],
    ['meta', { property: 'og:description', content: settings.description.short }],
    ['meta', { property: 'og:image', content: settings.image }],
    ['meta', { property: 'og:image:alt', content: settings.title }],

    ['meta', { property: 'twitter:card', content: 'summary' }],
    ['meta', { property: 'twitter:site', content: settings.name }],
    ['meta', { property: 'twitter:title', content: settings.title }],
    ['meta', { property: 'twitter:description', content: settings.description.short }],
    ['meta', { property: 'twitter:image', content: settings.image }],
    ['meta', { property: 'twitter:image:alt', content: settings.title }],
  ],

  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: settings.siteTitle,
    logo: '/images/logo/logo32.png',
    nav: [
      // { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/guides/get-started', activeMatch: '/guides/' },
      { text: 'Docs', link: '/docs/inputs', activeMatch: '/docs/' },
      { text: 'Support', link: '/support' },
      {
        text: 'Links',
        items: [
          { text: 'GitHub Repository', link: settings.source_repo },
          { text: 'GitHub Marketplace', link: settings.actions_url },
          { text: 'GitHub Documentation', link: settings.docs_repo },
          {
            text: 'Docker Context Action',
            link: 'https://github.com/cssnr/docker-context-action?tab=readme-ov-file#readme',
          },
          { text: 'Portainer Stack Deploy', link: 'https://portainer-deploy.cssnr.com/' },
          { text: 'Developer Site', link: 'https://cssnr.github.io/' },
          { text: 'Contribute', link: 'https://ko-fi.com/cssnr' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: settings.source_repo },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.984 13.836a.5.5 0 0 1-.353-.146l-.745-.743a.5.5 0 1 1 .706-.708l.392.391 1.181-1.18a.5.5 0 0 1 .708.707l-1.535 1.533a.504.504 0 0 1-.354.146zm9.353-.147l1.534-1.532a.5.5 0 0 0-.707-.707l-1.181 1.18-.392-.391a.5.5 0 1 0-.706.708l.746.743a.497.497 0 0 0 .706-.001zM4.527 7.452l2.557-1.585A1 1 0 0 0 7.09 4.17L4.533 2.56A1 1 0 0 0 3 3.406v3.196a1.001 1.001 0 0 0 1.527.85zm2.03-2.436L4 6.602V3.406l2.557 1.61zM24 12.5c0 1.93-1.57 3.5-3.5 3.5a3.503 3.503 0 0 1-3.46-3h-2.08a3.503 3.503 0 0 1-3.46 3 3.502 3.502 0 0 1-3.46-3h-.558c-.972 0-1.85-.399-2.482-1.042V17c0 1.654 1.346 3 3 3h.04c.244-1.693 1.7-3 3.46-3 1.93 0 3.5 1.57 3.5 3.5S13.43 24 11.5 24a3.502 3.502 0 0 1-3.46-3H8c-2.206 0-4-1.794-4-4V9.899A5.008 5.008 0 0 1 0 5c0-2.757 2.243-5 5-5s5 2.243 5 5a5.005 5.005 0 0 1-4.952 4.998A2.482 2.482 0 0 0 7.482 12h.558c.244-1.693 1.7-3 3.46-3a3.502 3.502 0 0 1 3.46 3h2.08a3.503 3.503 0 0 1 3.46-3c1.93 0 3.5 1.57 3.5 3.5zm-15 8c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5-1.122-2.5-2.5-2.5S9 19.122 9 20.5zM5 9c2.206 0 4-1.794 4-4S7.206 1 5 1 1 2.794 1 5s1.794 4 4 4zm9 3.5c0-1.378-1.122-2.5-2.5-2.5S9 11.122 9 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5zm9 0c0-1.378-1.122-2.5-2.5-2.5S18 11.122 18 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5zm-13 8a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm12 0c0 1.93-1.57 3.5-3.5 3.5a3.503 3.503 0 0 1-3.46-3.002c-.007.001-.013.005-.021.005l-.506.017h-.017a.5.5 0 0 1-.016-.999l.506-.017c.018-.002.035.006.052.007A3.503 3.503 0 0 1 20.5 17c1.93 0 3.5 1.57 3.5 3.5zm-1 0c0-1.378-1.122-2.5-2.5-2.5S18 19.122 18 20.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5z"/></svg>',
        },
        link: settings.actions_url,
      },
      { icon: 'vitepress', link: settings.docs_repo },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M0 0 C238.89488636 0 238.89488636 0 266.875 5.6875 C268.14907715 5.94241211 269.4231543 6.19732422 270.73583984 6.45996094 C295.28260499 11.59829842 320.09148518 20.37064171 340 36 C340.54060059 36.42394043 341.08120117 36.84788086 341.63818359 37.28466797 C368.61078119 58.66433771 383.36837693 87.73116778 390.25 121.0625 C390.40122314 121.79202881 390.55244629 122.52155762 390.70825195 123.27319336 C393.75434473 139.20885092 394.34740822 155.07180869 394.31567383 171.25634766 C394.31252391 174.59961928 394.33603462 177.94199374 394.36132812 181.28515625 C394.48042561 221.65493635 386.6720841 263.40701976 360 295 C359.22011719 295.94359375 358.44023437 296.8871875 357.63671875 297.859375 C326.51839243 333.91792662 276.24399058 344.84615939 231 349 C203.39260712 350.84049286 175.66867463 350 148 350 C148 403.13 148 456.26 148 511 C99.16 511 50.32 511 0 511 C0 342.37 0 173.74 0 0 Z M148 113 C148 153.59 148 194.18 148 236 C189.45432414 238.69302267 189.45432414 238.69302267 226.4375 222.4375 C241.24079463 205.85526868 241.16225589 182.93482327 240 162 C238.92408923 148.44729943 234.26236473 136.11455817 225 126 C203.39772138 108.73182783 173.794862 113 148 113 Z " transform="translate(59,0)"/><path d="M0 0 C40.26 0 80.52 0 122 0 C122 39.93 122 79.86 122 121 C81.74 121 41.48 121 0 121 C0 81.07 0 41.14 0 0 Z " transform="translate(331,391)"/></svg>',
        },
        link: 'https://github.com/cssnr/portainer-stack-deploy-action',
      },
      { icon: 'discord', link: 'https://discord.gg/wXy6m2X8wY' },
      { icon: 'kofi', link: 'https://ko-fi.com/cssnr' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: none;" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
        },
        link: 'https://cssnr.github.io/',
      },
    ],

    sidebar: [
      {
        text: 'Guides',
        base: '/guides',
        items: [
          { text: 'Get Started', link: '/get-started' },
          { text: 'Features', link: '/features' },
          { text: 'Examples', link: '/examples' },
          { text: 'Resources', link: '/resources' },
          //
        ],
      },
      {
        text: 'Documentation',
        base: '/docs',
        items: [
          { text: 'Inputs', link: '/inputs' },
          //
        ],
      },
      {
        text: 'Support',
        items: [
          { text: 'Get Help', link: '/support' },
          //
        ],
      },
    ],

    editLink: {
      pattern: `${settings.docs_repo}/blob/master/docs/:path`,
      text: 'View or Edit on GitHub',
    },

    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'medium',
      },
    },

    search: {
      // provider: 'local',
      provider: 'algolia',
      options: {
        appId: 'EW5LL0AH1S',
        apiKey: '3f12593e3e1384f0a82282a8d8eb2e47',
        indexName: 'docker-stack-deploy-docs',
      },
    },

    // footer: {
    //   message: '<a href="/privacy">Privacy Policy</a>',
    //   copyright: '<a href="/privacy">Privacy Policy</a>',
    // },

    externalLinkIcon: true,
    outline: 'deep',
  },
})
