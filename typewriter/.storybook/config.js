import React from 'react'
import { configure, addDecorator } from '@storybook/react'

addDecorator(story =>
  <div className="article-editor">
    {story()}
  </div>
)

configure(() => require('../stories'), module)
