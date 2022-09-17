import {
  DELETE_LESSON,
  FETCH_LESSONS,
  SET_CURRENT_LESSON,
  SET_CURRENT_TASK,
  UPDATE_LESSON_TO_INSERT_FLASHCARDS,
  UPDATE_LESSON_TO_INSERT_HEADER,
  UPDATE_LESSON_TO_INSERT_LISTEN
} from './types'

export const LessonsReducer = (state, action) => {
  switch (action.type) {
    case FETCH_LESSONS:
      return {
        ...state,
        lessons: action.payload,
      }
    case SET_CURRENT_LESSON:
      return {
        ...state,
        currentLesson: action.payload,
      }
    case DELETE_LESSON:
      return {
        ...state,
        lessons: state.lessons.filter(lesson => lesson.lessonId !== action.payload),
      }    
    case SET_CURRENT_TASK:
      return {
        ...state,
        currentTask: action.payload,
      }
    case UPDATE_LESSON_TO_INSERT_HEADER:
      const { name, value } = action.payload
      return {
        ...state,
        lessonToInsert: {
          ...state.lessonToInsert,
          title: name === 'title' ? value : state.lessonToInsert.title,
          image: name === 'image' ? value : state.lessonToInsert.image,
          bgColor: name === 'bgColor' ? value : state.lessonToInsert.bgColor,
          textColor: name === 'textColor' ? value : state.lessonToInsert.textColor
        }
      }
    case UPDATE_LESSON_TO_INSERT_FLASHCARDS:
      return {
        ...state,
        lessonToInsert: {
          ...state.lessonToInsert,
          flashcards: [...state.lessonToInsert.flashcards, action.payload]
        }
      }
    case UPDATE_LESSON_TO_INSERT_LISTEN:
      return {
        ...state,
        lessonToInsert: {
          ...state.lessonToInsert,
          listens: [
            ...state.lessonToInsert.listens,
            action.payload
          ]
        }
      }

    default:
      return state
  }
}
