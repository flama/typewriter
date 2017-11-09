import React from 'react'
import MarkHotkey from '../helpers/mark-hotkey'

export default options => {
  const STRIKE_THROUGH_RENDER_RULE = {
    match: node => node.type == 'strikethrough',
    render: props => <del>{props.children}</del>,
  }

  const schema = {
    rules: [
      STRIKE_THROUGH_RENDER_RULE,
    ]
  }

  const {onKeyDown} = MarkHotkey({ key: 'd', type: 'strikethrough' })

  return {
    schema,
    onKeyDown,
  }
}
