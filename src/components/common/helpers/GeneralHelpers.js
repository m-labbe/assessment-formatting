/* eslint-disable func-names */
import React from 'react'
import { STATE_LIVE } from '../constants/AssessmentStateConstants'
import { LEARNING_CHECK, SKILL_ASSESSMENT } from '../constants/AssessmentModeConstants'

const AssessmentConfig = {
  mode: 'skill-assessment',
  assessmentState: 'Live'
}

const genUniqueIdentifier = function() {
  let randomString = ''
  for (let i = 0; i < 20; i++) {
    randomString = `${randomString}${Math.round(Math.random() * 100)}`
  }
  return randomString
}

const deep_clone = function(object) {
  if (!object || typeof (object) !== 'object') {
    return object
  }

  if (object instanceof Date) {
    return new Date(object.getTime())
  }

  if (object instanceof RegExp) {
    let flags = ''
    flags += object.global ? 'g' : ''
    flags += object.ignoreCase ? 'i' : ''
    flags += object.multiline ? 'm' : ''
    flags += object.sticky ? 'y' : ''
    return new RegExp(object.source, flags)
  }

  const newInstance = new object.constructor()

  for (const key in object) {
    newInstance[key] = deep_clone(object[key])
  }

  return newInstance
}

// Store helpers //
const cleanUpStore = function(store) {

  if (store.items && Array.isArray(store.items) && store.items.length > 0) {
    store.items.map((item) => {

      if (item.stopListeningAll) {
        item.stopListeningAll()
      }
    })
  }

  if (store.stopListeningAll) {
    store.stopListeningAll()
  }
}

// Name helpers //
const getProgressText = function(itemCount, itemLimit) {
  if (itemCount !== undefined && itemLimit !== undefined) {
    if (AssessmentConfig.mode === LEARNING_CHECK) {
      return `Question ${itemCount} of ${itemLimit}`
    }

    if (AssessmentConfig.mode === SKILL_ASSESSMENT) {
      const itemsLeft = itemLimit - itemCount
      if (itemsLeft <= 0) { return }

      if (AssessmentConfig.assessmentState == STATE_LIVE && itemsLeft <= 2) {
        return 'Almost there. Just a few questions remaining.'
      }

      const questions = itemsLeft == 1 ? 'question' : 'questions'
      return `Approximately ${itemsLeft} ${questions} remaining`
    }
  }
}

// Choice Helper //
const getAnsweredChoice = function(choiceParams) {
  const orderIndex = choiceParams.orderIndex
  const choiceIndex = choiceParams.choiceIndex
  const answerIndex = choiceParams.answerIndex
  const choiceText = choiceParams.choiceText
  const Key = choiceParams.Key
  const Distractor = choiceParams.Distractor

  const answeredThisChoice = orderIndex === choiceIndex
  const correctChoice = orderIndex === answerIndex

  if (correctChoice && answeredThisChoice) {
    return <Key text={choiceText} key={orderIndex} answered />
  } else if (correctChoice && !answeredThisChoice) {
    return <Key text={choiceText} key={orderIndex} answered={false} />
  } else if (!correctChoice && answeredThisChoice) {
    return <Distractor text={choiceText} key={orderIndex} answered />
  }
  return <Distractor text={choiceText} key={orderIndex} answered={false} />
}


export { deep_clone,
  genUniqueIdentifier,
  cleanUpStore,
  getProgressText,
  getAnsweredChoice }
