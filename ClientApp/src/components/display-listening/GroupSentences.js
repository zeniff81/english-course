import React from 'react'
import Sentence from './Sentence'
import styles from './groupsentences.module.css'

const GroupSentences = ({ groupIndex, translations, sentences, playSound }) => {

  if(!sentences) return <h3>Loading...</h3>
  console.log(sentences)

  return (
    <div className={styles.container} data-groupnumber={groupIndex}>
      {sentences.map((sentence, sentenceIndex) => {
        return (
          <Sentence
            key={sentenceIndex}
            sentence={sentence}
            sentenceIndex={sentenceIndex}
            groupIndex={groupIndex}
            playSound={playSound} 
            translation={translations[sentenceIndex]}
          />
        )
      })}
    </div>
  )
}

export default GroupSentences