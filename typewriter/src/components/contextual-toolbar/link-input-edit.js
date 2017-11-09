import React, { Component } from 'react'
import { findDOMNode } from 'slate-react'
import Portal from 'react-portal'
import keycode from 'keycode'

import HoveringElement from './hovering-element'

import hrefAutoWrap from '../../helpers/href-auto-wrap'
import performBounceAnimation, { resetBounceAnimation } from '../../helpers/perform-bounce-animation'

export default class LinkInputEdit extends Component {
  state = {
    shouldBeVisible: false,
    value: '',
    rect: null,
  }

  closeTimeoutId = null
  delayToClose = 1500

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isSelectionMenuOpen !== this.props.isSelectionMenuOpen && this.props.isSelectionMenuOpen) {
      this.close()
      return
    }

    const isVisibleUpdated = prevProps.isVisible !== this.props.isVisible
    const hoveringLinkUpdated = prevProps.hoveringLink !== this.props.hoveringLink

    if (hoveringLinkUpdated || isVisibleUpdated) {
      this.updateVisibility()
    }
  }

  updateVisibility = () => {
    const rect = this.props.hoveringLink && findDOMNode(this.props.hoveringLink).getBoundingClientRect()
    this.setState({
      shouldBeVisible: this.shouldBeVisible(),
      rect: rect,
    })
  }

  shouldBeVisible = () => {
    return this.props.hoveringLink && this.props.isVisible
  }

  onOpen = () => {
    performBounceAnimation(this.portalNode, this.state.rect)

    this.setState({
      value: this.props.hoveringLink.data.get('href')
    })

    this.scheduleClose()
  }

  scheduleClose = () => {
    this.cancelScheduledClose()
    const id = setTimeout(this.close, this.delayToClose)
    this.closeTimeoutId =  id
  }

  cancelScheduledClose = () => {
    clearTimeout(this.closeTimeoutId)
  }

  handleKeyUp = (event) => {
    if (keycode(event) === 'enter') {
      this.addLink()
      this.close()
    }
  }

  addLink = () => {
    const { editorState } = this.props
    const href = hrefAutoWrap(this.input.value)

    const next = editorState.change()
      .setNodeByKey(this.props.hoveringLink.key, {
        data: { href }
      })
      .collapseToEndOf(this.props.hoveringLink)
      .focus()

    this.setState({ value: '' })
    this.props.onChange(next)
  }

  onChange = (event) => {
    this.setState({ value: event.target.value })
  }

  close = () => {
    resetBounceAnimation(this.portalNode)
    this.props.onBlur()
  }

  onMouseEnter = () => {
    this.cancelScheduledClose()
  }

  onMouseOut = () => {
    this.scheduleClose()
  }

  handleCleanUp = (event) => {
    const { hoveringLink } = this.props
    const { editorState } = this.props

    const next = editorState
      .change()
      .moveToRangeOf(hoveringLink)
      .unwrapInline('link')

    this.props.onChange(next)
    this.close()
  }

  onLoad = (portal) => {
    this.portalNode = portal.firstChild
  }

  render() {
    const {
      shouldBeVisible,
      value,
      rect,
    } = this.state

    const {
      editorState,
      onBlur,
    } = this.props

    return (
      <HoveringElement
        editorState={editorState}
        onOpen={this.onOpen}
        onLoad={this.onLoad}
        shouldBeVisible={shouldBeVisible}
        rect={rect}
        className="link-input"
      >
        <input type="text"
          onKeyUp={this.handleKeyUp}
          ref={i => this.input = i}
          onBlur={onBlur}
          onChange={this.onChange}
          value={value}
          autoComplete="False"
          className="input"
          onMouseEnter={this.onMouseEnter}
          onMouseOut={this.onMouseOut}
        />
        <button
          onMouseDown={this.handleCleanUp}
          className="remove"
          onMouseEnter={this.onMouseEnter}
          onMouseOut={this.onMouseOut}
        />
      </HoveringElement>

    )
  }
}
