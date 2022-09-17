import React from 'react'

const TaskIcon = ({task}) => {
  return (
    <img src={task.image} alt="task icon" />
  )
}

export default TaskIcon