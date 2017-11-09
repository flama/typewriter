import React, { Component } from 'react'
import Portal from 'react-portal'

export default class HoveringElement extends Component {
  state = {
    isVisible: false,
    positionTop: 0,
    positionLeft: 0,
    portalNode: null,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rect !== this.props.rect) {
      this.updatePosition()
      this.updateVisibility()
    }

    if (prevProps.shouldBeVisible !== this.props.shouldBeVisible) {
      this.updatePosition()
      this.updateVisibility()
    }

    if (prevProps.editorState.selection !== this.props.editorState.selection) {
      this.updatePosition()
    }
  }

  updateVisibility = () => {
    if (this.props.shouldBeVisible) {
      this.open()
    } else {
      this.close()
    }
  }

  open = () => {
    this.setState({isVisible: true}, () => {
      this.props.onOpen && this.props.onOpen()
    })
  }

  close = () => {
    this.setState({isVisible: false}, () => {
      this.props.onClose && this.props.onClose()
    })
  }

  updatePosition = () => {
    const { portalNode } = this.state
    const { rect } = this.props

    if (rect) {
      const positionTop = rect.top + window.scrollY - portalNode.offsetHeight
      const positionLeft = rect.left + window.scrollX - portalNode.offsetWidth / 2 + rect.width / 2

      this.setState({
        positionTop,
        positionLeft,
      })
    }
  }

  onLoad = (portal) => {
    this.setState({ portalNode: portal.firstChild })
    this.props.onLoad && this.props.onLoad(portal)
  }

  render() {
    const {
      isVisible,
      positionTop,
      positionLeft,
    } = this.state

    const { className } = this.props

    return (
      <Portal isOpened onOpen={this.onLoad}>
        <div
          className={`${className} ${isVisible ? '-shown' : ''}`}
          style={{
            top: `${positionTop}px`,
            left: `${positionLeft}px`,
            opacity: (isVisible ? 1 : 0),
          }}
        >
          { this.props.children }
        </div>
      </Portal>
    )
  }
}
