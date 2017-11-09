import React, { Component } from 'react'
import autosize from 'autosize'

export default class ImageCaption extends Component {
  componentDidMount() {
    autosize(this.textarea)
  }

  componentDidUpdate() {
    autosize(this.textarea)
  }

  stopPropagation = (event) => {
    if (this.props.isSelected) {
      event.stopPropagation()
    } else {
      // delay the execution of focus to the next tick
      setTimeout(() => this.textarea.focus(), 0)
    }
  }

  shouldBeInvisible = () => {
    const { isSelected, value } = this.props
    return !isSelected && !value
  }

  render() {
    const {
      placeholder,
      className,
      onChange,
      value,
    } = this.props

    if (this.shouldBeInvisible()) return null

    return (
      <textarea
        className={className}
        value={value}
        onClick={this.stopPropagation}
        onChange={onChange}
        placeholder={placeholder}
        ref={el => this.textarea = el}
      />
    )
  }
}
