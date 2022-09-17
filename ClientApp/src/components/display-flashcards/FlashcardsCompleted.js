import React from 'react'
import styles from './flashcardcompleted.module.css'

const FlashcardsCompleted = ({showCompleted}) => {
  return (
    <div className={styles.container} style={{ display: showCompleted ? 'flex' : 'none' }}>
        <div className={styles.card}>
          <img
          className={styles.icon}
            src={
              '/img/success.jpg'
            }
            alt=""
          />
          <div className={styles.text1}>¡BIEN HECHO!</div>
          <div className={styles.text2}>
            <p>Sigue adelante</p>
            <p>La práctica hace al maestro</p>
          </div>
        </div>
      </div>
  )
}

export default FlashcardsCompleted

