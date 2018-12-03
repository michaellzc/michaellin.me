import React from 'react'
import { css } from 'react-emotion'
import { string, any } from 'prop-types'
import Link from './link'

const ReferenceCard = ({ name, link, description, icon, handler }) => (
  <div className="column">
    <div
      className={`card ${css`
        box-shadow: none;
        display: flex;
        flex-direction: column;
        height: 100%;
      `}`}
    >
      <div className="card-image" />
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <Link to={link} target="_blank" rel="noopener noreferrer">
                <img src={icon} alt="logo" />
              </Link>
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">
              <Link to={link} target="_blank" rel="noopener noreferrer">
                {name}
              </Link>
            </p>
            {handler ? (
              <p className="subtitle is-6">
                <Link
                  to={handler.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {handler.title}
                </Link>
              </p>
            ) : null}
          </div>
        </div>

        <div
          className={`content ${css`
            margin-top: auto;
          `}`}
        >
          {description}
        </div>
      </div>
    </div>
  </div>
)

ReferenceCard.propTypes = {
  name: string.isRequired,
  link: string.isRequired,
  description: string.isRequired,
  icon: string.isRequired,
  handler: any.isRequired,
}

export default ReferenceCard
