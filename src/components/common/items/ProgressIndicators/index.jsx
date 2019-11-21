import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { LEARNING_CHECK } from '../../constants/AssessmentModeConstants'
import styles from './styles.module.css'

const AssessmentConfig = {
  mode: 'skill-assessment'
}

const ProgressIndicator = ({ itemCount, itemLimit, itemAnswered }) => {
  const initialWidth =
    AssessmentConfig.mode === LEARNING_CHECK && !itemAnswered
      ? ((itemCount - 1) / itemLimit) * 100
      : (itemCount / itemLimit) * 100

  const [width, setWidth] = useState(initialWidth)

  useEffect(() => {
    if (AssessmentConfig.mode === LEARNING_CHECK) {
      setWidth((itemCount / itemLimit) * 100)
    }
  })

  return (
    <div className={styles.progressIndicatorContainer}>
      <div className={styles.progressIndicatorBar}>
        <div
          className={styles.progressIndicatorBarCompleteness}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

ProgressIndicator.propTypes = {
  itemCount: PropTypes.number.isRequired,
  itemLimit: PropTypes.number.isRequired,
  itemAnswered: PropTypes.bool.isRequired,
}

export { ProgressIndicator }
