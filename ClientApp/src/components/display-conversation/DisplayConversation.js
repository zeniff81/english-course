import React, { useRef, useState, useContext } from 'react'
import styles from './displayconversation.module.css'
import { BiPlay } from 'react-icons/bi'
import { AiOutlinePause } from 'react-icons/ai'
import { MdReplay } from 'react-icons/md'
import { LessonsContext } from '../../context/lessons/LessonsContext'
import CircleAnimation from './circle-animation'
import useSound from 'use-sound';
import popSoundFx from '../../resources/audio/ui-fx/pop.mp3';



const DisplayConversation = () => {
  const { currentLesson } = useContext(LessonsContext)
  const [audioSource] = useState(`/audio/conversation${currentLesson.lessonId}.mp3`)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  const [playPop] = useSound(popSoundFx)


  const clickBiPlay = () => {
    playPop()
    audioRef.current.play()
    setPlaying(true)
  }
  const clickBiStop = () => {
    playPop()
    audioRef.current.pause()
    setPlaying(false)
  }

  const clickMdReplay = () => {
    playPop()
    audioRef.current.pause()
    audioRef.current.currentTime = 0;
    audioRef.current.play()
    setPlaying(true)
  }
  return (
    <div className={styles.container}>      
      <img className={[styles.icon, playing ? styles.animateIcon : ''].join(" ")} src={currentLesson.icon} alt="" />
      <div className={styles.title}>{currentLesson.title}</div>
      <audio
        className={styles.audioplayer}
        controls
        src={audioSource}
        ref={audioRef}
        onEnded={()=> setPlaying(false)}
      />
      <div className={[styles.circleAnimation, playing ? styles.showCircleAnimation : ''].join(" ")}>
        <CircleAnimation />
      </div>
      <div className={styles.controls}>
        <div className={styles.playAndReplayContainer}>
        <BiPlay className={[styles.btn, playing && styles.hidePlayBtn].join(" ")} onClick={clickBiPlay} />
        <AiOutlinePause className={[styles.btn, !playing && styles.hidePlayBtn].join(" ")} onClick={clickBiStop} />
        </div>
        
        <MdReplay className={styles.btn} onClick={clickMdReplay} />
      </div>
    </div>
  )
}

export default DisplayConversation