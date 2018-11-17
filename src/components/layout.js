import React, { Fragment } from 'react'
import SEO from './seo'
import 'bulma/css/bulma.css'
import 'typeface-lato'

const Layout = ({ children }) => (
  <Fragment>
    <SEO />
    {children}
  </Fragment>
)

export default Layout
