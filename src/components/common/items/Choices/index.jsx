import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  getAnsweredChoice,
  cleanUpStore,
} from '../../helpers/GeneralHelpers'
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

class Choices extends React.Component {
  static propTypes = {
    itemAnswered: PropTypes.bool.isRequired,
    choices: PropTypes.array.isRequired,
    format: PropTypes.oneOf([MULTIPLE_CHOICE, IMAGE_HOTSPOT]).isRequired,
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
  }

  static defaultProps = {
    itemAnswered: false,
    choiceIndex: RESULT_NONE,
    answerIndex: RESULT_NONE,
    result: RESULT_NONE,
    format: MULTIPLE_CHOICE,
  }

  constructor(props) {
    super(props)
    if (!props.itemAnswered) {

      this.state = {
        choicesDisabled: null,
        choicesDimmed: null,
        secondsLeft: 10,
      }
    }

    this._renderAnsweredChoice = this._renderAnsweredChoice.bind(this)
    this._renderUnansweredChoice = this._renderUnansweredChoice.bind(this)
  }

  componentWillUnmount() {
    if (this.choiceStore) {
      cleanUpStore(this.choiceStore)
    }
  }

  _renderChoices() {
    if (!Array.isArray(this.props.choices)) {
      return
    }
    return this.props.choices.map(
      this.props.itemAnswered
        ? this._renderAnsweredChoice
        : this._renderUnansweredChoice,
    )
  }

  _renderUnansweredChoice(choice, i) {
    return (
      <Choice
        text={choice}
        choiceIndex={i}
        key={i}
        disabled={this.state.choicesDisabled}
        dimmed={this.state.choicesDimmed}
        secondsLeft={this.state.secondsLeft}
      />
    )
  }

  _renderAnsweredChoice(choice, i) {
    const choiceParams = {
      choiceText: choice,
      orderIndex: i,
      choiceIndex: this.props.choiceIndex,
      answerIndex: this.props.answerIndex,
      Key: ChoiceKey,
      Distractor: ChoiceDistractor,
    }

    return getAnsweredChoice(choiceParams)
  }

  render() {
    const choiceCount = this.props.choices.length
    const verticalChoices = this.props.format === MULTIPLE_CHOICE
    const horizontalChoices = this.props.format === IMAGE_HOTSPOT

    const classes = classNames({
      [styles.answeredChoices]: this.props.itemAnswered,
      [styles.unansweredChoices]: !this.props.itemAnswered,
      [styles.choiceList]: verticalChoices,
      [styles.choiceRow]: horizontalChoices,
      [styles.col2]: choiceCount === 2 && horizontalChoices,
      [styles.col3]: choiceCount === 3 && horizontalChoices,
      [styles.col4]: choiceCount === 4 && horizontalChoices,
      [styles.col5]: choiceCount === 5 && horizontalChoices,
    })

    return (
      <div ref="choicesWrapper" className={styles.choicesWrapper}>
        <ul
          ref="choices"
          className={classes}
          aria-label="choices"
          role="region"
        >
          {this._renderChoices()}
        </ul>
      </div>
    )
  }
}

class Choice extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    choiceIndex: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
    dimmed: PropTypes.bool.isRequired,
    secondsLeft: PropTypes.number,
  }

  static defaultProps = {
    disabled: false,
    dimmed: false,
  }

  constructor(props) {
    super(props)
    this.handleKeyDown = () => {}
  }


  render() {
    const classes = classNames(styles.textChoice, {
      [styles.textChoiceDimmed]: this.props.dimmed,
      [styles.textChoiceButton]: !this.props.disabled,
    })

    return (
      <li
        role="button"
        tabIndex="0"
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        className={classes}
      >
        <div
          ref="textChoice"
          onClick={this.handleClick}
          dangerouslySetInnerHTML={{ __html: this.props.text }}
        />
      </li>
    )
  }
}

class ChoiceKey extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    answered: PropTypes.bool.isRequired,
  }

  static defaultProps = { answered: false }

  _renderHelpText() {
    if (this.props.answered) {
      return 'Your choice: correct - '
    }
    return 'Correct - '
  }

  render() {
    const classes = classNames(styles.textChoice, styles.textChoiceKey, {
      [styles.textChoiceKeyAnswered]: this.props.answered,
    })
    return (
      <li ref="choiceKey" className={classes}>
        <p className={styles.invisibleHelpText}>{this._renderHelpText()}</p>
        <div dangerouslySetInnerHTML={{ __html: this.props.text }} />
      </li>
    )
  }
}

class ChoiceDistractor extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    answered: PropTypes.bool.isRequired,
  }

  static defaultProps = { answered: false }

  _renderHelpText() {
    if (this.props.answered) {
      return 'Your choice: incorrect - '
    }
    return 'Incorrect - '
  }

  render() {
    const classes = classNames(styles.textChoice, styles.textChoiceDistractor, {
      [styles.textChoiceDistractorAnswered]: this.props.answered,
    })

    return (
      <li ref="choiceDistractor" className={classes}>
        <p className={styles.invisibleHelpText}>{this._renderHelpText()}</p>
        <div dangerouslySetInnerHTML={{ __html: this.props.text }} />
      </li>
    )
  }
}

export { Choices, ChoiceKey, ChoiceDistractor }
