"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard';

function Explore() {
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
    <div>
        <h2 className='font-semibold text-3xl mb-6'>Explore More Courses</h2>
        <div className='flex gap-5 max-w-md'>
        <Input placeholder='Search'/>
        <Button><Search/>Search</Button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5'>
                {
                    courseList?.map((course,index)=>(
                        <CourseCard course={course} key={index}/>
                    ))
                }
            </div>
    </div>
  )
}

export default Explore