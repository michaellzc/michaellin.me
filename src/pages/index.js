import React from 'react'
import Layout from '../components/hero-layout'
import Intro from '../components/intro'
import Contact from '../components/contact'
import Menu from '../components/menu'

const IndexPage = () => (
  <Layout>
    <div className="container has-text-centered">
      <Intro />
      <Contact />
      <Menu />
    </div>
  </Layout>
)

export default IndexPage
