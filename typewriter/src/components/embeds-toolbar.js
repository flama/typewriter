import React, { Component } from 'react'
import Button from './inserter/button'

export default class EmbedsToolbar extends Component {
  state = {
    currentTool: null,
  }

  nodeVariantsBy = {}

  nameFrom = (tool) => {
    return tool.props.buttonClass || tool.type.name.toLowerCase()
  }

  placeholderVariant = () => {
    const { currentTool } = this.state
    if (currentTool) {
      const toolName = this.nameFrom(currentTool)
      return this.nodeVariantsBy[toolName]
    }

    return ''
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

  extractNodeVariantFrom = (tool) => {
    const toolName = this.nameFrom(tool)
    const nodeVariant = tool.props.nodeVariant || `-with-${toolName}`
    this.nodeVariantsBy[toolName] = nodeVariant
  }

  close = () => {
    this.clearPlaceholder()
  }

  render() {
    const {
      editorState,
      onChange,
    } = this.props

    this.tools = React.Children.map(this.props.children, (child) => {
      this.extractNodeVariantFrom(child)

      return React.cloneElement(child, {
        onChange,
        editorState,
        close: this.close,
      })
    }) || []

    return (
      <div className="embeds-toolbar">
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
