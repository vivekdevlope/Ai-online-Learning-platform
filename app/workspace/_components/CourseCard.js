"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Book, LoaderCircle, PlayCircle, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'

function CourseCard({course}) {

  const [loading,setLoading] = useState(false) 
  const onEnrollCourse = async()=>{
    try {
      setLoading(true)
      const result = await axios.post('/api/enroll-course',{
          courseId:course?.cid
      })
          setLoading(false)
          if(result.data.resp){
            toast.warning('Already Enrolled')
            return;
          }else{
            toast.success('Enrolled!')
          }
          
          console.log(result.data)
    } catch (error) {
      toast.error('Server Side error')
      setLoading(false)
    }
  }

  return (
    <div className='shadow rounded-b-xl mt-2'>
      <Image src={course?.bannerImageUrl} alt={course?.Name} width={400} height={300} className='w-full aspect-video rounded-t-xl object-cover'/>
      <div className='p-3 flex flex-col gap-3'>
          <h2 className='font-semibold text-lg'>{course?.courseJson?.course?.Name}</h2>
          <p className='line-clamp-3 text-gray-500 text-sm'>{course?.courseJson?.course?.Description}</p>
          <div className='flex justify-between items-center mt-1'>
            <h2 className='flex items-center text-sm gap-2'><Book className='text-primary h-5 w-5'/>{course?.courseJson?.course?.NoofChapters} Chapters</h2>
            {
              course?.courseContent?.length?<Button className='font-semibold' onClick={onEnrollCourse} disabled={loading} >{loading?<LoaderCircle className='animate-spin'/>:<PlayCircle/>}Enroll Course</Button>:
              <Link href={'/workspace/edit-course/'+course?.cid}><Button className='font-semibold'><Settings/> Generate Course</Button></Link>
            }
          </div>
      </div>
    </div>
  )
}

export default CourseCard