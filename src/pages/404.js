import React from 'react'
import Layout from '../components/layout'
import Contact from '../components/contact'

const NotFoundPage = () => (
  <Layout>
    <section claassName="hero is-light is-fullheight">
      <div claassName="hero-body">
        <div claassName="container has-text-centered">
          <h1 claassName="title">PAGE NOT FOUND</h1>
          <Contact />
        </div>
      </div>
    </section>
  </Layout>
)

export default NotFoundPage
