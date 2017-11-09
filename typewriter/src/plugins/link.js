import React from 'react'
import Link from '../components/link'

export default options => {
  const schema = {
    nodes: {
      link: props => <Link {...props} />,
    }
  }

  return {
    schema,
  }
}
