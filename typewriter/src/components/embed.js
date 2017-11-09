import React, { Component } from 'react'
import renderHTML from 'react-render-html'

export default class Embed extends Component {
  componentWillMount() {
    this.embedComponent = renderHTML(this.cleanContent())
  }

  isSelected = () => {
    const { node, state } = this.props

    const isSelected = state.selection.hasEdgeIn(node)
    return isSelected
  }

  onClick = (event) => {
    event.stopPropagation()
  }

  cleanContent = () => {
    const content = this.props.node.data.get('content')

    const extractedScript = /<script[^>]+>((?:\s|.)+)<\/script>/gi.exec(content)
    if (!extractedScript) return content

    const cleanContent = content.replace(extractedScript[0], '')

    setTimeout(() => {
      eval(extractedScript[1])
    }, 10)

    return cleanContent
  }

  render() {
    const colorSystem = '#4F47FF'

    return (
      <div {...this.props.attributes}
        className="embed-input"
        style={{
          outline: this.isSelected() ? `4px solid ${colorSystem}` : 'none',
        }}
      >
        <div className="mask" />
        <div className="embed">
          {this.embedComponent}
        </div>
      </div>
    )
  }
}
