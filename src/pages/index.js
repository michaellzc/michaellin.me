import React from 'react'
import { css } from 'emotion'
import Layout from '../components/layout'
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
    <section className={`hero is-light is-fullheight ${fixFullHeight}`}>
      <div className="hero-body">
        <div className="container has-text-centered">
          <Intro />
          <Contact />
          <Menu />
        </div>
      </div>
      <div className="hero-foot">
        <Footer />
      </div>
    </section>
  </Layout>
)

export default IndexPage
