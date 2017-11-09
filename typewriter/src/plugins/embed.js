import React from 'react'
import Embed from '../components/embed'

export default options => {
  const schema = {
    nodes: {
      embed: Embed,
    },
  }

  return {
    schema,
  }
}
