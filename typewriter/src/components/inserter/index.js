import React, { Component } from 'react'
import { findDOMNode } from 'slate-react'
import Button from './button'

export default class Inserter extends Component {
  state = {
    position: 0,
    isOpen: false,
    currentTool: false,
  }

  inserterLifespan = 2000

  nodeVariantsBy = {}
  inputs = {}

  triggers = [
    'blockquote',
    'ul',
    'ol',
    'li',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'paragraph',
  ]

  componentWillMount() {
    this.triggers.forEach((trigger) => {
      global.addEventListener(`${trigger}:mouseenter`, this.updateNode, false)
      global.addEventListener(`${trigger}:mouseover`, this.show, false)
    })
  }

  componentWillUnmount() {
    clearTimeout(this.state.inserterTimeoutId)

    this.triggers.forEach((trigger) => {
      global.removeEventListener(`${trigger}:mouseenter`, this.updateNode, false)
      global.removeEventListener(`${trigger}:mouseover`, this.show, false)
    })
  }

  updateNode = (event) => {
    const { node } = event.detail

    this.setState((prevState) => {
      let nextState = {node}

      if (node !== prevState.node && !prevState.isOpen) {
        this.currentNode = findDOMNode(node)
      }

      // don't update position while open
      if (!prevState.isOpen) {
        nextState = {...nextState, position: this.currentNode.offsetTop }
      }

      // re-enable animations next time it will be visible
      if (prevState.isVisible) {
        this.disableAnimation = false
      }

      return nextState
    })
  }

  hide = () =>  {
    this.setState({ isVisible: false })
  }

  isCurrentBlockEmpty = () => {
    const { editorState } = this.props
    return editorState.startBlock && editorState.startBlock.type === 'paragraph' && editorState.startBlock.text === ''
  }

  show = () => {
    // if (this.isCurrentBlockEmpty()) return

    clearTimeout(this.state.inserterTimeoutId)

    this.setState({
      isVisible: true,
      inserterTimeoutId: setTimeout(this.hide, this.inserterLifespan)
    })
  }

  toggle = () => {
    if (this.state.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  open = () => {
    if (this.currentNode) {
      this.currentNode.classList.add('-with-menu-open')
    }
    this.setState({ isOpen: true })
  }

  close = () => {
    this.setState(
      { isOpen: false },
      this.currentNode && this.currentNode.classList.remove('-with-menu-open')
    )
    this.clearPlaceholder()
  }

  closeWithoutAnimation = () => {
    this.disableAnimation = true
    this.close()
  }

  isOpenVariant = () => {
    return this.state.isOpen ? '-open' : ''
  }

  isVisibleVariant = () => {
    return this.isVisible() ? '-visible' : ''
  }

  placeholderVariant = () => {
    const { currentTool } = this.state
    if (currentTool) {
      const toolName = this.nameFrom(currentTool)
      return this.nodeVariantsBy[toolName]
    }

    return ''
  }

  isVisible = () => {
    const {
      isVisible,
      isHovering,
    } = this.state

    return isVisible || isHovering
  }

  handleMouseEnter = () => {
    this.setState({ isHovering: true })
  }

  handleMouseLeave = () => {
    this.setState({ isHovering: false })
  }

  focusPlaceholderInput = () => {
    const { currentTool } = this.state

    if (this.getInputBy(currentTool)) {
      this.getInputBy(currentTool).focus()
    }
  }

  getInputBy = (tool) => {
    return this.inputs[tool.type.name]
  }

  showPlaceholderFor = (tool) => {
    return (event) => {
      this.clearPlaceholder()

      if (this.currentNode) {
        const toolName = this.nameFrom(tool)
        this.currentNode.classList.add(this.nodeVariantsBy[toolName])
      }

      this.setState({ currentTool: tool }, this.focusPlaceholderInput)
    }
  }

  clearPlaceholder = () => {
    this.tools.forEach(tool => {
      if (this.currentNode) {
        const toolName = this.nameFrom(tool)
        this.currentNode.classList.remove(this.nodeVariantsBy[toolName])
      }
    })

    this.setState({ currentTool: false })
  }

  onMount = (tool, input) => {
    this.inputs[tool.type.name] = input
  }

  extractNodeVariantFrom = (tool) => {
    const toolName = this.nameFrom(tool)
    const nodeVariant = tool.props.nodeVariant || `-with-${toolName}`
    this.nodeVariantsBy[toolName] = nodeVariant
  }

  nameFrom = (tool) => {
    return tool.props.buttonClass || tool.type.name.toLowerCase()
  }

  render() {
    const {
      editorState,
      onChange,
    } = this.props

    const {
      node,
    } = this.state

    this.nodeVariantsBy = {}

    this.tools = React.Children.map(this.props.children, (child) => {
      this.extractNodeVariantFrom(child)

      return React.cloneElement(child, {
        node,
        onChange,
        editorState,
        close: this.close,
        onMount: input => this.onMount(child, input),
      })
    }) || []

    return (
      <div
        className={`inserter-menu ${this.isOpenVariant()} ${this.isVisibleVariant()}`}
        style={{ top: `${this.state.position}px` }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="toggle"
          onClick={this.toggle}
          style={this.disableAnimation ? { transition: 'none', opacity: 0 } : {}}
        />
        <div className="content">
          <div className="menu">
            {
              this.tools.map(tool => {
                return <Button
                  tool={tool}
                  name={this.nameFrom(tool)}
                  key={this.nameFrom(tool)}
                  onMouseEnter={this.showPlaceholderFor(tool)}
                />
              })
            }
          </div>
          <div className={`placeholder ${this.placeholderVariant()}`}>
            {this.tools}
          </div>
        </div>
      </div>
    )
  }
}
