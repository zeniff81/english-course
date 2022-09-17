import React, { useState, useEffect } from 'react'
import CardActions from './card-actions'
import CardSpanish from './card-spanish'
import classes from './card.module.css'
var timerCard;

const Card = ({ card, flipNow, moveCard }) => {
  const [animateMoveCard, setAnimateMoveCard] = useState(false)
  const { flashcardId, image, text } = card
  const [flipped, setFlipped] = useState(Math.random() > 0.5);
  const [showTranslation, setShowTranslation] = useState(false)

  useEffect(() => {
    setFlipped(!flipped)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flipNow])


  const broadcastCardAction = action => {
    console.log('action', action)
    if(action === 'unknown'){
      setShowTranslation(!showTranslation)
      clearTimeout(timerCard);
      timerCard = setTimeout(() => {
        setShowTranslation(false)        
      }, 3000);
      return
    }
    setAnimateMoveCard(true)

    setTimeout(() => {
      moveCard(flashcardId, action)
      setAnimateMoveCard(false)
    }, 500);
  }

  const clickFlip = () => {
    setFlipped(!flipped)
  }

  return (
    <div
      className={[classes.card, 'animate__animated animate__faster', animateMoveCard ? 'animate__zoomOut' : ''].join(' ')}
      onClick={clickFlip}
    >
      <div className={classes.cardFront}>
        <div className={classes.text} style={{
          background: card.bgColor,
          color: card.textColor
        }}>{text}</div>
        <div className={[classes.image, 'animate__animated animate__faster', flipped ? ' animate__slideOutRight ' : 'animate__slideInRight'].join(' ')}>{<img src={image} alt="visual aid" />}</div>
      </div>
      <CardSpanish  showTranslation={showTranslation} text={card.translation}/>
      <CardActions broadcastAction={broadcastCardAction} />
    </div>)
}

export default Card