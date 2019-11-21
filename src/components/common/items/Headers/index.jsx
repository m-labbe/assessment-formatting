import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ProgressIndicator } from '../ProgressIndicators'
import { getProgressText } from '../../helpers/GeneralHelpers'
import { LEARNING_CHECK } from '../../constants/AssessmentModeConstants'
import styles from './styles.module.css'

class ItemHeader extends Component {
  static propTypes = {
    itemCount: PropTypes.number.isRequired,
    itemLimit: PropTypes.number.isRequired,
    itemAnswered: PropTypes.bool.isRequired,
  }

  render() {
    const { mode, assessmentTitle } = {
      mode: 'skill-assessment',
      assessmentTitle: 'Java'
    }
    return (
      <div className={styles.itemHeaderWrapper}>
        <div className={styles.itemHeaderContent}>
          <p className={styles.itemHeaderTitle}>
            {mode === LEARNING_CHECK ? 'Learning check: ' : 'Skill assessment: '}
            <span className={styles.iitemHeaderAssessmentTitle}>{assessmentTitle}</span>
          </p>
          <p className={styles.itemHeaderProgress}>
            {getProgressText(this.props.itemCount, this.props.itemLimit)}
          </p>
        </div>
        <ProgressIndicator
          itemAnswered={this.props.itemAnswered}
          itemCount={this.props.itemCount}
          itemLimit={this.props.itemLimit}
        />
      </div>
    )
  }
}

export { ItemHeader }
