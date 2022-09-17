import { useState, useEffect } from 'react'
import axios from 'axios'

const REACT_APP_HOST = process.env.REACT_APP_HOST;

const useGetLessons = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${REACT_APP_HOST}${url}`)
        setData(response.data)
        setLoading(false)
      } catch (error) {        
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { data, loading, error }
}

const refreshLessons = async () => {
  let response;
  try {
    response = await axios.get(`${REACT_APP_HOST}/api/lessons`)
    return response.data
  } catch (error) {
    response = error
    return error
  }
}

const insertLesson = async ({ url,  body }) => {
  let result; 
  console.log('insertlesson', body)

  try {
    const response = await axios.post(`${REACT_APP_HOST}${url}`, body)
    result = response.data
  } catch (error) {
    result = error
  }finally{
    return result
  }
}

const deleteLesson = async (url) => {
  let result; 

  try {
    const response = await axios.delete(`${REACT_APP_HOST}${url}`)
    result = response.data
  } catch (error) {
    result = error
  }finally{
    return result
  }
}

const updateLesson = async ({ url, body }) => {
  console.log('lesson to update::: ', body)
  let result; 

  try {
    const response = await axios.put(`${REACT_APP_HOST}${url}`, body)
    result = response.data
  } catch (error) {
    result = error
  }finally{
    return result
  }
}

const   updateLessonsXLS = async (file) =>{
  let result;

  try {
    const response = await axios.post(`${REACT_APP_HOST}/api/lessons/populate`, file)
    result = response.data
  } catch (error) {
    result = error
  }finally{
    return result
  }
}

const LessonsClient = {
  useGetLessons, 
  refreshLessons,
  deleteLesson,
  updateLesson,
  insertLesson,
  updateLessonsXLS
}

export default LessonsClient
