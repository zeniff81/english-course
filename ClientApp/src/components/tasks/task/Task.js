import React, {useContext} from 'react'
import './task.css'
import TaskIcon from './TaskIcon'
import {useNavigate, useLocation} from 'react-router-dom'
import { LessonsContext } from '../../../context/lessons/LessonsContext'
import useSound from 'use-sound';
import popSoundFx from '../../../resources/audio/ui-fx/pop.mp3';



const Task = ({task}) => {  
  const { title, background, color } = task
  const navigate = useNavigate()
  const location = useLocation()
  const { setCurrentTask } = useContext(LessonsContext)
  const [playPop] = useSound(popSoundFx)

  const clickHandler = () => {
    playPop()
    const pathname = location.pathname.replace("/tasks", "")
    navigate(`${pathname}${task.type}`)
    setCurrentTask(task.type)
  }
  
  return (
    <div className="task global-hover-big" onClick={clickHandler}>
      <div className="task__title" style={{color: background}}>{title}</div>
      <div className="task__icon">
        <TaskIcon task={task}/>
      </div>
      <div className="task__stripe" style={{background}}></div>
    </div>
  )
}

export default Task