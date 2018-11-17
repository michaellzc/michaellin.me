import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Footer from '../components/footer'
import Intro from '../components/intro'
import Contact from '../components/contact'

const IndexPage = () => (
  <Layout>
    <section className="hero is-light is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <Intro />
          <Contact />
          <div className="columns is-centered is-mobile">
            <div className="column is-narrow">
              <a class="button is-text" href="/resume_en.pdf">
                Resume
              </a>
            </div>
            <div className="column is-narrow">
              <Link to="/wip" class="button is-text">
                Blog
              </Link>
            </div>
            <div className="column is-narrow">
              <Link to="/wip" class="button is-text">
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
