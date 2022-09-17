import React, { useEffect, useState, useContext } from 'react'
import styles from './flashcardsPractice.module.css'
import 'animate.css'
import Card from './card'
import CardProgress from './card-progress'
import { TbRotate360 } from 'react-icons/tb'
import { LessonsContext } from '../../context/lessons/LessonsContext'
import Title from '../global/Title'
import { getColorsPair } from '../../utils/randomColor'
import FlashcardsCompleted from './FlashcardsCompleted'



const DisplayFlashcards = () => {
  const [invertedFlipped, setInvertedFlipped] = useState(false)
  const [cards, setCards] = useState([])

  const [right, setRight] = useState([])
  const [wrong, setWrong] = useState([])
  const [unknown, setUnknown] = useState([])

  const { currentLesson, loading } = useContext(LessonsContext)
  console.log('currentLesson', currentLesson)



  // add color and randomize flipdirection
  useEffect(() => {
    if (loading) return

    const flashcards = currentLesson.flashcards

    if (flashcards) {
      const randomizeFlipped = flashcards.map(card => {
        const flipped = Math.random() > 0.5
        const [backgroundColor, textColor] = getColorsPair();
        return {
          ...card,
          flipped: flipped,
          bgColor: backgroundColor,
          textColor: textColor
        }
      })


      setCards(randomizeFlipped)
    }
  }, [currentLesson.flashcards, loading])

  const moveCard = (id, action) => {
    const card = cards.find(card => card.flashcardId === id)
    card.flipped = invertedFlipped ? true : false;
    if (action === 'right') {
      setRight(right.concat(card))
    } else if (action === 'wrong') {
      setWrong(wrong.concat(card))
    } else if (action === 'unknown') {
      console.log(card.translation)
      return
    }
    setCards(cards.filter(card => card.flashcardId !== id))
  }

  const showTranslation = (flashcardId) =>{
    let card = cards.find(card => card.flashcardId === flashcardId);
    console.log(card.translation)
  }

  const restoreProgressDesk = (actionType) => {
    let tempArrCards;
    if (actionType === 'right') {
      tempArrCards = right
      setRight([])
    } else if (actionType === 'wrong') {
      tempArrCards = wrong
      setWrong([])
    } else if (actionType === 'unknown') {
      tempArrCards = unknown
      setUnknown([])
    }


    const newArrCards = [
      ...cards,
      ...tempArrCards
    ]

    setCards(newArrCards)

  }

  const flipAll = () => {
    setInvertedFlipped(!invertedFlipped)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title title="Tarjetas" />
        <div className={styles.actions}>
          <button onClick={flipAll} className={[styles.flipall].join(' ')}><TbRotate360 /></button>
          <CardProgress right={right.length} wrong={wrong.length} unknown={unknown.length} broadcastAction={restoreProgressDesk} />
        </div>
      </div>
      <div className={styles.prompt}>
        <h1>¿Sabes qué hay del otro lado de la tarjeta?</h1>
        <ol>
          <li>1) Piensa la respuesta.</li>
          <li>2) Toca la tarjeta para mirar.</li>
          <li>3) ¿Adivinaste? Cotejo (✓). </li>
          <li>4) ¿Fallaste? Presiona (x). </li>
          <li>5) ¿No sabes? Interrogación (?).</li>
        </ol>
      </div>
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          moveCard={moveCard}
          showTranslation={showTranslation}
          flipNow={invertedFlipped}
        />
      ))}
      {cards.length === 0 && wrong.length === 0 && unknown.length === 0 && <FlashcardsCompleted />}
    </div>
  )
}

export default DisplayFlashcards