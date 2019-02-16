import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import { formatReadingTime } from '../utils/helpers'
import { rhythm } from '../utils/typography'

const BlogsPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-8">
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <div key={node.fields.slug}>
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </h3>
                  <small>
                    {node.frontmatter.date}
                    {` • ${formatReadingTime(node.timeToRead)}`}
                  </small>
                  <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BlogsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
