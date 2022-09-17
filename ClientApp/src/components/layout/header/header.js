import React, { useContext } from 'react'
import logo from '../../../logo.png'
import styles from "./header.module.css"
import { useNavigate } from 'react-router-dom'
import { LessonsContext } from '../../../context/lessons/LessonsContext'


function Header({ setLessons }) {
  const { currentLesson, currentTask } = useContext(LessonsContext)  
  const navigateTo = useNavigate()

const clickLogo = e => {
  console.log(e, e===1)
  if(e.button===1) {
    e.preventDefault()
    navigateTo('/lessons/UpdateWithExcel')
  }else{
    navigateTo('/')
  }
}

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="logo" onMouseDown={clickLogo}/>
      <div className={styles.info}>
        <div className={styles.infotext}>{currentLesson?.lessonId}</div>
        <b><div className={styles.infotext}>{currentLesson?.title}</div></b>
        <div className={styles.infotext}>{currentTask}</div>
      </div>
    </div>
  )
}

export default Header