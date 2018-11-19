import React from 'react'
import SEO from '../components/seo'
import Layout from '../components/hero-layout'
import Contact from '../components/contact'

const WorkInProgressPage = () => (
  <Layout>
    <SEO title="Coming Soon" />
    <div className="container has-text-centered">
      <h1 className="title">Coming Soon</h1>
      <Contact />
    </div>
  </Layout>
)

export default WorkInProgressPage
