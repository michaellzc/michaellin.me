import React from 'react'
import Layout from '../components/layout'
import Contact from '../components/contact'

const NotFoundPage = () => (
  <Layout>
    <section class="hero is-light is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">PAGE NOT FOUND</h1>
          <Contact />
        </div>
      </div>
    </section>
  </Layout>
)

export default NotFoundPage
