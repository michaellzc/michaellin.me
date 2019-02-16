import React from 'react'
import { graphql } from 'gatsby'
import { css, Global } from '@emotion/core'
import SEO from '../components/seo'
import Layout from '../components/post-layout'
import 'prismjs/themes/prism-tomorrow.css'

// eslint-disable-next-line react/prop-types
const BlogPost = ({ data: { markdownRemark: post } }) => (
  <Layout>
    <SEO
      title={post.frontmatter.title}
      description={post.frontmatter.description}
      slug={post.fields.slug}
    />
    <Global
      styles={css`
        /* hacky workaround for confilict between bulma and prismjs */
        [class*='gatsby-code-'] {
          margin-bottom: 1.75rem;
          border-radius: 10px;
          background: #011627;
          -webkit-overflow-scrolling: touch;
          overflow: auto;
          color: #ffffff;
        }
        .number {
          font-size: 1em;
          background-color: transparent;
        }
      `}
    />
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-8">
          <div
            className="content"
            css={css`
              line-height: 1.75;
            `}
          >
            <h1>{post.frontmatter.title}</h1>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
      }
      fields {
        slug
      }
    }
  }
`

export default BlogPost
