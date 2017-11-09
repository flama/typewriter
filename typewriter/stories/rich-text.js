import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { RichText } from '../src'


const content = JSON.stringify({
  document: {
    nodes: [{
      kind: 'block',
      type: 'paragraph',
      nodes: [{
        kind: 'text',
        leaves: [{
            text: 'A '
          }, {
            marks: [{ type: 'code' }],
            text: 'line'
          }, {
            text: ' of '
          }, {
            marks: [{ type: 'highlight' }],
            text: 'text'
          }, {
            text: ' in a '
          }, {
            marks: [{ type: 'bold' }, { type: 'italic' }],
            text: 'paragraph'
          }, {
            text: '. '
          }, {
            marks: [{ type: 'strikethrough'}],
            text: 'Fixed.'
        }]
      }]
    }]
  }
})

const multiple = JSON.stringify({
  document: {
    nodes: [{
      kind: 'block',
      type: 'paragraph',
      nodes: [{
        kind: 'text',
        leaves: [{
          text: 'Lorem ipsum dolor sit amet, usu dolor qualisque et, per tota ancillae et, nam quod congue munere id. Albucius intellegat qui ne. Aperiri efficiantur nec ei, natum dicta legimus id vix. At vidit mutat noluisse vim, persius placerat no per. Mei in omnes habemus, ne vivendum eloquentiam mei, ea eum harum ludus antiopam. Duo ei voluptua tacimates inciderint.'
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


storiesOf('RichText', module)
  .add('empty', () =>
    <RichText />
  )
  .add('with placeholder', () =>
    <RichText
      placeholder="Escreva aqui"
    />
  )
  .add('with content', () =>
    <RichText
      content={content}
      placeholder="Escreva aqui"
    />
  )
  .add('multiple paragraphs', () =>
    <RichText
      content={multiple}
    />
  )
  .add('listen onChange', () =>
    <RichText
      placeholder="Escreva aqui"
      onChange={action('body changed')}
    />
  )
