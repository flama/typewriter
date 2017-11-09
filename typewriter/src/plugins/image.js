import React from 'react'
import Image from '../components/image'

export default (options = {}) => {
  const {
    attributes,
  } = options

  const schema = {
    nodes: {
      'image': (props => <Image {...attributes} {...props} />),
    }
  }

  return {
    schema,
  }
}
