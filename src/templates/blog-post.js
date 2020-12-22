import React from 'react'
import { graphql } from 'gatsby'
import { DiscussionEmbed } from 'disqus-react'
import SEO from '../components/seo'
import Layout from '../components/layout'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import 'prismjs/themes/prism-tomorrow.css'

const BlogPost = ({ data: { markdownRemark: post } }) => {
  const { disqus } = useSiteMetadata()

  return (
    <Layout isHero={false}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        slug={post.fields.slug}
        socialCardTitle={post.frontmatter.social_card_title}
      />
      <article className="max-w-5xl h-full space-y-12 mx-auto py-12 px-4 sm:px-6">
        <h1 className="max-w-prose mx-auto block text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {post.frontmatter.title}
        </h1>
        <div
          dangerouslySetInnerHTML={{ __html: post.html }}
          className="mt-6 prose prose-text prose-lg text-text mx-auto antialiased"
        />
        {process.env.NODE_ENV === 'production' ? (
          <DiscussionEmbed
            shortname={disqus}
            config={{
              identifier: post.id,
              title: post.frontmatter.title,
            }}
          />
        ) : null}
      </article>
    </Layout>
  )
}

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
      timeToRead
      frontmatter {
        title
        description
        social_card_title
        date(formatString: "MMMM DD, YYYY")
      }
      fields {
        slug
      }
    }
  }
`

export default BlogPost
