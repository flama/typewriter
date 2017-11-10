import React from 'react'
import { Placeholder } from 'slate-react'

export default (options = {}) => {
  const {
    renderAs,
    placeholder,
    placeholderClassName = 'placeholder',
  } = options

  const PHRASE_RENDER_RULE = {
    match: node => node.type === 'phrase',
    render: (props) => {
      const attrs = Object.assign({}, {...props.attributes}, {style: { position: 'relative' }})

      const children = <span>
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
      </span>

      return renderAs(attrs, children)
    }
  }

  const schema = {
    rules: [
      PHRASE_RENDER_RULE,
    ]
  }

  return {
    schema,
  }
}
