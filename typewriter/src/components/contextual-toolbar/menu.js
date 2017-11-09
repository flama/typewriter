import React, { Component } from 'react'
import Portal from 'react-portal'
import MarkButton from './mark-button'
import BlockButton from './block-button'
import LinkButton from './link-button'
import HoveringElement from './hovering-element'

import performBounceAnimation, { resetBounceAnimation } from '../../helpers/perform-bounce-animation'

export default class Menu extends Component {
  state = {
    portalNode: null,
    shouldBeVisible: false,
    rect: null
  }

  componentDidUpdate(prevProps) {
    this.prevSelection = prevProps.editorState.selection
    if (this.prevSelection !== this.props.editorState.selection) {
      this.updateVisibility()
    }
  }

  updateVisibility = () => {
    this.setState({
      shouldBeVisible: this.shouldBeVisible(),
      rect: this.getSelectionRect(),
    })
  }

  getSelectionRect = () => {
    if (window.getSelection().anchorNode) {
      return window.getSelection().getRangeAt(0).getBoundingClientRect()
    }
  }

  shouldBeVisible = () => {
    const { editorState } = this.props
    const currentSelection = editorState.selection

    // if menu is not ready yet
    if (!this.state.portalNode) return false

    // selection is empty
    if (editorState.isBlurred) return false

    // selection is empty
    if (currentSelection.isCollapsed) return false

    // browser loses track of selection
    // - pressing cmd+z while selecting text
    const selectionRect = this.getSelectionRect()
    if (selectionRect.top === 0 && selectionRect.left === 0) return false

    return true
  }

  onOpen = () => {
    this.props.onOpen && this.props.onOpen()

    performBounceAnimation(this.state.portalNode, this.getSelectionRect())
  }

  onClose = () => {
    resetBounceAnimation(this.state.portalNode)
    this.props.onClose && this.props.onClose()
  }

  onLoad = (portal) => {
    this.setState({ portalNode: portal.firstChild })
  }

  render() {
    const {
      shouldBeVisible,
      isVisible,
      rect,
    } = this.state

    const {
      editorState,
      onChange,
      marks,
      blocks,
      inlines,
    } = this.props

    return (
    <HoveringElement
        editorState={editorState}
        onLoad={this.onLoad}
        onOpen={this.onOpen}
        onClose={this.onClose}
        shouldBeVisible={shouldBeVisible}
        rect={rect}
        className="highlight-toolbar"
      >
        {marks.map(type =>
          <MarkButton
            key={type}
            type={type}
            state={editorState}
            onChange={onChange}
          />
        )}
        {blocks.map(type =>
          <BlockButton
            key={type}
            type={type}
            state={editorState}
            onChange={onChange}
          />
        )}

        {inlines.includes('link') &&
          <LinkButton
            openLinkInput={this.props.openLinkInput}
          />
        }
      </HoveringElement>
    )
  }
}
