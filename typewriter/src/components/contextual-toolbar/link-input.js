import React, { Component } from 'react'
import keycode from 'keycode'
import Portal from 'react-portal'

import HoveringElement from './hovering-element'

import hrefAutoWrap from '../../helpers/href-auto-wrap'

export default class LinkInput extends Component {
  state = {
    value: '',
    rect: null,
    shouldBeVisible: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.shouldBeVisible && prevProps.isVisible !== this.props.isVisible) {
      this.updateVisibility()
    }

    this.prevSelection = prevProps.editorState.selection
    if (this.prevSelection !== this.props.editorState.selection) {
      this.updateVisibility()
    }
  }

  updateVisibility = () => {
    this.setState({
      shouldBeVisible: this.shouldBeVisible(),
      rect: this.getSelectionRect()
    })
  }

  getSelectionRect = () => {
    if (window.getSelection().anchorNode) {
      return window.getSelection().getRangeAt(0).getBoundingClientRect()
    }
  }

  shouldBeVisible = () => {
    return this.props.isVisible
  }

  onOpen = () => {
    setTimeout(() => this.input.focus(), 0)
  }

  handleKeyUp = (event) => {
    if (keycode(event) === 'enter') {
      this.addLink()
    }

    if (keycode(event) === 'enter' || keycode(event) === 'esc') {
      this.cleanUp()
      this.props.onBlur()
    }
  }

  cleanUp = () => {
    this.setState({ value: '' })
  }

  addLink = () => {
    const { editorState } = this.props
    const href = hrefAutoWrap(this.input.value)

    const next = editorState
      .change()
      .unwrapInline('link')
      .wrapInline({
        type: 'link',
        data: { href },
      })
      .collapseToEnd()
      .focus()

    this.props.onChange(next)
  }

  onChange = (event) => {
    this.setState({ value: event.target.value })
  }

  render() {
    const {
      shouldBeVisible,
      value,
      rect,
    } = this.state

    const { editorState } = this.props

    return (
      <HoveringElement
        editorState={editorState}
        onOpen={this.onOpen}
        shouldBeVisible={shouldBeVisible}
        rect={rect}
        className="link-input"
      >
        <input type="text"
          value={value}
          className="input"
          autoComplete="False"
          onChange={this.onChange}
          onBlur={this.props.onBlur}
          onKeyUp={this.handleKeyUp}
          ref={i => this.input = i}
        />
      </HoveringElement>

    )
  }
}
