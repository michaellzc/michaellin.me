import React from 'react'
import Helmet from 'react-helmet'
import { string } from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

const SEO = ({ title, description, url }) => (
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
    render={({ site: { siteMetadata: meta } }) => {
      const seo = {
        title: title || meta.title,
        description: description || meta.description,
        siteUrl: url || meta.url,
        author: meta.author,
        keywords: meta.keywords,
      }

      return (
        <Helmet defaultTitle={meta.title} titleTemplate="%s · Michael Lin">
          <html lang="en" />

          <title>{seo.title}</title>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="author" content={seo.author} />
          <meta name="description" content={seo.description} />
          <meta name="keywords" content={seo.keywords} />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={seo.siteUrl} />
          <meta property="og:title" content={seo.title} />
          <meta property="og:description" content={seo.description} />

          <meta name="twitter:url" content={seo.siteUrl} />
          <meta name="twitter:title" content={seo.title} />
          <meta name="twitter:description" content={seo.description} />
          <meta name="twitter:creator" content={seo.twitter} />
        </Helmet>
      )
    }}
  />
)

SEO.propTypes = {
  title: string,
  description: string,
  url: string,
}

SEO.defaultProps = {
  title: null,
  description: null,
  url: null,
}

export default SEO
