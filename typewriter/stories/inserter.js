import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  RichText,
  Inserter,
  Video,
  Embed,
  Image
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

storiesOf('Inserter', module)
  .add('empty', () =>
    <RichText content=''>
      <Inserter />
    </RichText>
  )
  .add('complete', () =>
    <RichText content={multiple}>
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
          presignPath='/'
          fetchPath='/'
          promotePath='/uploads/promote'
          captions={{
            subtitle: 'Clique para inserir uma legenda',
            author: 'Clique para incluir créditos para a imagem',
          }}
          >
            Arraste e solte ou <span className="linklike">selecione seus arquivos</span>
          </Image>
      </Inserter>
    </RichText>
  )
  .add('with empty body', () =>
    <RichText content={null}>
      <Inserter>
        <Video
          tooltip='Adicionar Vídeo'
          placeholder='Cole aqui o link do seu vídeo no Youtube e clique em Enter'
        />
        <Embed
          tooltip='Embutir código'
          placeholder='Cole aqui o código a ser embutido'
        />

      </Inserter>
    </RichText>
  )
