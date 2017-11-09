import React, { Component } from 'react'
import {
  PlainText,
  RichText,
  ContextualToolbar,
  Inserter,
  Video,
  Embed,
  Image,
} from 'typewriter'

import './style.scss'

export default class ArticleEditor extends Component {

  state = this.props.article

  renderTitleAs = (attrs, text) => <h1 className="title" {...attrs}>{text}</h1>

  onTitleChange = (title) => {
    this.setState({ title })
  }

  onBodyChange = (body) => {
    this.setState({ body })
  }

  render() {
    const {
      title,
      body,
    } = this.state

    const {
      presignFrom,
      uploadTo,
    } = this.props

    return (
      <div className="article-editor">
        <PlainText
          content={title}
          placeholder="Título do artigo"
          renderAs={this.renderTitleAs}
          onChange={this.onTitleChange}
        />

        <RichText
          content={body}
          placeholder="Escreva seu artigo aqui"
          onChange={this.onBodyChange}
          presignFrom={presignFrom}
          uploadTo={uploadTo}
          captions={{
            comment: 'Comment',
            photographer: 'Photographer'
          }}
        >

          <ContextualToolbar
            marks={[
              'bold',
              'italic',
            ]}

            inlines={[
              'link'
            ]}

            blocks={[
              'heading-two',
              'heading-three',
              'bulleted-list',
              'numbered-list',
            ]}
          />

          <Inserter>
            <Video
              tooltip='Adicionar Vídeo'
              placeholder='Cole aqui o link do seu vídeo no Youtube e clique em Enter'
            />
            <Embed
              tooltip='Embutir código'
              placeholder='Cole aqui o código a ser embutido'
            />

            <Image
              tooltip='Adicionar Imagem'
              captions={{
                subtitle: 'Clique para inserir uma legenda',
                author: 'Clique para incluir créditos para a imagem',
              }}
            >
              Arraste e solte ou <span className="linklike">selecione seus arquivos</span>
            </Image>

          </Inserter>

        </RichText>

        <input type="hidden" name="article[title]" value={title || ''} />
        <input type="hidden" name="article[body]" value={body || ''} />
      </div>
    )
  }
}
