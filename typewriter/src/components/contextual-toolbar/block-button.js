import React from 'react'

export default (props) => {
  const wantList = ['bulleted-list', 'numbered-list'].includes(props.type)

  const hasBlock = (type) => {
    const { state } = props
    const { document } = state

    if (wantList) {
      return state.blocks.some(block => !!document.getClosest(block.key, parent => parent.type === type))
    }

    return state.blocks.some(node => node.type === type)
  }

  const onClickBlock = (event) => {
    event.preventDefault()
    const { state } = props

    const change = state.change()

    if (wantList) {
      const isList = hasBlock('list-item')

      change.unwrapBlock('bulleted-list')
      change.unwrapBlock('numbered-list')

      if (hasBlock(props.type)) {
        change.setBlock('paragraph')
      } else {
        change.wrapBlock(props.type)
        change.setBlock('list-item')
      }
    } else {
      change.setBlock(hasBlock(props.type) ? 'paragraph' : props.type)
    }

    props.onChange(change)
  }

  return (
    <div className={`highlight-toolbar-button -${props.type} ${hasBlock(props.type) ? '-active' : ''}`}
      onMouseDown={onClickBlock}
    ></div>
  )
}
