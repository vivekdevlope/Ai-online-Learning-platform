"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Courseinfo from '../_components/Courseinfo'
import ChaptertopicList from '../_components/ChaptertopicList'

function EditCourse({ViewCourse=false}) {
    const {courseId} = useParams()
    const [loading,setLoading] = useState(false);
    const [course,setCourse] =useState()
    console.log(courseId)

    useEffect(()=>{
        GetCourseInfo()
    },[])

    const GetCourseInfo=async()=>{
        setLoading(true)
        const result = await axios.get("/api/courses?courseId="+courseId)
        setCourse(result.data)
        console.log(result.data)
        setLoading(false)
    }
  return (
    <div>
      <Courseinfo course={course} ViewCourse={ViewCourse}/>
      <ChaptertopicList course={course}/>
    </div>
  )
}

export default EditCourse