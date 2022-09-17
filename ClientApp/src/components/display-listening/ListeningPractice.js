import React, { useContext, useState, useEffect } from 'react'
import styles from './listeningpractice.module.css'
import GroupSentences from './GroupSentences'
import { LessonsContext } from '../../context/lessons/LessonsContext'
import useSound from 'use-sound';
import computeSoundFx from '../../resources/audio/ui-fx/compute.mp3';


const ListeningPractice = () => {
  const [groups, setGroups] = useState([]);
  const audioPlayerRef = React.createRef(null)
  const { currentLesson } = useContext(LessonsContext)
  const [playCompute] = useSound(computeSoundFx)

  useEffect(() => {
    playCompute()
  }, [playCompute])
  

  useEffect(() => {    
    try {
      const { listens } = currentLesson
      setGroups(listens)
    } catch (err) {
      console.log(err)
    }
  }, [currentLesson])

  const groupedSentences = groups.reduce((acc, curr) => {
    const { sentenceIndex, sentence, translation } = curr
    
    // example: sentenceIndex: "3-4"
    const groupIdx = sentenceIndex.split('-')[0]

    const group = acc.find(g => g.groupIndex === groupIdx)
    if (group) {
      group.sentences.push(sentence)
      group.translations.push(translation)
    } else {
      acc.push({ groupIndex: groupIdx, sentences: [sentence], translations: [translation] })
    }
    return acc
  }, [])
  
  const playSound = ({ groupIndex, sentenceIndex, playSlow }) => {   
    const isPlaySlow = playSlow ? 'slow/' : '';
    const src = `/audio/${isPlaySlow}${currentLesson.lessonId}-${groupIndex}-${sentenceIndex}.mp3`;
    audioPlayerRef.current.src = src;
    audioPlayerRef.current.play()
  }

  return (
    <div className={styles.container}>      
      {<audio
        controls
        ref={audioPlayerRef}
        style={{ display: 'none' }}
      />}
      {groupedSentences.map((listen, index) => {
        return <GroupSentences
          key={index}
          groupIndex={listen.groupIndex}
          sentenceIndex={listen.sentenceIndex}
          sentences={listen.sentences}
          translations={listen.translations}
          playSound={playSound}
          data-groupNumber={index}
        />
      }
      )}

    </div>
  )
}

export default ListeningPractice