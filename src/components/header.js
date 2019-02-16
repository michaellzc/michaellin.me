import React, { Component } from 'react'
import { css } from '@emotion/core'
import Link from './link'

class Header extends Component {
  state = {
    isOpened: false,
  }

  onToggle = () => {
    const { isOpened } = this.state
    this.setState({ isOpened: !isOpened })
  }

  render() {
    const { isOpened } = this.state
    return (
      <nav
        className="navbar"
        css={css`
          padding-top: 1.5rem;
          background-color: #f5f5f5;
        `}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            {/* eslint-disable jsx-a11y/anchor-is-valid */}
            {/* eslint-disable jsx-a11y/click-events-have-key-events */}
            {/* eslint-disable jsx-a11y/interactive-supports-focus */}
            <a
              onClick={this.onToggle}
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbar-default"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
          <div
            id="navbar-default"
            className={`navbar-menu ${isOpened ? 'is-active' : ''}`}
            css={css`
              @media (max-width: 1024px) {
                box-shadow: none !important;
              }
            `}
          >
            <div className="navbar-end">
              <Link to="/" className="navbar-item button is-text">
                Home
              </Link>
              <Link to="/blogs" className="navbar-item button is-text">
                Blog
              </Link>
              <Link to="/wip" className="navbar-item button is-text">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header
