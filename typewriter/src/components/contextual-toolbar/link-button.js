import React from 'react'

export default props =>
  <div className={`highlight-toolbar-button -link`}
    onMouseDown={props.openLinkInput}
  />
