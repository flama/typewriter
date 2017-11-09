import React from 'react'
import MarkInlineShortcut from '../helpers/mark-inline-shortcut'

export default options => {

  const CODE_RENDER_RULE = {
    match: node => node.type == 'code',
    render: props => <code>{props.children}</code>,
  }

  const schema = {
    rules: [
      CODE_RENDER_RULE,
    ]
  }

  const { onKeyDown } = MarkInlineShortcut({
    type: 'code',
    regex: /`([^`]+)`/g,
  })

  return {
    schema,
    onKeyDown,
  }
}
