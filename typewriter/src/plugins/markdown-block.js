import React from 'react'
import keycode from 'keycode'

const wrapWithElement = (Element, options) => {
  const dispatchCustomEvent = (eventName, detail) => {
    const event = new CustomEvent(eventName, { detail: detail })
    global.dispatchEvent(event)
  }


  return props => (
    <Element
      onMouseEnter={ () => dispatchCustomEvent(`${Element}:mouseenter`, { node: props.node }) }
      onMouseOver={ () => dispatchCustomEvent(`${Element}:mouseover`, { node: props.node }) }
      {...props.attributes}
    >
      {props.children}
    </Element>
  )
}

export default (options = {}) => {

  const schema = {
    nodes: {
      'block-quote': wrapWithElement('blockquote', options),
      'bulleted-list': wrapWithElement('ul', {...options, className: 'article-list'}),
      'numbered-list': wrapWithElement('ol', {...options, className: 'article-list -numbered'}),
      'list-item': wrapWithElement('li', {className: 'item'}),
      'heading-one': wrapWithElement('h1', options),
      'heading-two': wrapWithElement('h2', options),
      'heading-three': wrapWithElement('h3', options),
      'heading-four': wrapWithElement('h4', options),
      'heading-five': wrapWithElement('h5', options),
      'heading-six': wrapWithElement('h6', options),
    }
  }

  const TYPES = {
    '*': 'bulleted-list',
    '-': 'bulleted-list',
    '+': 'bulleted-list',
    '1.': 'numbered-list',
    '1-': 'numbered-list',
    '>': 'block-quote',
    '#': 'heading-one',
    '##': 'heading-two',
    '###': 'heading-three',
    '####': 'heading-four',
    '#####': 'heading-five',
    '######': 'heading-six',
  }

  const onKeyDown = (event, data, state) => {
    switch(keycode(event.which)) {
      case 'space': return onSpace(event, state)
      case 'backspace': return onBackspace(event, state)
      case 'enter': return onEnter(event, state)
    }
  }

  const isList = (type) => {
    return type === 'bulleted-list'
     || type === 'numbered-list'
     || type === 'list-item'
  }

  const onSpace = (event, change) =>  {
    const { state } = change

    if (state.isExpanded) return
    const { startBlock, startOffset } = state
    const match = startBlock.text.slice(0, startOffset).replace(/\s*/g, '')
    const type = TYPES[match]

    if (!type) return
    if (isList(type) && isList(startBlock.type)) return
    event.preventDefault()

    if (!isList(type)) {
      change.setBlock(type)
    } else {
      change.setBlock('list-item')
      change.wrapBlock(type)
    }

    change
      .extendToStartOf(startBlock)
      .delete()

    return true
  }

  const onBackspace = (event, change) => {
    const { state } = change

    if (state.isExpanded) return
    if (state.startOffset !== 0) return
    const { startBlock } = state

    if (startBlock.type === 'paragraph') return
    event.preventDefault()

    let next = change.setBlock('paragraph')

    if (isList(startBlock.type)) {
      change.unwrapBlock(startBlock.type)
      change.unwrapBlock('bulleted-list')
      change.unwrapBlock('numbered-list')
    }

    return true
  }

  const onEnter = (event, change) => {
    const { state } = change

    if (state.isExpanded) return
    const { startBlock, startOffset, endOffset } = state

    if (startOffset === 0 && startBlock.text.length === 0) {
      return onBackspace(event, change)
    }

    if (!Object.values(TYPES).includes(startBlock.type)) return

    event.preventDefault()
    change.splitBlock()

    if (startBlock.type === 'list-item') {
      change.setBlock('list-item')
    } else {
      change.setBlock('paragraph')
    }

    return true
  }

  return {
    schema,
    onKeyDown,
  }
}
