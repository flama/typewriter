import React from 'react'
import RcTooltip from 'rc-tooltip'

export default (props) => {
  return (
    <RcTooltip
      trigger={['hover']}
      mouseEnterDelay={.3}
      mouseLeaveDelay={0}
      destroyTooltipOnHide={true}
      placement="top"
      overlay={ props.tip || '' }
      transitionName=""
    >
      { props.children }
    </RcTooltip>
  )
}
