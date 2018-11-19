import React from 'react'
import { node } from 'prop-types'
import Footer from './footer'
import Header from './header'
import 'bulma/css/bulma.css'
import 'typeface-lato'

const Layout = ({ children }) => (
  <section className="hero is-light is-fullheight">
    <div className="hero-head">
      <Header />
    </div>
    <div className="hero-body">{children}</div>
    <div className="hero-foot">
      <Footer />
    </div>
  </section>
)

Layout.propTypes = {
  children: node.isRequired,
}

export default Layout
