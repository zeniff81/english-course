import React from 'react'
import classes from './cardactions.module.css'
import { GrStatusGood } from 'react-icons/gr'
import { IoMdClose } from 'react-icons/io'

const ACTIONS = {
  RIGHT: 'right',
  UNKNOWN: 'unknown',
  WRONG: 'wrong'
}

const CardActions = ({broadcastAction}) => {
  
  const handleClick = (e, selectedAction) => {
    e.stopPropagation()
    
    broadcastAction(selectedAction)
  }  

  return (
    <div
      className={classes.container}      
    >
      <button onClick={e => handleClick(e, ACTIONS.RIGHT)} className={[classes.button, classes.right].join(' ')}><GrStatusGood onClick={null}/></button>
      <button onClick={e => handleClick(e, ACTIONS.UNKNOWN)} className={[classes.button, classes.unknown].join(' ')}>?</button>
      <button onClick={e => handleClick(e, ACTIONS.WRONG)} className={[classes.button, classes.wrong].join(' ')}><IoMdClose onClick={null}/></button>
    </div>
  )
}

export default CardActions