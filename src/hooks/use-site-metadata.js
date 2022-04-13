import { useStaticQuery, graphql } from 'gatsby'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            siteUrl
            title
            description
            keywords
            author
            twitter
            disqus
            references {
              title
              href
              description
            }
          }
        }
      }
    `
  )
  return site.siteMetadata
}
