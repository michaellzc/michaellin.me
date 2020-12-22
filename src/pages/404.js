import React from 'react'
import SEO from '../components/seo'

const NotFoundPage = () => (
  <>
    <SEO title="Ooops Snap" />
    <section className="max-w-7xl h-full mx-auto py-12 px-4 sm:px-6 flex flex-col justify-center md:flex-row md:items-center md:justify-center lg:px-8">
      <div className="self-center text-xl py-24">
        <h1 className="text-2xl md:text-4xl lg:text-5xl tracking-tight text-text">
          PAGE NOT FOUND
        </h1>
      </div>
    </section>
  </>
)

export default NotFoundPage
