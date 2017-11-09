import React, { Component } from 'react'
import keycode from 'keycode'

export default class Embed extends Component {
  componentDidMount() {
    this.props.onMount && this.props.onMount(this.input)
  }

  handleInput = (event) => {
    if (~event.clipboardData.types.indexOf('text/plain')) {
      const data = event.clipboardData.getData('text/plain')

      event.preventDefault()
      this.insertEmbed(data)
      this.props.close()
    }
  }

  insertEmbed = (content) => {
    const { editorState, node } = this.props

    const next = editorState.change()
      .collapseToStartOf(node)
      .insertBlock({
        type: 'embed',
        data: { content },
        isVoid: true,
      })
      .collapseToEnd()
      .focus()

    this.props.onChange(next)
  }

  render() {
    const { placeholder } = this.props

    return (
      <div className="embed droparea">
        <textarea
          type="text"
          className="input"
          placeholder={placeholder}
          onPaste={this.handleInput}
          ref={i => this.input = i}
        />
      </div>
    )
  }
}
