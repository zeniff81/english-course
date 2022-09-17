import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import LessonsClient from '../../client/LessonsClient'
import {ExcelRenderer, OutTable} from 'react-excel-renderer';



const UpdateWithExcel = () => {
  const [file, setFile] = useState(null)
  const [isFilePicked, setIsFilePicket] = useState(false)
  const { updateLessonsXLS } = LessonsClient 

  useEffect(()=>{
    setIsFilePicket(file !== null)
  }, [file])

  const fileChange = e =>{
    setFile(e.target.files[0])    
  }

  const onSubmit = async e  => {
    e.preventDefault()
    let formData = new FormData();
    formData.append('file', file);

    try{
      await updateLessonsXLS(formData)
    }catch (e){
      throw new Error(`UpdateWithExcel --> updateLessonsXLS:  Request failed`); 
    }

    // console.log(ExcelRenderer)

    // ExcelRenderer(file, (err, resp)=>{
    //   if(err){
    //     console.log(err)
    //   }else{
    //     console.table(resp)
    //     console.table(file)
    //   }
    // })

  }

  return (
    <form onSubmit={onSubmit}>
      <input type="file" name="exceldata" id="exceldata" onChange={fileChange}/>
      {isFilePicked && <input type="submit" value="Submit" />}
    </form>
  )
}

export default UpdateWithExcel