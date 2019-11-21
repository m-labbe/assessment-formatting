import PropTypes from 'prop-types'
import React from 'react'
import { ItemBody, ItemHeader } from '../common/items/index'
import styles from './styles.module.css'

const Question = ({
  item,
  timerStore,
}) => {
  return (
    <div>
      <div className={styles.skillAssessmentQuestionContainer}>
        <div className={styles.skillAssessmentQuestionWrapper}>
          <ItemHeader
            itemAnswered={false}
            itemCount={item.item_count}
            itemLimit={item.item_limit}
          />
          <ItemBody
            itemAnswered={false}
            stemText={item.stem}
            format={item.format}
            choices={item.choices}
            timerStore={timerStore}
          />
        </div>
      </div>
    </div>
  )
}

Question.propTypes = {
  item: PropTypes.object.isRequired,
  timerStore: PropTypes.object.isRequired,
}

export default Question