import React, { Component } from 'react'
import Tooltip from '../tooltip'

export default (props) => {
  const {
    tool,
    name,
    onMouseEnter,
  } = props

  const button = <label
    className={`${name} tool`}
    htmlFor={`${name}-input`}
    onMouseEnter={onMouseEnter}
  />

  const { tooltip } = tool.props

  if (tooltip) {
    return <Tooltip tip={tooltip}>
      {button}
    </Tooltip>
  } else {
    return button
  }
}
