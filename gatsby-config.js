const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://michaellin.me',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
  GOOGLE_TAGMANAGER_ID,
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

module.exports = {
  siteMetadata: {
    siteUrl,
    title: 'Michael Lin · Full Stack Software Developer',
    author: 'Michael Lin',
    description: 'Michael Lin is a Software Developer at IBM working on CognitiveClass.ai, and a Computer Science student at the University of Alberta. His recent focus is on building modern web applications.',
    keywords: 'Developer, programming, react, node, javascript, edmonton, toronto',
    twitter: '@michaellin_lzc',
    contacts: [
      {
        className: 'fab, github',
        href: 'https://github.com/ExiaSR',
        label: 'Github'
      },
      {
        className: 'fab, linkedin',
        href: 'https://ca.linkedin.com/in/michaellinlzc',
        label: 'Linkedin'
      },
      {
        className: 'fab, twitter',
        href: 'https://twitter.com/michaellin_lzc',
        label: 'Twitter'
      },
      {
        className: 'fab, keybase',
        href: 'https://keybase.io/exiasr',
        label: 'Keybase'
      },
      {
        className: 'fab, telegram',
        href: 'http://telegram.me/ExiaSR',
        label: 'Telegram'
      },
      {
        className: 'fas, envelope',
        href: 'mailto:linzichunzf@hotmail.com',
        label: 'Email'
      }
    ],
    references: [
      {
        title: 'Luojia',
        href: 'https://luojia.me',
        description: '可爱的男孩子',
        icon: 'https://luojia.me/favicon.ico'
      },
      {
        title: 'BlackGlory',
        href: 'https://www.blackglory.me',
        description: '写代码的游戏玩家',
        icon: 'https://www.blackglory.me/assets/favicon.ico'
      },
      {
        title: 'DigitalOcean',
        href: 'https://m.do.co/c/faff46d8cc4b',
        description: 'Get $10 by using my link to signup',
        icon: 'https://www.digitalocean.com/favicon.ico'
      },
      {
        title: 'Vultr',
        href: 'http://www.vultr.com/?ref=6900414',
        description: 'Get $10 by using my link to signup',
        icon: 'https://www.vultr.com/favicon.ico'
      }
    ],
    menu: [
      {
        name: 'Resume',
        href: '/resume_en.pdf'
      },
      {
        name: 'Blog',
        href: '/wip'
      },
      {
        name: 'Reference',
        href: '/wip'
      }
    ]
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*', allow: '/' }]
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: GOOGLE_TAGMANAGER_ID,
        includeInDevelopment: false,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
        omitGoogleFont: true
      }
    }
  ],
}
