import React from 'react'
import Icon from './icon'
import { StaticQuery, graphql } from 'gatsby'

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
        {data.site.siteMetadata.contacts.map(
          ({ href, label, className }) => (
            <div className="column is-narrow" key={label}>
              <a
                href={href}
                alt={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon={className.split(', ')} />
              </a>
            </div>
          )
        )}
      </div>
    )}
  />
)

export default Contact
