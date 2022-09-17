import React from 'react'
import styles from './content.module.css'

const Content = ({children}) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default Content