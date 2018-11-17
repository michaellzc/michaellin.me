import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

const SEO = () => (
  <StaticQuery
    query={graphql`
      query SEOQuery {
        site {
          siteMetadata {
            title
            author
            description
            keywords
            twitter
          }
        }
      }
    `}
    render={data => (
      <Helmet>
        <title>{data.site.siteMetadata.title}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="author" content={data.site.siteMetadata.author} />
        <meta name="description" content={data.site.siteMetadata.description} />
        <meta name="keywords" content={data.site.siteMetadata.keywords} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={data.site.siteMetadata.siteUrl} />
        <meta property="og:title" content={data.site.siteMetadata.title} />
        <meta
          property="og:description"
          content={data.site.siteMetadata.description}
        />

        <meta name="twitter:url" content={data.site.siteMetadata.siteUrl} />
        <meta name="twitter:title" content={data.site.siteMetadata.title} />
        <meta
          name="twitter:description"
          content={data.site.siteMetadata.description}
        />
        <meta name="twitter:creator" content={data.site.siteMetadata.twitter} />
      </Helmet>
    )}
  />
)

export default SEO
