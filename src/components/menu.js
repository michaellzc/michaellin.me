import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Link from './link'

const MenuItem = ({ name, to }) => (
  <div className="column is-narrow">
    <Link to={to} className="button is-text">
      {name}
    </Link>
  </div>
)

const Menu = () => (
  <StaticQuery
    query={graphql`
      query MenuQuery {
        site {
          siteMetadata {
            menu {
              name
              href
            }
          }
        }
      }
    `}
    render={data => (
      <div className="columns is-centered is-mobile">
        {data.site.siteMetadata.menu.map(({ name, href }) => (
          <MenuItem key={name} name={name} to={href} />
        ))}
      </div>
    )}
  />
)

export default Menu
