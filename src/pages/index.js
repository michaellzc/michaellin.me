import React from 'react'
import Layout from '../components/layout'
import Intro from '../components/intro'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout isHeaderShown={false}>
    <SEO />
    <Intro />
  </Layout>
)

export default IndexPage
