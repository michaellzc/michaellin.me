import React from 'react'
import Footer from '../components/footer'
import Header from '../components/header'

function Layout({
  children,
  pageContext: { isHeaderShown = true, isFooterShown = true, isHero = true },
}) {
  return (
    <main className="relative md:px-20 lg:px-24 min-h-screen h-screen flex flex-col">
      {isHeaderShown ? (
        <div className="flex-shrink">
          <Header />
        </div>
      ) : null}
      <div className={`flex-grow ${isHero ? 'h-0' : ''}`}>{children}</div>
      {isFooterShown ? (
        <div className="flex-shrink">
          <Footer />
        </div>
      ) : null}
    </main>
  )
}

export default Layout
