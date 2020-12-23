import React from 'react'
import { Link } from 'gatsby'

function Header() {
  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative">
          <div className="flex px-4 py-6 sm:px-6 justify-end md:space-x-10">
            <nav className="md:flex space-x-10">
              <Link
                to="/"
                className="font-normal rounded-md text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl hover:underline"
                activeClassName="underline"
              >
                HOME
              </Link>
              <Link
                to="/posts"
                className="font-normal rounded-md text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl hover:underline"
                activeClassName="underline"
              >
                BLOG
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
