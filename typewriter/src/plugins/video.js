import React from 'react'
import Video from '../components/video'

export default options => {
  const schema = {
    nodes: {
      video: Video,
    },
  }

  return {
    schema,
  }
}
