import React from 'react'
import MarkHotkey from '../helpers/mark-hotkey'

export default options => {
  const HIGHLIGH_RENDER_RULE = {
    match: node => node.type == 'highlight',
    render: props => <em>{props.children}</em>,
  }

  const schema = {
    rules: [
      HIGHLIGH_RENDER_RULE,
    ]
  }

  const {onKeyDown} = MarkHotkey({ key: 'e', type: 'highlight' })

  return {
    schema,
    onKeyDown,
  }
}
