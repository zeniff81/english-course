import React, { useContext, useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { LessonsContext } from '../../context/lessons/LessonsContext';
import FlashcardsCompleted from '../display-flashcards/FlashcardsCompleted';
import RemainingCounter from '../display-flashcards/RemainingCounter';
import styles from './listeningtest.module.css';
import useSound from 'use-sound';
import boingSoundFx from '../../resources/audio/ui-fx/boing.mp3';
import magicSoundFx from '../../resources/audio/ui-fx/magic.mp3';
window.flashcardsTimerIn = null;
window.flashcardsTimerOut = null;

const ListeningTest = () => {
  const LESSON_CONTEXT = useContext(LessonsContext)
  const { currentLesson } = LESSON_CONTEXT
  const listens = [...currentLesson.listens.map((listen, index) => {
    return {
      id: index,
      selected: false,
      audioPath: `/audio/${currentLesson.lessonId}-${listen.sentenceIndex}.mp3`,
      ...listen
    }
  })
  ]
  const [remainingListens, setRemainingListens] = useState(listens);
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(null)
  const [audioAux, setAudioAux] = useState('');
  const [audioCorrect, setAudioCorrect] = useState('');
  const [disableButtons, setDisableButtons] = useState(false)
  const [remainingCounter, setRemainingCounter] = useState(0)
  const audioAuxRef = useRef()
  const audioCorrectRef = useRef()

  const [playBoing] = useSound(boingSoundFx)
  const [playMagic] = useSound(magicSoundFx)
  

  const generateOptions = ()=>{
    let newOptions = [];
    let tempListens = listens;

    // generate options
    for (let i = 0; i < 3; i++) {
      const idx = Math.floor(Math.random() * listens.length);
      const tempOption = {...listens[idx], correctOption: false, hideCorrectWrong: true}
      newOptions.push(tempOption)
      tempListens = tempListens.filter(item=> tempOption.listenId !== item.listenId)
    }
    setOptions(newOptions)

    // generate correct option
    const correctIdx = Math.floor(Math.random() * remainingListens.length);
    const newCorrectOption = {...remainingListens[correctIdx], correctOption: true, hideCorrectWrong: true}
    setCorrectOption(newCorrectOption);

    const findCorrectOption = newOptions.find(option => option.listenId === newCorrectOption.listenId)
    if(typeof findCorrectOption === 'undefined'){
       const insertCorrectOptionIdx = Math.floor(Math.random() * newOptions.length)
       newOptions[insertCorrectOptionIdx] = newCorrectOption
    }else{
      console.log('It hapenned here!')
      findCorrectOption.correctOption = true
    }
    setOptions(newOptions)


    setAudioCorrect(newCorrectOption.audioPath)    
    setAudioAux('')
    setRemainingCounter(remainingListens.length)
  }

  const displayFeedback = (isCorrectChoice) =>{
    
    clearTimeout(window.flashcardTimerIn)
    clearTimeout(window.flashcardTimerOut)

    window.flashcardTimerIn = setTimeout(() => {

      if (isCorrectChoice) {
        playMagic()
      } else {
        playBoing()

        window.flashcardTimerOut = setTimeout(() => {
        }, 4000);
      }
    }, 1000);
  }

  const checkIfCorrect = (selectedOption) =>{
    if(selectedOption.listenId === correctOption.listenId){
      const newRemainingListens = remainingListens.filter(listen => listen.listenId !== selectedOption.listenId)
      setRemainingListens(newRemainingListens)
      displayFeedback(true)
    }else{
      displayFeedback(false)
    }
  }

  const choiceClick = (sender) => {    
    const senderId = sender.listenId
    
    // play audio
    audioAuxRef.current.pause()
    setAudioAux(sender.audioPath)
    const newRemainingListens = remainingListens.map(item => {
      return {
        ...item,
        selected: senderId === item.id
      }
    })
    setRemainingListens(newRemainingListens)

    // show if correct or wrong\
    const newOptions = []
    options.forEach(option=> {
      if(option.listenId === sender.listenId){
        newOptions.push({
          ...option, 
          hideCorrectWrong: false
        })
      }else{
        newOptions.push(option)
      }
    })
    setOptions(newOptions)
    
    //check if correct
    checkIfCorrect(sender)
  }

  const playCorrectOption = (isCorrect) =>{    
    const audioRef = isCorrect ? audioCorrectRef : audioAuxRef
    return new Promise(res=>{
      audioRef.current.play()
      audioRef.current.onended = res;
    })
  }

  useEffect(() => {
    generateOptions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  
  useEffect(() => {
    const play = async() =>{      
      const notNecessarilyCorrect = false
      setDisableButtons(true)
      await playCorrectOption(notNecessarilyCorrect)
      setDisableButtons(false)
    }

    play();
  }, [audioAux])
  
  useEffect(() => {
    const play = async() =>{
      const isCorrect = true
      setDisableButtons(true)
      await playCorrectOption(isCorrect)
      setDisableButtons(false)
    }

    play();
  }, [audioCorrect])
  

  return (
    <div className={styles.container}>

        {/* options */}
        <div className={styles.options} >
          {options && options.map((listen, index) => (
            <div key={index}
              className={[styles.item, listen.selected && styles.itemSelected, listen.correctOption ? styles.correctOption : styles.wrongOption, listen.hideCorrectWrong ?  styles.hideCorrectWrong : null, disableButtons && styles.disableButton].join(" ")}
              onClick={() => choiceClick(listen)}
            >
              {listen.sentence}
            </div>
          ))}
        </div>

        {/* feedback */}
        <div className={styles.feedback}>
          <RemainingCounter remaining={remainingCounter} />
          <button onClick={generateOptions} className={[styles.netxBtn, disableButtons && styles.disableButton].join(" ")}>Siguiente</button>
          <img src={'/img/sound.png'} alt="sound player" className={styles.soundimg} onClick={playCorrectOption}/>
          <audio className={styles.audio} controls src={audioCorrect} ref={audioCorrectRef}/>
          <audio className={styles.audioAux} controls src={audioAux} ref={audioAuxRef}/>
        </div>
      {remainingListens.length === 0 && <FlashcardsCompleted />}
    </div>
  );
};

export default ListeningTest;
