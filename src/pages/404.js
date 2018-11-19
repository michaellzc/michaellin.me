import React from 'react'
import SEO from '../components/seo'
import Layout from '../components/hero-layout'
import Contact from '../components/contact'

const NotFoundPage = () => (
  <Layout>
    <SEO title="Ooops Snap" />
    <div className="container has-text-centered">
      <h1 className="title">PAGE NOT FOUND</h1>
      <Contact />
    </div>
  </Layout>
)

export default NotFoundPage
