import React, { Fragment } from 'react'
import { node } from 'prop-types'
import SEO from './seo'
import 'bulma/css/bulma.css'
import 'typeface-lato'

const Layout = ({ children }) => (
  <Fragment>
    <SEO />
    {children}
  </Fragment>
)

Layout.propTypes = {
  children: node.isRequired,
}

export default Layout
