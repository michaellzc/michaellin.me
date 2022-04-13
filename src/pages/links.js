import React from 'react'
import SEO from '../components/seo'
import { useSiteMetadata } from '../hooks/use-site-metadata'

const Links = () => {
  const { references } = useSiteMetadata()

  return (
    <>
      <SEO />
      <div className="max-w-5xl h-full space-y-12 mx-auto py-12 px-4 sm:px-6 flex flex-col justify-start">
        {references.map((reference) => {
          return (
            <div key={reference.title}>
              <a href={reference.href} target="_blank">
                <div className="mt-2 block space-y-2">
                  <p className="text-2xl font-bold">{reference.title} - {reference.href}</p>
                </div>
              </a>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Links
