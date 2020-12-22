import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

const BlogsPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO />
      <div className="max-w-5xl h-full space-y-12 mx-auto py-12 px-4 sm:px-6 flex flex-col justify-start">
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <Link to={node.fields.slug}>
                <a className="mt-2 block space-y-2">
                  <p className="text-2xl font-bold text-text">{title}</p>
                  <p className="text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-xl text-text uppercase">
                    {node.frontmatter.date}
                  </p>
                  <p
                    className="text-xl text-text hidden sm:block md:block lg:block xl:block 2xl:block"
                    dangerouslySetInnerHTML={{ __html: node.excerpt }}
                  />
                </a>
              </Link>
            </div>
          )
        })}
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
