import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Layout from '../components/layout'
import ReferenceCard from '../components/reference-card'

const ReferencesPage = () => (
  <StaticQuery
    query={graphql`
      query ReferencesQuery {
        site {
          siteMetadata {
            references {
              title
              href
              description
              icon
              handler {
                title
                href
              }
            }
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { references },
      },
    }) => (
      <Layout>
        <div className="container">
          <div className="columns is-centered">
            {references.map(reference => (
              <ReferenceCard
                key={reference.title}
                name={reference.title}
                link={reference.href}
                icon={reference.icon}
                description={reference.description}
                handler={reference.handler}
              />
            ))}
          </div>
        </div>
      </Layout>
    )}
  />
)

export default ReferencesPage
