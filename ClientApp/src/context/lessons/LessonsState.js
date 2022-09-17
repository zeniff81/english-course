import { useEffect } from 'react'
import { useReducer } from 'react'
import { LessonsContext } from './LessonsContext'
import { LessonsReducer } from './LessonsReducer'
import {
  DELETE_LESSON,
  FETCH_LESSONS,
  SET_CURRENT_LESSON,
  SET_CURRENT_TASK,
  UPDATE_LESSON_TO_INSERT_FLASHCARDS,
  UPDATE_LESSON_TO_INSERT_HEADER,
  UPDATE_LESSON_TO_INSERT_LISTEN
} from './types'

import { randomColor } from '../../utils/randomColor'
import LessonClient from '../../client/LessonsClient'

const initialState = {
  lessons: [],
  currentLesson: [],
  lessonToInsert: {
    title: 'Lesson to Insert',
    image: 'https://icons.iconarchive.com/icons/google/noto-emoji-travel-places/256/42474-national-park-icon.png',
    bgColor: randomColor(),
    textColor: randomColor(),
    flashcards: [],
    listens: []
  },
  currentTask: 'nothing'
}

const LessonsState = ({ children }) => {
  const [state, dispatch] = useReducer(LessonsReducer, initialState)
  const { data, loading, error } = LessonClient.useGetLessons('/api/lessons')

  useEffect(() => {
    // const localData = localStorage.getItem('lessons_initial_state');
    // return localData ? JSON.parse(localData) : initialState;

    if (data) {
      dispatch({
        type: FETCH_LESSONS,
        payload: data,
      })
    }
  }, [data])

  useEffect(() => {
    //  localStorage.setItem('lessons_initial_state', JSON.stringify(state));
  }, [state])


  const setCurrentLesson = id => {
    const findLesson = state.lessons.find(lesson => lesson.lessonId === id)
    const lessonInfo = structuredClone(findLesson)
    dispatch({
      type: SET_CURRENT_LESSON,
      payload: lessonInfo
    })
  }

  const setCurrentTask = task => {
    dispatch({
      type: SET_CURRENT_TASK,
      payload: task
    })
  }

  const deleteLesson = async id => {
    await LessonClient.deleteLesson(`/api/lessons/${id}`)
    dispatch(
      {
        type: DELETE_LESSON,
        payload: id,
      }
    )
  }

  const updateLessonToInsertHeader = lesson => {
    dispatch({
      type: UPDATE_LESSON_TO_INSERT_HEADER,
      payload: lesson
    })
  }

  const updateLessonToInsertFlashcards = flashcards => {
    dispatch({
      type: UPDATE_LESSON_TO_INSERT_FLASHCARDS,
      payload: flashcards
    })
  }

  const updateLessonToInsertListen = listen => {
    dispatch({
      type: UPDATE_LESSON_TO_INSERT_LISTEN,
      payload: listen
    })
  }


  const insertLesson = async () => {

    const arrSentences = [];
    const listens = state.lessonToInsert.listens;

    listens.forEach(group => {
      group.sentences.forEach(sentence => {
        const objSentence = { groupIndex: group.groupIndex, sentence }
        arrSentences.push(objSentence)
      })
    });

    const currentLessonToInsert = {
      ...state.lessonToInsert,
      listens: arrSentences
    }

    await LessonClient.insertLesson({
      url: '/api/lessons',
      body: currentLessonToInsert
    })
  }

  const updateLesson = async(lesson) => {    
    await LessonClient.updateLesson({
      url: `/api/lessons/${lesson.lessonId}`,
      body: lesson
    })
  }
  
  const uploadLessonsXLS = async (file) => {
    console.log(file)
    await LessonClient.updateLessonsXLS({
      url: `/api/lessons/updateXLS`,
      body: file
    })
  }

  return (
    <LessonsContext.Provider value={{
      currentLesson: state.currentLesson,
      currentTask: state.currentTask,
      deleteLesson,
      error,
      insertLesson,
      lessons: state.lessons,
      lessonToInsert: state.lessonToInsert,
      loading,
      setCurrentLesson,
      setCurrentTask,
      state,
      updateLessonToInsertFlashcards,
      updateLessonToInsertHeader,
      updateLessonToInsertListen,
      updateLesson, 
      uploadLessonsXLS
    }}>
      {children}
    </LessonsContext.Provider>
  )

}

export default LessonsState