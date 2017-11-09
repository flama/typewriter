import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { State } from 'slate'

import { tryAsJson } from '../helpers/utils'

import Paragraph from '../plugins/paragraph'
import BoldMark from '../plugins/bold-mark'
import BoldMarkdown from '../plugins/bold-markdown'
import ItalicMark from '../plugins/italic-mark'
import ItalicMarkdown from '../plugins/italic-markdown'
import StrikeThroughMark from '../plugins/strike-through-mark'
import StrikeThroughMarkdown from '../plugins/strike-through-markdown'
import UnderlineMark from '../plugins/underline-mark'
import HighlightMark from '../plugins/highlight-mark'
import MarkdownBlockPlugin from '../plugins/markdown-block'
import CodeMarkdown from '../plugins/code-markdown'
import Link from '../plugins/link'
import Video from '../plugins/video'
import Embed from '../plugins/embed'
import Image from '../plugins/image'

export default class RichText extends Component {
  defaultProps = {
    onChange: (_ => _),
    presignFrom: null,
    uploadTo: null,
    captions: {},
  }

  emptyState = {
    document: {
      nodes: [
        {
          kind: 'block',
          type: 'paragraph',
          nodes: []
        }
      ]
    }
  }

  state = {
    editorState: State.fromJSON(tryAsJson(this.props.content) || this.emptyState),
  }

  plugins = [
    Paragraph({ placeholder: this.props.placeholder }),
    BoldMark(),
    BoldMarkdown(),
    ItalicMark(),
    ItalicMarkdown(),
    StrikeThroughMark(),
    StrikeThroughMarkdown(),
    UnderlineMark(),
    HighlightMark(),
    MarkdownBlockPlugin({}),
    CodeMarkdown(),
    Link(),
    Video(),
    Embed(),
    Image({
      attributes: {
        presignFrom: this.props.presignFrom,
        uploadTo: this.props.uploadTo,
        captions: this.props.captions,
      }
    }),
  ]

  onChange = ({ state }) => {
    this.props.onChange(JSON.stringify(state.toJSON()))
    this.setState({ editorState: state })
  }

  render() {
    const {
      editorState,
    } = this.state

    // Pass default props to children
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        editorState,
        onChange: this.onChange,
      })
    })

    return (
      <div className="richtext-editor">
        {children}

        <Editor
          state={editorState}
          onChange={this.onChange}
          plugins={this.plugins}
          autoFocus={true}
        />
      </div>
    )
  }
}
