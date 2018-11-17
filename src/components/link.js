import React from 'react'
import { string, node } from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'

const Link = ({ children, to, ...other }) => {
  const internal = /^\/(?!\/)/.test(to)
  const file = /\.[0-9a-z]+$/i.test(to)

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    if (file) {
      return (
        <a href={to} {...other}>
          {children}
        </a>
      )
    }
    return (
      <GatsbyLink to={to} {...other}>
        {children}
      </GatsbyLink>
    )
  }
  return (
    <a href={to} {...other}>
      {children}
    </a>
  )
}

Link.propTypes = {
  to: string,
  children: node,
}

export default Link
