import React, { Component } from 'react'
import ImageCaption from './image-caption'

export default class Image extends Component {
  state = {
    src: false,
    srcset: null,
  }

  getData = (_) => this.props.node.data.get(_)

  componentWillMount() {
    if (!this.isValid()) {
      return this.implode()
    }

    if (this.shouldFetchImage()) {
      this.fetchAndRenderImage()
    } else {
      this.uploadAndPreviewImage()
    }
  }

  implode = () => {
    const { node, state, editor } = this.props

    const change = state.change()
      .removeNodeByKey(node.key)

    editor.onChange(change)
  }

  shouldFetchImage = () => {
    return !!this.getData('id')
  }

  fetchAndRenderImage = () => {
    let { uploadTo } = this.props
    const id = this.getData('id')

    if (/\/$/.test(uploadTo)) {
      uploadTo = fetchPath.slice(0, -1)
    }

    fetch(`${uploadTo}/${id}`)
    .then(r => r.json())
    .then(response => {
      const { src, srcset } = response
      this.setState({src, srcset})
    })
  }

  uploadAndPreviewImage = () => {
    const file = this.getData('file')
    this.preview(file)
    this.upload(file)
  }

  isValid = () => {
    return this.hasValidFile() || this.getData('id')
  }

  hasValidFile = () => {
    const file = this.getData('file')
    return file && !this.isEmpty(file)
  }

  isEmpty = (object) => {
    return object.constructor === Object && Object.keys(object).length === 0
  }

  upload = (file) => {
    const { presignFrom, uploadTo } = this.props

    if (!presignFrom) return

    fetch(presignFrom, {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
      }
    })
    .then(r => r.json())
    .then((presign) => {
      let formData = new FormData()

      Object.keys(presign.fields).forEach(key => {
        formData.append(key, presign.fields[key])
      })

      formData.append('file', file)

      const fileName = presign.fields.key.replace(/cache\//, '')

      return fetch(presign.url, {
        method: 'post',
        body: formData
      })
      .then(r => presign.fields.key.replace(/cache\//, ''))
      .catch((error) => {
        console.error('aws upload', error)
      })
    })
    .then((fileName) => fetch(uploadTo, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: JSON.stringify({
            "id": fileName,
            "storage": "cache",
            "metadata": {}
          })
        })
      }))
    .then(r => r.json())
    .then(imageUpload => this.setImageUpload(imageUpload.id))
    .catch((error) => {
      console.error('rails upload', error)
    })
  }

  setImageUpload = (id) => {
    const { node, state, editor } = this.props

    this.isUploading = false
    const change = state.change()
      .setNodeByKey(node.key, {
        data: {
          id,
          file: {}
        }
      })

    editor.onChange(change)
  }

  isSelected = () => {
    const { node, state } = this.props
    return state.selection.hasEdgeIn(node)
  }

  preview = (file) => {
    this.isUploading = true
    let reader = new FileReader()

    reader.onloadend = () => {
      this.setState({
        src: reader.result
      })
    }

    reader.readAsDataURL(file)
  }

  updateNodeData = (values) => {
    const { node, state, editor } = this.props
    const nextData = node.data.merge(values)
    const change = state.change()
      .setNodeByKey(node.key, { data: nextData })

    editor.onChange(change)
  }

  onCaptionChange = (caption, event) => {
    const { value } = event.target

    this.updateNodeData({[caption]: value})
  }

  selectedVariant = () => {
    return this.isSelected() ? '-selected' : ''
  }

  render() {
    if (!this.state.src) return null

    return (
      <figure {...this.props.attributes} className={`article-image ${this.selectedVariant()}`}>
        <div className="container">
          <div className="image" style={{opacity: this.isUploading ? 0.6 : 1}}>
            <img src={this.state.src} srcSet={this.state.srcset} />
          </div>

          <figcaption className="info">
            {
              Object.keys(this.props.captions).map(caption => (
                <ImageCaption
                  key={caption}
                  className={caption}
                  isSelected={this.isSelected()}
                  value={this.getData(caption)}
                  onChange={e => this.onCaptionChange(caption, e)}
                  placeholder={this.props.captions[caption]}
                />
              ))
            }
          </figcaption>
        </div>
      </figure>
    )
  }
}
