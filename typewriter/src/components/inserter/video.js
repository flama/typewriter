import React, { Component } from 'react'
import keycode from 'keycode'

import createEmbedUrl from '../../helpers/create-embed-url'

export default class Video extends Component {
  componentDidMount() {
    this.props.onMount && this.props.onMount(this.input)
  }

  handleInput = (event) => {
    const validUrl = createEmbedUrl(event.target.value)

    if (keycode(event) === 'enter' && validUrl) {
      event.preventDefault()
      this.insertVideoWithUrl(validUrl)
      this.input.value = ""
      this.props.close && this.props.close()
    }
  }

  cancelEnter = (event) => {
    if (keycode(event) === 'enter') {
      event.preventDefault()
    }
  }

  insertVideoWithUrl = (videoUrl) => {
    const { editorState, node } = this.props

    let next = editorState.change()

    if (node) {
      next.collapseToStartOf(node)
    }

    next.insertBlock({
      type: 'video',
      data: { video: videoUrl },
      isVoid: true,
    })
    .collapseToEnd()
    .focus()

    this.props.onChange(next)
  }

  render() {
    const { placeholder } = this.props
    return (
      <div className="video droparea">
        <input
          type="text"
          className="input"
          placeholder={placeholder}
          onKeyDown={this.cancelEnter}
          onKeyUp={this.handleInput}
          ref={i => this.input = i}
          id="video-input"
        />
      </div>
    )
  }
}
