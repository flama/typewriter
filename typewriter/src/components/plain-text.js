import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { State } from 'slate'

import { tryAsJson } from '../helpers/utils'
import PhrasePlugin from '../plugins/phrase'

export default class PlainText extends Component {
  emptyState = {
    document: {
      nodes: [
        {
          kind: 'block',
          type: 'phrase',
          nodes: [{
            kind: 'text',
            leaves: [{ text: '' }],
          }]
        }
      ]
    }
  }

  state = {
    editorState: State.fromJSON(tryAsJson(this.props.content) || this.emptyState),
  }

  plugins = [
    PhrasePlugin({ renderAs: this.props.renderAs, placeholder: this.props.placeholder })
  ]

  onChange = ({ state }) => {
    this.props.onChange && this.props.onChange(JSON.stringify(state.toJSON()))
    this.setState({ editorState: state })
  }

  render() {
    return (
      <Editor
        spellCheck={false}
        plugins={this.plugins}
        onChange={this.onChange}
        state={this.state.editorState}
      />
    )
  }
}
