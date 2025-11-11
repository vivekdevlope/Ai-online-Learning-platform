"use client"
import { Book, Clock, Loader2Icon, PlayCircle, Settings, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'

function Courseinfo({course,ViewCourse}) {
    const courseLayout = course?.courseJson?.course
    const [loading,setLoading] = useState(false);
    const router = useRouter()
    const GenrateCourseContent=async()=>{
        // call api for genrate content
        setLoading(true)
        try{
            const result = await axios.post('/api/generate-course-content',{
                courseJson:courseLayout,
                courseTitle:course?.Name,
                courseId:course?.cid
            })
            console.log(result.data)
            setLoading(false)
            toast.success('Course genrated successful')
            router.replace('/workspace')
            
        }
        catch(e){
            console.log(e)
            setLoading(false)
            toast.error('server side error,Try again')
        }
    }
  return (
    <div className='flex justify-between p-5 rounded-2xl shadow-xl'>
        <div className='flex flex-col gap-3'>
            <h2 className='font-bold text-3xl'>{courseLayout?.Name}</h2>
            <p className='line-clamp-2 text-gray-500'>{courseLayout?.Description}</p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div className='flex gap-5 shadow p-3 rounded-lg items-center'>
                    <Clock className='text-blue-500'/>
                    <section>
                        <h2 className='font-semibold'>
                            Duration
                        </h2>
                        <h2>1 week</h2>
                    </section>
                </div>
                <div className='flex gap-5 shadow p-3 rounded-lg items-center'>
                    <Book className='text-green-500'/>
                    <section>
                        <h2 className='font-semibold'>
                            Chapters
                        </h2>
                        <h2>1 week</h2>
                    </section>
                </div>
                <div className='flex gap-5 shadow p-3 rounded-lg items-center'>
                    <TrendingUp className='text-red-500'/>
                    <section>
                        <h2 className='font-semibold'>
                            Difficulty Level
                        </h2>
                        <h2>{courseLayout?.level}</h2>
                    </section>
                </div>
            </div>
            {
                !ViewCourse? <Button className='w-[50%] mt-3' onClick={GenrateCourseContent} disabled={loading}>{loading?<Loader2Icon className="animate-spin"/>:<Settings/>}Generate Content</Button>:
                <Link href={'/course/'+course?.cid}><Button className='w-[50%] mt-3'><PlayCircle/>Continue Learning</Button></Link>

            }
        </div>
        <Image src={course?.bannerImageUrl} alt='banner-img' width={400} height={400} className='w-[45%] aspect-video h-[240px] object-cover rounded-2xl mt-5 md:mt-0'/>
    </div>
  )
}

export default Courseinfo