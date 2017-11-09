import React, { Component } from 'react'

export default class Image extends Component {
  componentDidMount() {
    this.props.onMount && this.props.onMount(this.input)
  }

  handleChange = (event) => {
    event.preventDefault()

    const file = event.target.files[0]
    this.props.close()
    this.appendImage(file)
  }

  appendImage = (file) => {
    const { editorState, node } = this.props

    const next = editorState.change()

    if (node) {
      next.collapseToStartOf(node)
    }

    next.insertBlock({
      type: 'image',
      data: { file },
      isVoid: true,
    })
    .collapseToEnd()
    .focus()

    this.props.onChange(next)
  }

  render() {
    const { children } = this.props

    return (
      <label className="image droparea" htmlFor="image-upload-editor">
        {children}

        <input
          id="image-upload-editor"
          type="file"
          onChange={this.handleChange}
          style={{
            height: 0,
            position: 'absolute',
            overflow: 'hidden'
          }}
          accept="image/*"
          ref={i => this.input = i}
        />
      </label>
    )
  }
}
