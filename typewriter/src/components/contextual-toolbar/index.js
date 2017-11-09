import React, { Component } from 'react'
import Menu from './menu'
import LinkInput from './link-input'
import LinkInputEdit from './link-input-edit'

export default class ContextualToolbar extends Component {
  state = {
    isSelectionMenuOpen: false,
    shouldLinkInputBeVisible: false,
    shouldLinkInputEditBeVisible: false,
  }

  componentWillMount() {
    global.addEventListener('link:mouseenter', this.handleLinkMouseEnter, false)
  }

  componentWillUnmount() {
    global.removeEventListener('link:mouseenter', this.handleLinkMouseEnter, false)
  }

  onSelectionMenuOpen = () => {
    this.setState({isSelectionMenuOpen: true})
  }

  onSelectionMenuClose = () => {
    this.setState({isSelectionMenuOpen: false})
  }

  handleOpenLinkInput = (event) => {
    this.setState({
      shouldLinkInputBeVisible: true
    })
  }

  handleCloseLinkInput = (event) => {
    this.setState({
      shouldLinkInputBeVisible: false
    })
  }

  handleCloseLinkInputEdit = (event) => {
    this.setState({
      hoveringLink: null,
      shouldLinkInputEditBeVisible: false
    })
  }


  handleLinkMouseEnter = (event) => {
    if (this.state.isSelectionMenuOpen) return

    this.setState({
      hoveringLink: event.detail.node,
      shouldLinkInputEditBeVisible: true
    })
  }

  render() {
    const {
      marks,
      blocks,
      editorState,
      onChange,
    } = this.props

    const {
      shouldLinkInputBeVisible,
      shouldLinkInputEditBeVisible,
      isSelectionMenuOpen,
      hoveringLink,
    } = this.state

    return (<div>

      <Menu
        {...this.props}
        onOpen={this.onSelectionMenuOpen}
        onClose={this.onSelectionMenuClose}
        openLinkInput={this.handleOpenLinkInput}
      />

      <LinkInput
        editorState={editorState}
        onChange={onChange}
        isVisible={shouldLinkInputBeVisible}
        onBlur={this.handleCloseLinkInput}
      />

      <LinkInputEdit
        editorState={editorState}
        onChange={onChange}

        onBlur={this.handleCloseLinkInputEdit}
        isVisible={shouldLinkInputEditBeVisible}
        hoveringLink={hoveringLink}
        isSelectionMenuOpen={isSelectionMenuOpen}
      />

    </div>)
  }
}

ContextualToolbar.defaultProps = {
  marks: [],
  blocks: [],
  inlines: [],
}
