import React, { useContext } from 'react'
import styles from './lessons.module.css'
import Tile from '../tile/Tile'
import { Link, useLocation, Navigate } from 'react-router-dom'
import { LessonsContext } from '../../context/lessons/LessonsContext'
import LoadingSpinner from '../spinner/Spinner'
import Title from '../global/Title'

const Lessons = () => {
  const location = useLocation().pathname;

  const LESSON_CONTEXT = useContext(LessonsContext);
  const { lessons, setCurrentLesson, loading } = LESSON_CONTEXT;


  // returns 
  if(loading) return <LoadingSpinner />
  if (location === '/') return <Navigate to='/home' />
  
  if (lessons?.length === 0) return <h1 style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}>No lessons available</h1>

  return (
    <div className={styles.container}>
      <Title title="lecciones" />
      {lessons?.length && lessons.map(lesson => {
        return (
          <Link
            to={`/lessons/${lesson.lessonId}/tasks/`}
            onClick={() => setCurrentLesson(lesson.lessonId)}
            key={lesson.lessonId}
          >
            <Tile
              id={lesson.lessonId}
              title={lesson.title}
              image={lesson.icon}
              bgColor={lesson.bgColor}
              textColor={lesson.textColor}
            />
          </Link>
        )
      })}
    </div>
  )
}

export default Lessons