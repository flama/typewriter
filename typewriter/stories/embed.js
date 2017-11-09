import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  RichText,
  Embed,
  EmbedsToolbar,
} from '../src'

const multiple = JSON.stringify({
  document: {
    nodes: [{
      kind: 'block',
      type: 'heading-two',
      nodes: [{
        kind: 'text',
        leaves: [{
          text: 'A heading'
        }]
      }]
    }, {
      kind: 'block',
      type: 'paragraph',
      nodes: [{
        kind: 'text',
        leaves: [{
          text: 'Nam te purto deserunt, sed suavitate democritum cotidieque ut. Has case eius maiorum cu. Has id liber adolescens, ex per omnes causae aeterno, tation eirmod pro in. An nobis scripta epicurei nam, eu purto corrumpit eum, ex probatus tacimates invenire ius. Ad molestie assentior reprimique per, legendos expetendis efficiantur ad sed. Id omnium percipit petentium nec.'
        }]
      }]
    }, {
      kind: 'block',
      type: 'heading-three',
      nodes: [{
        kind: 'text',
        leaves: [{
          text: 'A subheading'
        }]
      }]
    }, {
      kind: 'block',
      type: 'paragraph',
      nodes: [{
        kind: 'text',
        leaves: [{
          text: 'Nam te purto deserunt, sed suavitate democritum cotidieque ut. Has case eius maiorum cu. Has id liber adolescens, ex per omnes causae aeterno, tation eirmod pro in. An nobis scripta epicurei nam, eu purto corrumpit eum, ex probatus tacimates invenire ius. Ad molestie assentior reprimique per, legendos expetendis efficiantur ad sed. Id omnium percipit petentium nec.'
        }]
      }]
    }]
  }
})

storiesOf('Embed', module)
.add('with tooltip', () =>
  <RichText content={multiple}>
    <EmbedsToolbar>
      <Embed
        tooltip='Embutir código'
        placeholder='Cole aqui o código a ser embutido'
      />
    </EmbedsToolbar>
  </RichText>
)
