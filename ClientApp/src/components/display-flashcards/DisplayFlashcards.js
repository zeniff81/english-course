import React from 'react'
import PracticeOrTest from '../tasks/PracticeOrTest'

const DisplayFlashcards = () => {
  return (
    <div>
      <PracticeOrTest
        title="Tarjetas"
        imgPractice="/img/flashcards_img_practice.jpg"
        imgTest="/img/flashcards_img_test.jpg"
        bgColor="white"
        textColor="cornflowerblue"
      />
    </div>
  )
}

export default DisplayFlashcards