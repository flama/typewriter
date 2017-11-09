import React from 'react'

export default (props) => {
  const hasMark = () => {
    const { state } = props
    return state.marks.some(mark => mark.type === props.type)
  }

  const onClickMark = (event) => {
    event.preventDefault()
    let { state } = props

    const next = state
      .change()
      .toggleMark(props.type)

    props.onChange(next)
  }

  return (
    <div className={`highlight-toolbar-button -${props.type} ${hasMark() ? '-active' : ''}`}
      onMouseDown={onClickMark}
    ></div>
  )
}
