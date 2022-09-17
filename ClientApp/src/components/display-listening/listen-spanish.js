import React from 'react'
import styles from './spanishlisten.module.css'

const SpanishListen = ({text}) => {

  return (
    <div className={styles.container} >
      <div className={styles.text}>{text}</div>      
    </div>
  )
}

export default SpanishListen