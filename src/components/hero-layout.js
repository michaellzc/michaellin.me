import React from 'react'
import { node } from 'prop-types'
import { css } from 'react-emotion'
import Footer from './footer'
import 'bulma/css/bulma.css'
import 'typeface-lato'

const fixFullHeight = css`
  .hero.is-fullheight.has-fixed-navbar {
    min-height: calc(100vh - #{$navbar-height});
  }
`

const HeroLayout = ({ children }) => (
  <section className={`hero is-light is-fullheight ${fixFullHeight}`}>
    <div className="hero-body">{children}</div>
    <div className="hero-foot">
      <Footer />
    </div>
  </section>
)

HeroLayout.propTypes = {
  children: node.isRequired,
}

export default HeroLayout
