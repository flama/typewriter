import React from 'react'
import MarkHotkey from '../helpers/mark-hotkey'

export default options => {
  const UNDERLINE_RENDER_RULE = {
    match: node => node.type == 'underline',
    render: props => <u>{props.children}</u>,
  }

  const schema = {
    rules: [
      UNDERLINE_RENDER_RULE,
    ]
  }

  const {onKeyDown} = MarkHotkey({ key: 'u', type: 'underline' })

  return {
    schema,
    onKeyDown,
  }
}
