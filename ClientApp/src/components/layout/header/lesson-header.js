import React, {useContext} from 'react'
import styles from './lessonheader.module.css'
import { LessonsContext } from '../../context/lessons/LessonsContext'


const LessonHeader = () => {
  const { currentLesson } = useContext(LessonsContext)
  const { bgColor, title, id, textColor } = currentLesson
  return (
    <div className={styles.container} style={{ background: bgColor, color: textColor }}>
				<div className={styles.title}>LESSON {id}</div>
				<div className={styles.subtitle}>{title}</div>
			</div>
  )
}

export default LessonHeader