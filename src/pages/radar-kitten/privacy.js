import React from 'react'

const RadarKittenPrivacyPage = () => (
  <article className="max-w-5xl h-full space-y-12 mx-auto py-12 px-4 sm:px-6">
    <h1 className="max-w-prose mx-auto block text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-light">
      Radar Kitten Privacy Policy
    </h1>
    <div className="mt-6 prose prose-text prose-lg mx-auto antialiased dark:prose-dark">
      <h2>tl;dr</h2>
      <p>
        <ul>
          <li>We don't collect any personal information.</li>
          <li>We don't care where you have been.</li>
          <li>
            Apple may or may not collect your usage information, but we do not.
          </li>
        </ul>
      </p>

      <h2>Notes</h2>
      <p>
        <ul>
          <li>
            We use{' '}
            <a href="https://www.revenuecat.com" target="_blank">
              RevenueCat
            </a>{' '}
            to manage payment. RevenueCat's Privacy Policy can be{' '}
            <a href="https://www.revenuecat.com/privacy" target="_blank">
              found here
            </a>
            . We are unable to associate you with RevenueCat's records since
            everything is anonymous.
          </li>
        </ul>
      </p>

      <p>Please drive safely</p>
    </div>
  </article>
)

export default RadarKittenPrivacyPage
