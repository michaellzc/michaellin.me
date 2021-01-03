const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://michaellin.me',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
  GOOGLE_TAGMANAGER_ID,
} = process.env
const isNetlifyProduction = NETLIFY_ENV === 'production'

module.exports = {
  siteMetadata: {
    siteUrl: 'https://michaellin.me',
    title: 'Michael Lin · Full Stack Software Developer',
    author: 'Michael Lin',
    description:
      'Michael Lin is a Software Developer at IBM working on CognitiveClass.ai, and a Computer Science student at the University of Alberta. His recent focus is on building modern web applications.',
    keywords:
      'Developer, programming, react, node, javascript, edmonton, toronto',
    twitter: '@michaellin_lzc',
    disqus: 'exiasr',
    contacts: [
      {
        className: 'fab, github',
        href: 'https://github.com/ExiaSR',
        label: 'Github',
      },
      {
        className: 'fab, linkedin',
        href: 'https://www.linkedin.com/in/michaellinlzc',
        label: 'Linkedin',
      },
      {
        className: 'fab, twitter',
        href: 'https://twitter.com/_michaellin',
        label: 'Twitter',
      },
      {
        className: 'fab, keybase',
        href: 'https://keybase.io/exiasr',
        label: 'Keybase',
      },
      {
        className: 'fab, telegram',
        href: 'https://telegram.me/ExiaSR',
        label: 'Telegram',
      },
      {
        className: 'fas, envelope',
        href: 'mailto:hi@michaellin.me',
        label: 'Email',
      },
    ],
    references: [
      {
        title: 'Luojia',
        href: 'https://luojia.me',
        description: '佳佳酱 | 跨次元日常卖萌',
        icon: 'https://luojia.me/favicon.ico',
        handler: {
          title: '@JiaJiaJiang',
          href: 'https://github.com/JiaJiaJiang',
        },
      },
      {
        title: 'BlackGlory',
        href: 'https://www.blackglory.me',
        description: 'Experimental Web Component set @MudElements maintainer',
        icon: 'https://www.blackglory.me/assets/favicon.ico',
        handler: {
          title: '@BlackGlory',
          href: 'https://github.com/BlackGlory',
        },
      },
      {
        title: 'DigitalOcean',
        href: 'https://m.do.co/c/faff46d8cc4b',
        description: 'Get $100 credits over 60 days',
        icon: 'https://www.digitalocean.com/favicon.ico',
        handler: {
          title: '@digitalocean',
          href: 'https://twitter.com/digitalocean',
        },
      },
      {
        title: 'Vultr',
        href: 'http://www.vultr.com/?ref=6900414',
        description: 'Get $10 credits',
        icon: 'https://www.vultr.com/dist/img/brand/logo_v_onwhite.svg',
        handler: {
          title: '@Vultr',
          href: 'https://twitter.com/vultr',
        },
      },
    ],
    menu: [
      {
        name: 'Resume',
        href: '/resume_en.pdf',
      },
      {
        name: 'Blog',
        href: '/blogs',
      },
    ],
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    `gatsby-plugin-layout`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/wip', '/references'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-smartypants',
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'gatsby-code-',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
              backgroundColor: 'transparent',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*', allow: '/' }],
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: GOOGLE_TAGMANAGER_ID,
        includeInDevelopment: false,
      },
    },
  ],
}
