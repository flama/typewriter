import React from 'react'
import { Placeholder } from 'slate-react'

export default (options = {}) => {
  const {
    placeholder,
    placeholderClassName = 'placeholder',
  } = options

  const dispatchCustomEvent = (eventName, detail) => {
    const event = new CustomEvent(eventName, { detail: detail })
    global.dispatchEvent(event)
  }

  const PARAGRAPH_RENDER_RULE = {
    match: node => node.type == 'paragraph',
    render: (props) => {
      return (
        <p {...props.attributes}
          style={{ position: 'relative' }}
          onMouseEnter={ () => dispatchCustomEvent(`paragraph:mouseenter`, { node: props.node }) }
          onMouseOver={ () => dispatchCustomEvent(`paragraph:mouseover`, { node: props.node }) }
        >
          {props.children}
          {placeholder
            ? <Placeholder
                className={placeholderClassName}
                node={props.node}
                parent={props.state.document}
                state={props.state}
              >
                {placeholder}
              </Placeholder>
            : null}
        </p>
      )
    }
  }

  const schema = {
    rules: [
      PARAGRAPH_RENDER_RULE,
    ]
  }

  return {
    schema,
  }
}
