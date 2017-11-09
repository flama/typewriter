import React from 'react'
import MarkHotkey from '../helpers/mark-hotkey'

export default options => {
  const ITALIC_RENDER_RULE = {
    match: node => node.type == 'italic',
    render: props => <i>{props.children}</i>,
  }

  const schema = {
    rules: [
      ITALIC_RENDER_RULE,
    ]
  }

  const {onKeyDown} = MarkHotkey({ key: 'i', type: 'italic' })

  return {
    schema,
    onKeyDown,
  }
}
