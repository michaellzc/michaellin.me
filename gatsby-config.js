const {
  NODE_ENV,
  GOOGLE_TAGMANAGER_ID,
} = process.env

module.exports = {
  siteMetadata: {
    siteUrl: 'https://michaellin.me',
    title: 'Michael Lin · Software Engineer',
    author: 'Michael Lin',
    description:
      'Michael Lin is a Software Engineer at Sourcegraph building infrastructure. He graduated from the University of Alberta with a BSc in Computer Science. Prior to Sourcegraph, he worked on Kubernetes and web stuff at IBM. He is passionate about building tools for developers and has contributed to open source projects such as Linkerd, better-opn, and more',
    keywords:
      'Developer, programming, DevOps',
    twitter: '@_mlzc',
    disqus: 'exiasr',
    references: [
      {
        title: 'Luojia',
        href: 'https://luojia.me',
        description: '佳佳酱 | 大龄单身狗的日常',
        icon: 'https://luojia.me/favicon.ico',
        handler: {
          title: '@JiaJiaJiang',
          href: 'https://github.com/JiaJiaJiang',
        },
      },
      {
        title: 'BlackGlory',
        href: 'https://www.blackglory.me',
        description: 'His digital garden',
        icon: 'https://www.blackglory.me/assets/favicon.ico',
        handler: {
          title: '@BlackGlory',
          href: 'https://github.com/BlackGlory',
        },
      }
    ]
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
        resolveEnv: () => NODE_ENV,
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
