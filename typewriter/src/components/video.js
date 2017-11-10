import React, { Component } from 'react'
import createEmbedUrl from '../helpers/create-embed-url'

export default class Video extends Component {

  currentUrl = () => {
    return this.props.node.data.get('video')
  }

  isSelected = () => {
    const { node, state } = this.props
    const isSelected = state.selection.hasEdgeIn(node)
    return isSelected
  }

  onClick = (event) => {
    event.stopPropagation()
  }

  render() {
    const colorSystem = '#4F47FF'

    return (
      <div {...this.props.attributes}
        className="video-input"
        style={{
          outline: this.isSelected() ? `4px solid ${colorSystem}` : 'none',
        }}
      >
        <div className="mask" />
        <iframe
          type="text/html"
          className="embed"
          src={this.currentUrl()}
          frameBorder="0"
        />
      </div>
    )
  }
}
