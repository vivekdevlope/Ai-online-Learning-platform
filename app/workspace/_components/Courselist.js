"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import course from '../../../public/online-course.webp'
import { Button } from '@/components/ui/button';
import Addnewcourse from './Addnewcourse';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import CourseCard from './CourseCard'

function Courselist() {
    const [courseList,setcourseList] = useState([]);
    const {user} = useUser()
    useEffect(()=>{
        user && GetCourseList()
    },[user])
    const GetCourseList=async()=>{
        const result=await axios.get('/api/courses')
        console.log(result.data)
        setcourseList(result.data)
    }
return (
    <div className='mt-10'>
        <h2 className='font-semibold text-3xl'>Course List</h2>
        {
            courseList?.length == 0 ? 
            <div className='p-7 flex justify-center items-center flex-col border rounded-xl mt-2 bg-secondary'>
                <Image src={course} alt='edu' width={150} height={150}/>
                <h2 className='my-2 text-2xl font-semibold mt-3'>Look like you haven't created any courses yet</h2>
                <Addnewcourse>
                <Button className='font-normal text-2sm mt-5 p-5'>+ Create your first course</Button>
                </Addnewcourse>
            </div>:
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5'>
                {
                    courseList?.map((course,index)=>(
                        <CourseCard course={course} key={index}/>
                    ))
                }
            </div>
        }
    </div>
  )
}

export default Courselist