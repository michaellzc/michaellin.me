import React from 'react'
import { Link } from 'gatsby'
import SEO from '../components/seo'
import Intro from '../components/intro'
import Contact from '../components/contact'
import 'bulma/css/bulma.css'

const IndexPage = () => (
  <section className="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <SEO />
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
  </section>
)

export default IndexPage
