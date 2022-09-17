import React, { useState } from 'react'
import ListenSpanish from './listen-spanish'
import styles from './sentence.module.css'
import {MdSlowMotionVideo} from 'react-icons/md'

const Sentence = ({ groupIndex, sentence, sentenceIndex, playSound, translation }) => {

const [showTranslation, setShowTranslation] = useState(true)

  const theme = () => {
    const arrBackgroundColorsDark = [
      '#9C640C',
      '#1A5276',
      '#117864',
      '#797D7F',
      '#212F3C']
    const arrBackgroundColorsLight = [
      '#F9EBEA',
      '#E8DAEF',
      '#D5F5E3',
      '#F9E79F',
      '#F2F3F4',
      '#D5D8DC']

    const selectRandomItem = (arrColors) => {
      return arrColors[Math.floor(Math.random() * arrColors.length)]
    }

    const DarkOrLightBg = selectRandomItem([
      arrBackgroundColorsDark,
      arrBackgroundColorsLight
    ])
    const bgColor = selectRandomItem(DarkOrLightBg)
    const textColor = DarkOrLightBg === arrBackgroundColorsDark
      ? 'white'
      : 'black'



    return { bgColor, textColor }

  }

  const { bgColor, textColor } = theme()

  const play = () => {
    playSound({
      groupIndex: groupIndex,
      sentenceIndex: sentenceIndex, 
      playSlow: false
    })
  }

  const playSlow = e =>{
    e.stopPropagation()

    playSound({
      groupIndex: groupIndex,
      sentenceIndex: sentenceIndex, 
      playSlow: true
    })


  }
 

  const questionmarkClick = () =>{
    setShowTranslation(false)
    
    setTimeout(() => {
      setShowTranslation(true)      
    }, (10));
  }

  const sentenceMouseDown = (e) =>{
    e.preventDefault();

    if(e.button ===1) {
      e.stopPropagation()
      questionmarkClick()
    }
  }

  return (
    <div
      className={styles.container}
      onClick={play}
      onMouseDown={sentenceMouseDown}
    >
      <div
        className={styles.sentence}
        style={{
          backgroundColor: bgColor,
          color: textColor
        }}
        >
        <div className={styles.metainfo}>
          {/* {`groupIndex: ${groupIndex} | sentenceIndex: ${sentenceIndex}`} */}
        </div>
        <div className={styles.text}>{sentence}</div>
        {showTranslation && <ListenSpanish text={translation} />}
      </div>
        <div className={styles.questionmark} onClick={questionmarkClick}>?</div>
        <div className={styles.playslowicon} onClick={playSlow} style={{color: textColor}}><MdSlowMotionVideo /></div>
    </div>
  )
}

export default Sentence