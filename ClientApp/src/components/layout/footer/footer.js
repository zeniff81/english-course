import React, { useState, useCallback, useContext } from 'react'
import styles from './footer.module.css'
import { useNavigate } from 'react-router-dom'
import Button from '../../global/Button'
import { AiFillHome } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LessonsContext } from '../../../context/lessons/LessonsContext'
import useSound from 'use-sound';
import popSoundFx from '../../../resources/audio/ui-fx/pop.mp3';

const Footer = () => {
  const [disabled, setDisabled] = useState({
    home: false,
    tasks: false,
    manage: false
  })
  const [playPop] = useSound(popSoundFx)

  const navigate = useNavigate()


  const { currentLesson } = useContext(LessonsContext)

  const location = useLocation()
  const updateButtonsStatus = useCallback(() => {
    const path = location.pathname
    const homeStatus = path.includes('/home')
    const tasksStatus = path === ('/tasks') || currentLesson === null
    const manageStatus = false

    setDisabled({
      home: homeStatus,
      tasks: tasksStatus,
      manage: manageStatus
    })
  }, [currentLesson, location.pathname])

  useEffect(() => {
    updateButtonsStatus()
  }, [location, updateButtonsStatus])

  const goBack = () => {
    playPop()
    window.history.back()
  }

  const navigateTo = (path) => {
    playPop()
    navigate(path)
  }

  return (
    <div className={styles.container}>
      {!disabled.back &&
        <Button
          className={['global-hover'].join(' ')} caption="atrás"
          style={{
            background: 'red',
            color: 'white',            
          }}
          icon={<BiArrowBack />}          
          onClick={goBack}
        />
      }
      {!disabled.home &&
        <Button className='global-hover' caption="inicio" icon={<AiFillHome />} disabled={disabled.home} onClick={()=> navigateTo('/home')}></Button>
      }
    </div>
  )
}


export default Footer

