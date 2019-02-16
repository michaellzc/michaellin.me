import React, { Fragment } from 'react'
import { css } from '@emotion/core'
import Footer from './footer'
import Header from './header'
import 'bulma/css/bulma.css'
import 'typeface-lato'

const PostLayout = ({ children }) => (
  <Fragment>
    <Header />
    <section
      className="section"
      css={css`
        background-color: #f5f5f5;
      `}
    >
      {children}
    </section>
    <Footer />
  </Fragment>
)

export default PostLayout
