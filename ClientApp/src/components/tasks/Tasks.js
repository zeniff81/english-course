import React, { useContext } from 'react'
import styles from './tasks.module.css'
import Task from './task/Task'
import { LessonsContext } from '../../context/lessons/LessonsContext'
import {useNavigate } from 'react-router-dom'

import Title from '../global/Title'

function Tasks() {
	const { currentLesson } = useContext(LessonsContext)		
	const navigate = useNavigate()

	const tasks = [
		{
			id: 0,
			title: 'conversación',
			type: 'conversation',
			background: '#3c521b',
			color: 'white',
      image: '/img/conversation-icon.png'
		},
		{
      id: 1,
			title: 'escuchar',
			type: 'listening',
			background: '	#030b7a',
			color: 'white',
      image: '/img/listening-icon.png'
		},
		{
			id: 2,
			title: 'tarjetas',
			type: 'flashcards',        
			background: '	#cc586c',
			color: 'white',
      image: '/img/flashcard-icon.png'
		},
	]
	
	if (currentLesson === null) {
		return navigate('/home')
	}	

	return (
		<div className={styles.container}>
			<Title title="actividades" />

			{/* tasks tiles */}
			<div className={styles.tasksbody}>
				{tasks && tasks.map(task => (<Task key={task.id} task={task} />))}
			</div>
		</div>
	)
}
export default Tasks

