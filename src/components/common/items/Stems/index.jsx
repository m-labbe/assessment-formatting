import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Markdown from '../MarkdownBlock'
import styles from './styles.module.css'

class StemText extends Component {
  static propTypes = {
    stemText: PropTypes.string.isRequired,
    itemAnswered: PropTypes.bool.isRequired
  }

  static defaultProps = {
    itemAnswered: false
  }

  componentDidMount() {
    if (!this.props.itemAnswered) {
      this.stemTextEl && this.stemTextEl.focus()
    }
  }

  render() {
    return (
      <div
        role="region"
        aria-label="question"
        className={styles.stemTextWrapper}
      >
        <div
          ref={stemEl => {
            this.stemTextEl = stemEl
          }}
          tabIndex="-1"
          className={styles.textStem}
        >
          <Markdown source={this.props.stemText} language={this.props.language}/>
        </div>
      </div>
    )
  }
}

class StemImage extends Component {
  static propTypes = {
    stemImageStore: PropTypes.object.isRequired,
    itemAnswered: PropTypes.bool.isRequired
  }

  static defaultProps = {
    itemAnswered: false
  }

  constructor(props) {
    super(props)

    this.stemImageStore = props.stemImageStore
    this.state = {
      imageUrl: this.stemImageStore.imageUrl,
      imageLoaded: this.stemImageStore.imageLoaded,
      imageBroken: this.stemImageStore.imageBroken,
      imageHeight: this.stemImageStore.imageHeight,
      imageWidth: this.stemImageStore.imageWidth,
      viewerHeight: this.stemImageStore.viewerHeight
    }
    this.renderImageViewer = this.renderImageViewer.bind(this)
    this.renderContent = this.renderContent.bind(this)
    this.renderLoadingDialog = this.renderLoadingDialog.bind(this)
  }

  componentDidMount() {
    this.stemImageStore.on('change', () => {
      if (!this.stemImageStore.hasImage) {
        return
      }
      this.setState({
        imageUrl: this.stemImageStore.imageUrl,
        imageLoaded: this.stemImageStore.imageLoaded,
        imageBroken: this.stemImageStore.imageBroken,
        imageHeight: this.stemImageStore.imageHeight,
        imageWidth: this.stemImageStore.imageWidth,
        viewerHeight: this.stemImageStore.viewerHeight
      })


    })
  }

  componentWillUnmount() {
    this.stemImageStore.stopListeningAll()
  }

  renderContent() {
    return this.renderLoadingDialog()
  }

  renderLoadingDialog() {
    return (
      <div className={styles.stemImageImageLoading}>
        <p>Image loading</p>
      </div>
    )
  }

  render() {
    const classes =
      !this.state.imageLoaded && !this.state.imageBroken
        ? styles.stemImageContainerImageLoading
        : this.state.imageBroken
        ? styles.stemImageContainerImageBroken
        : ''
    return (
      <div className={classes} id="stem-image-container">
        {this.renderContent()}
      </div>
    )
  }
}

export { StemText, StemImage }
