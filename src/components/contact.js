import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Icon from './icon'
import Link from './link'

const Contact = () => (
  <StaticQuery
    query={graphql`
      query ContactQuery {
        site {
          siteMetadata {
            contacts {
              className
              href
              label
            }
          }
        }
      }
    `}
    render={data => (
      <div className="columns is-centered is-mobile">
        {data.site.siteMetadata.contacts.map(({ href, label, className }) => (
          <div className="column is-narrow" key={label}>
            <Link
              to={href}
              alt={label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon icon={className.split(', ')} />
            </Link>
          </div>
        ))}
      </div>
    )}
  />
)

export default Contact
