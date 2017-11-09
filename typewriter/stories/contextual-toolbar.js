import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { ContextualToolbar, RichText } from '../src'

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

const links = JSON.stringify({
  document: {
    nodes: [{
      kind: 'block',
      type: 'paragraph',
      nodes: [{
        kind: 'text',
        leaves: [{
          text: 'Lorem '
        }]
      }, {
        kind: 'inline',
        type: 'link',
        isVoid: false,
        data: { href: 'http://lol' },
        nodes: [{
          kind: 'text',
          leaves: [{
            kind: 'leaf',
            marks: [],
            text: 'ipsum'
          }]
        }]
      }, {
        kind: 'text',
        leaves: [{
          text: ' dolor'
        }]
      }]
    }]
  }
})


storiesOf('ContextualToolbar', module)
  .add('empty', () =>
    <RichText content={content}>
      <ContextualToolbar />
    </RichText>
  )
  .add('with marks', () => {
    const marks = [
      'bold',
      'italic',
      'strikethrough',
      'highlight',
      'code',
    ]

    return <RichText content={content}>
      <ContextualToolbar marks={marks} />
    </RichText>
  })
  .add('with headings', () => {
    const blocks = [
      'heading-two',
      'heading-three',
    ]

    return <RichText content={multiple}>
      <ContextualToolbar blocks={blocks} />
    </RichText>
  })
  .add('with lists', () => {
    const blocks = [
      'bulleted-list',
      'numbered-list',
    ]

    return <RichText content={multiple}>
      <ContextualToolbar blocks={blocks} />
    </RichText>
  })
  .add('with link', () => {
    const inlines = [
      'link',
    ]

    return (
      <RichText content={links}>
        <ContextualToolbar inlines={inlines} />
      </RichText>
    )
  })
