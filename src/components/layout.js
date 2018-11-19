import React from 'react'
import { node, bool } from 'prop-types'
import { css } from 'react-emotion'
import Footer from './footer'
import Header from './header'
import 'bulma/css/bulma.css'
import 'typeface-lato'

const Layout = ({ children, article }) => (
  <section className="hero is-light is-fullheight">
    <div className="hero-head">
      <Header />
    </div>
    <div
      className={`hero-body ${
        article
          ? css`
              display: grid !important;
            `
          : null
      }`}
    >
      {children}
    </div>
    <div className="hero-foot">
      <Footer />
    </div>
  </section>
)

Layout.propTypes = {
  children: node.isRequired,
  article: bool,
}

Layout.defaultProps = {
  article: false,
}

export default Layout
