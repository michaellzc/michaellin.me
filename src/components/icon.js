import React from 'react'
import styled from 'react-emotion'
import { any } from 'prop-types'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faLinkedin,
  faKeybase,
  faTwitter,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons'

library.add(faGithub, faLinkedin, faKeybase, faTwitter, faEnvelope, faTelegram)

const UnstyledIcon = props => <FontAwesomeIcon {...props} />

const StyledIcon = styled(UnstyledIcon)`
  font-size: 1.75em;
`

const Icon = ({ icon }) => <StyledIcon icon={icon} />

Icon.propTypes = {
  icon: any,
}

export default Icon
