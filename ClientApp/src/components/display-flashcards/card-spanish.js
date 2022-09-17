import React from 'react'
import { getColorsPair } from '../../utils/randomColor';
import styles from './cardspanish.module.css'

const CardSpanish = ({text, showTranslation}) => {
  const [backgroundColor, textColor] = getColorsPair();

  return (
    <div className={[styles.container, showTranslation ? styles.showTranslation : ""].join(" ")} 
    style={{backgroundColor, color: textColor}
    }>
      <img className={styles.spanishicon} src={'/img/spanish.png'} alt="spanish icon" />
      <div className={[styles.mainText, styles.showTranslation]}>{text}</div>      
      </div>
  )
}

export default CardSpanish