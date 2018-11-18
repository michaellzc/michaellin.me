import React from 'react'
import { css } from 'emotion'
import Layout from '../components/hero-layout'
import Footer from '../components/footer'
import Intro from '../components/intro'
import Contact from '../components/contact'
import Menu from '../components/menu'

const fixFullHeight = css`
  .hero.is-fullheight.has-fixed-navbar {
    min-height: calc(100vh - #{$navbar-height});
  }
`

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
