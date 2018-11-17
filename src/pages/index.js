import React from 'react'
import { Link } from 'gatsby'
import { css } from 'emotion'
import Layout from '../components/layout'
import Footer from '../components/footer'
import Intro from '../components/intro'
import Contact from '../components/contact'

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
          <div className="columns is-centered is-mobile">
            <div className="column is-narrow">
              <a className="button is-text" href="/resume_en.pdf">
                Resume
              </a>
            </div>
            <div className="column is-narrow">
              <Link to="/wip" className="button is-text">
                Blog
              </Link>
            </div>
            <div className="column is-narrow">
              <Link to="/wip" className="button is-text">
                Reference
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-foot">
        <Footer />
      </div>
    </section>
  </Layout>
)

export default IndexPage
