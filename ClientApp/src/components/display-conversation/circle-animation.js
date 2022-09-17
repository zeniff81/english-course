import React from 'react'
import styles from './circleanimation.module.css'

const CircleAnimation = () => {
  return (
    <div className={styles.circlescontainer}>
      <div className={[styles.circle, styles.circle1].join(' ')}></div>
      <div className={[styles.circle, styles.circle2].join(' ')}></div>
      <div className={[styles.circle3].join(' ')}></div>
    </div>
  )
}

export default CircleAnimation