import React from 'react'
import MarkHotkey from '../helpers/mark-hotkey'

export default options => {
  const BOLD_RENDER_RULE = {
    match: node => node.type == 'bold',
    render: props => <strong>{props.children}</strong>,
  }

  const schema = {
    rules: [
      BOLD_RENDER_RULE,
    ]
  }

  const {onKeyDown} = MarkHotkey({ key: 'b', type: 'bold' })

  return {
    schema,
    onKeyDown,
  }
}
