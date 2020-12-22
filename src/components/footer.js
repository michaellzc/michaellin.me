import React from 'react'

const Footer = () => (
  <footer className="bg-white">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
      <div className="flex justify-center space-x-6 md:order-2">
        <a
          href="https://www.instagram.com/_michaelllin/"
          className="text-gray-400 hover:text-text"
          target="_blank"
        >
          <span className="sr-only">Instagram</span>
          <i className="fab fa-instagram fa-2x" />
        </a>

        <a
          href="https://twitter.com/_mlzc"
          className="text-gray-400 hover:text-text"
          target="_blank"
        >
          <span className="sr-only">Twitter</span>
          <i className="fab fa-twitter fa-2x" />
        </a>

        <a
          href="https://github.com/ExiaSR"
          className="text-gray-400 hover:text-text"
          target="_blank"
        >
          <span className="sr-only">GitHub</span>
          <i className="fab fa-github fa-2x" />
        </a>

        <a
          href="https://www.linkedin.com/in/mlzc"
          className="text-gray-400 hover:text-text"
          target="_blank"
        >
          <span className="sr-only">Linkedin</span>
          <i className="fab fa-linkedin fa-2x" />
        </a>

        <a
          href="mailto:hi@michaellin.me"
          className="text-gray-400 hover:text-text"
          target="_blank"
        >
          <span className="sr-only">Facebook</span>
          <i className="fas fa-envelope fa-2x" />
        </a>
      </div>
      <div className="mt-8 md:mt-0 md:order-1">
        <p className="text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()} Michael Lin. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
