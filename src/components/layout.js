import React, { Fragment } from 'react'
import SEO from './seo'
import 'bulma/css/bulma.css'

const Layout = ({ children }) => (
  <Fragment>
    <SEO />
    {children}
  </Fragment>
)

export default Layout
