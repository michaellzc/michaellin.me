import React from 'react'
import { css } from '@emotion/core'
import Link from './link'

const Footer = () => (
  <footer
    className="footer has-background-light"
    css={css`
      padding: 3rem 1.5rem 3rem;
    `}
  >
    <nav className="container level">
      <div className="level-left">
        <Link to="/" className="button is-text level-item">
          Home
        </Link>
        <Link to="/blogs" className="button is-text level-item">
          Blog
        </Link>
        <Link to="/wip" className="button is-text level-item">
          About
        </Link>
        <Link to="/references" className="button is-text level-item">
          References
        </Link>
      </div>

      <div className="level-right">
        <div className="has-text-centered">
          <p>Copyright © 2019 Michael Lin</p>
        </div>
      </div>
    </nav>
  </footer>
)

export default Footer
