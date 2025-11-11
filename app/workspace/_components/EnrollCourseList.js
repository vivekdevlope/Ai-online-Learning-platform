"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EnrollCourseCard from './EnrollCourseCard'

function EnrollCourseList() {
    const [enrollcourselist,setenrollcourselist] = useState([])
    useEffect(()=>{
        GetEnrolledCourse()
    },[])
    const GetEnrolledCourse = async()=>{
        const result =await axios.get('/api/enroll-course')
        console.log(result.data)
        setenrollcourselist(result.data)
    }
  return enrollcourselist?.length>0 && (
    <div className='mt-3'>
        <h2 className='font-semibold text-xl'>Continue Learning your courses</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5'>
        {
            enrollcourselist?.map((course,index)=>(
                <EnrollCourseCard course={course?.courses} enrollcourse={course?.enrollCourse} key={index} />
            ))
        }
        </div>
    </div>
  )
}

export default EnrollCourseList