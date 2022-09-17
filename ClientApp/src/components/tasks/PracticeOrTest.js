import React, { useContext } from 'react'
import styles from './practiceortest.module.css'
import Tile from '../tile/Tile'
import { LessonsContext } from '../../context/lessons/LessonsContext'
import { useNavigate, useLocation } from 'react-router-dom'

import Title from '../global/Title'

function PracticeOrTest({ imgPractice, imgTest, title, bgColor, textColor }) {
  const { currentLesson } = useContext(LessonsContext)
  const navigate = useNavigate()
  const location = useLocation()

  if (currentLesson === null) {
    return navigate('/home')
  }

  const handleClick = type => {    
    navigate(`${location.pathname}/${type}`)
  }

  return (
    <div className={styles.container}>
      <Title title={title} />

      {/* tasks tiles */}
      <div className={styles.tiles}>
        <div onClick={() => handleClick('practice')}>
          <Tile title="prática" bgColor={bgColor} textColor={textColor} image={imgPractice} css={{fontSize: '1.5rem'}} />
        </div>
        <div onClick={() => handleClick('test')}>
          <Tile title="ejercicio" bgColor={bgColor} textColor={textColor} image={imgTest}  css={{fontSize: '1.5rem'}}/>
        </div>
      </div>
    </div>
  )
}
export default PracticeOrTest

