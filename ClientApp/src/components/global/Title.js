import React from 'react'
import styles from './title.module.css'
import 'animate.css'

const Title = ({ title }) => {
  return (
    <div className={styles.container}>
      <div className={[ styles.title, 'title animate__animated animate__slideInUp animate__faster'].join(' ')}>
        {title}
      </div>
      
      <div className={styles.cover}></div>
    </div>
  )
}

export default Title