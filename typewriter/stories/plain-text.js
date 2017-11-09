import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { PlainText } from '../src'

const h1 = (attrs, text) =>
  <h1 className="title" {...attrs}>
    {text}
  </h1>

const plain = (text) => JSON.stringify({
  document: {
    nodes: [
      {
        kind: 'block',
        type: 'phrase',
        nodes: [
          {
            kind: 'text',
            leaves: [{
              text: text
            }]
          }
        ]
      }
    ]
  }
})

storiesOf('PlainText', module)
  .add('empty', () =>
    <PlainText
      renderAs={h1}
      onChange={action('title changed')}
    />
  )
  .add('with placeholder', () =>
    <PlainText
      placeholder="Clique aqui para dar um título"
      renderAs={h1}
      onChange={action('title changed')}
    />
  )
  .add('with content', () =>
    <PlainText
      content={plain("Um título de exemplo")}
      placeholder="Clique aqui para dar um título"
      renderAs={h1}
      onChange={action('title changed')}
    />
  )
