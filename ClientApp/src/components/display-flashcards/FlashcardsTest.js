import React, { useContext } from 'react'
import styles from './flashcardstest.module.css'
import { LessonsContext } from '../../context/lessons/LessonsContext'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import FlashcardsCompleted from './FlashcardsCompleted'
import RemainingCounter from './RemainingCounter'
import useSound from 'use-sound';
import boingSoundFx from '../../resources/audio/ui-fx/boing.mp3';
import magicSoundFx from '../../resources/audio/ui-fx/magic.mp3';
window.flashcardsTimerIn = null;
window.flashcardsTimerOut = null;

const FlashcardsTest = () => {
  const LESSON_CONTEXT = useContext(LessonsContext)
  const { currentLesson } = LESSON_CONTEXT


  const [cards] = useState(currentLesson.flashcards)
  const [remainingCards, setRemainingCard] = useState(currentLesson.flashcards)
  const [remainingCardsCounter, setRemainingCardsCounter] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [choiceCard, setChoiceCard] = useState()
  const [optionCards, setOptionCards] = useState([])
  const [isGoodChoice, setIsGoodChoice] = useState(false)
  const [correctCard, setCorrectCard] = useState({
    flashcardId: 0,
    text: ''
  })
  const [playBoing] = useSound(boingSoundFx)
  const [playMagic] = useSound(magicSoundFx)

  // generateChoices -------------------------------------------------------
  const generateChoices = useCallback(() => {
    if (remainingCards?.length === 0 || typeof cards === 'undefined') {
      setRemainingCardsCounter(0)
      return
    }
    const newChoiceCards = []
    const tempIdx = []
    let exitWhileCounter = 0

    while (newChoiceCards.length < 3) {
      exitWhileCounter++
      if (exitWhileCounter === 10) return

      const randomIdx = Math.floor(Math.random() * cards.length)
      const newCard = cards[randomIdx]

      // if exists, skip      
      if (tempIdx.includes(newCard.flashcardId))
        continue

      newChoiceCards.push({
        ...newCard,
        flipped: false
      })
      tempIdx.push(newCard.flashcardId)

      setRemainingCardsCounter(remainingCards.length)
    }


    // set correct card 
    const correctCardIdx = Math.floor(Math.random() * remainingCards.length)
    const newCorrectCard = remainingCards[correctCardIdx]

    // if newCorrectCard already exists
    const newCorrectCardExists = newChoiceCards.find(c => c.flashcardId === newCorrectCard.flashcardId);
    console.log('newCorrectCardExists', newCorrectCardExists)

    if (!newCorrectCardExists) {
      const insertReplaceCardIdx = Math.floor(Math.random() * newChoiceCards.length)
      newChoiceCards[insertReplaceCardIdx] = newCorrectCard
    }

    setOptionCards(newChoiceCards)
    setCorrectCard(newCorrectCard)
  }, [cards, remainingCards])

  // useEffect: assign card1, card2, card3, card4 --------------------------
  useEffect(() => {
    generateChoices()
  }, [generateChoices])


  // checkIfCorrect -------------------------------------------------------
  const checkIfCorrect = (senderCard) => {
    setChoiceCard(senderCard)

    // flip clicked card
    const tempChoiceCards = []
    optionCards.forEach(card => {
      if (card.flashcardId === senderCard.flashcardId) {
        const currentFlipped = card.flipped
        tempChoiceCards.push({
          ...card,
          flipped: !currentFlipped
        })
      } else {
        tempChoiceCards.push(card)
      }
    })
    setOptionCards(tempChoiceCards)

    // if choice is correct...
    clearTimeout(window.flashcardTimerIn)
    clearTimeout(window.flashcardTimerOut)
    setShowFeedback(false)

    window.flashcardTimerIn = setTimeout(() => {
      setShowFeedback(true)

      if (senderCard.flashcardId === correctCard.flashcardId) {
        setIsGoodChoice(true)
        playMagic()
      } else {
        setIsGoodChoice(false)
        playBoing()

        window.flashcardTimerOut = setTimeout(() => {
          setShowFeedback(false)
        }, 4000);
      }
    }, 1000);

  }

  const clickNext = () => {
    if (choiceCard.flashcardId === correctCard.flashcardId) {
      setRemainingCard(prev => {
        const newRemainingCards = remainingCards.filter(rc => rc.flashcardId !== choiceCard.flashcardId)
        return newRemainingCards
      })
      generateChoices()
    }
    setShowFeedback(false)
    setIsGoodChoice(false)
  }

  return (
    <div className={styles.container}>
      {/* title h3 */}
      <h3>Elije la tarjeta correcta</h3>
      {optionCards?.length && <div className={styles.optionsContainer}>
        {/* option correct */}
        <div className={styles.card + " " + styles.correctcard}>{correctCard?.text}</div>
        {/* option 1 */}
        <div className={[styles.card, optionCards[0].flipped ? styles.cardFlipped : null].join(" ")}
          onClick={() => checkIfCorrect(optionCards[0])} >
          <div className={styles.cardText}>{optionCards[0].text}</div>
          <img className={optionCards[0].flipped ? styles.cardImg : ''} src={optionCards[0]?.image} alt="choiceCards0" />
        </div>
        {/* option 2 */}
        <div className={[styles.card, optionCards[1].flipped ? styles.cardFlipped : null].join(" ")}
          onClick={() => checkIfCorrect(optionCards[1])}>
          <div className={styles.cardText}>{optionCards[1].text}</div>
          <img className={optionCards[1].flipped ? styles.cardImg : ''} src={optionCards[1]?.image} alt="choiceCards1" />
        </div>
        {/* option 3 */}
        <div className={[styles.card, optionCards[2].flipped ? styles.cardFlipped : null].join(" ")}
          onClick={() => checkIfCorrect(optionCards[2])}>
          <div className={styles.cardText}>{optionCards[2].text}</div>
          <img className={optionCards[2].flipped ? styles.cardImg : ''} src={optionCards[2]?.image} alt="choiceCards2" />
        </div>
        {/* feedback */}
        <div className={[styles.feedback, showFeedback ? styles.showFeedback : ''].join(" ")}>
          <img src={`/img/${isGoodChoice ? 'good.png' : 'bad.png'}`} alt="" />
        </div>
      </div>}

      <button className={[styles.nextBtn, isGoodChoice ? styles.showNextBtn : ''].join(" ")} onClick={clickNext} disabled={!showFeedback}>Siguiente</button>
      <RemainingCounter remaining={remainingCardsCounter} />
      <FlashcardsCompleted showCompleted={remainingCardsCounter === 0} />
    </div>
  )

}

export default FlashcardsTest