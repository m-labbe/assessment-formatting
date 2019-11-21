import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { StemText } from '../Stems'
import { Choices } from '../Choices'
import {
  RESULT_CORRECT,
  RESULT_INCORRECT,
  RESULT_SKIPPED,
  RESULT_TIMED_OUT,
  RESULT_NONE,
} from '../../constants/ResultConstants'
import {
  MULTIPLE_CHOICE,
  IMAGE_HOTSPOT,
} from '../../constants/FormatConstants'
import styles from './styles.module.css'

const propTypes = {
  stemText: PropTypes.string.isRequired,
  format: PropTypes.oneOf([MULTIPLE_CHOICE, IMAGE_HOTSPOT]).isRequired,
  choices: PropTypes.array.isRequired,
  choiceIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([RESULT_NONE]),
  ]),
  answerIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([RESULT_NONE]),
  ]),
  result: PropTypes.oneOf([
    RESULT_CORRECT,
    RESULT_INCORRECT,
    RESULT_SKIPPED,
    RESULT_TIMED_OUT,
    RESULT_NONE,
  ]),
  timerStore: PropTypes.object,
  itemAnswered: PropTypes.bool.isRequired,
}

const defaultProps = {
  choiceIndex: RESULT_NONE,
  answerIndex: RESULT_NONE,
  result: RESULT_NONE,
  format: MULTIPLE_CHOICE,
}

class ItemBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAnimating: false,
      componentWidth: 0,
    }
  }

  componentDidMount() {
    if (!this.props.itemAnswered) {
      this.wrapperEl.addEventListener(
        this.animationEndEvent,
        this.handleAnimationEnd,
      )
      this.setState({
        isAnimating: true,
        componentWidth: this.componentEl.clientWidth,
      })
    }
  }

  componentWillUnmount() {
    this.animationEndEvent &&
      this.wrapperEl.removeEventListener(
        this.animationEndEvent,
        this.handleAnimationEnd,
      )
  }

  handleAnimationEnd = () => {
    this.setState({ isAnimating: false })
  }

  render() {
    const stemWrapperClass = this.state.hasImage
      ? styles.imageItemStemTextWrapper
      : styles.textItemStemTextWrapper
    let wrapperStyle = {
      width: '100%',
    }

    return (
      <div
        className={styles.itemBodyContainer}
        ref={(component) => {
          this.componentEl = component
        }}
      >
        <div
          className={
            this.state.isAnimating ? styles.itemBodyAnimationWrapper : null
          }
          style={wrapperStyle}
          ref={(wrapper) => {
            this.wrapperEl = wrapper
          }}
        >
          <div className={stemWrapperClass}>
            <StemText
              stemText={this.props.stemText}
              itemAnswered={this.props.itemAnswered}
            />
          </div>
          <Choices
            choices={this.props.choices}
            format={this.props.format}
            choiceIndex={this.props.choiceIndex}
            answerIndex={this.props.answerIndex}
            result={this.props.result}
            timerStore={this.props.timerStore}
            itemAnswered={this.props.itemAnswered}
          />
        </div>
      </div>
    )
  }
}

ItemBody.propTypes = propTypes
ItemBody.defaultProps = defaultProps

export { ItemBody }
