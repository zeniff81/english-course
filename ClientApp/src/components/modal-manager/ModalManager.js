import React, { useEffect, useState } from 'react'
import styles from './modalmanager.module.css'

const ModalManager = ({ display }) => {
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(display)
  }, [display])

  useEffect(() => {
    if (password === '3000') setVisible(false)
  }, [password])



  const handleChange = e => {
    const text = e.target.value;
    setPassword(text)
  }

  if (visible === false) return null

  return (
    <div className={styles.modalManager}>
      <h3>Insert password</h3>
      <input type="text" value={password} onChange={handleChange} autoFocus />
    </div>
  )
}

export default ModalManager