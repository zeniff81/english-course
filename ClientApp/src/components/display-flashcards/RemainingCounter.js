import React from 'react'
import styles from './remainingcounter.module.css'
const RemainingCounter = ({remaining}) => {
  return (
    <div className={styles.counter}>
      <div className={styles.counterCaption}>Quedan</div>
      <div className={styles.counterNumber}>{remaining}</div>
    </div>
  )
}

export default RemainingCounter