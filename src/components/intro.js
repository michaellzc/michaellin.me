import React from 'react'
import { Link } from 'gatsby'

function Intro() {
  return (
    <section className="max-w-7xl h-full mx-auto py-12 px-4 sm:px-6 flex flex-col justify-around md:flex-row md:items-center md:justify-between lg:px-8">
      <div className="self-center text-xl py-24">
        <h1 className="text-2xl md:text-4xl lg:text-5xl tracking-tight">
          <span className="block xl:inline font-normal">Hi. I'm</span>
          {` `}
          <span className="block xl:inline font-bold text-4xl md:text-5xl lg:text-7xl">
            Michael Lin.
          </span>
        </h1>
        <h2 className="text-xl md:text-3xl lg:text-4xl md:pt-5 lg:pt-5">
          Software engineer | Tech enthusiast
        </h2>
      </div>
      <nav className="self-end md:self-center">
        <Link
          to="/"
          className="flex items-center px-3 py-2 font-normal rounded-md text-2xl leading-10 hover:underline"
          activeClassName="underline"
        >
          HOME
        </Link>
        <Link
          to="/posts"
          className="flex items-center px-3 py-2 font-normal rounded-md text-2xl leading-10 hover:underline"
          activeClassName="underline"
        >
          BLOG
        </Link>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://assets.michaellin.me/misc/resume.pdf"
          className="flex items-center px-3 py-2 font-normal rounded-md text-2xl leading-10 hover:underline"
        >
          RESUME
        </a>
      </nav>
    </section>
  )
}

export default Intro
