import React, { Component } from 'react'
import keycode from 'keycode'
import hrefAutoWrap from '../helpers/href-auto-wrap'

export default class Link extends Component {
  onMouseEnter = (event) => {
    this.stillHovering = true

    setTimeout(() => {

      if (this.stillHovering) {
        global.dispatchEvent(new CustomEvent('link:mouseenter', {
          detail: {
            node: this.props.node
          }
        }))
      }

    }, 500)
  }

  onMouseLeave = (event) => {
    this.stillHovering = false
  }

  render() {
    return (
      <a {...this.props.attributes}
        href={this.props.node.data.get('href')}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {this.props.children}
      </a>
    )
  }
}
