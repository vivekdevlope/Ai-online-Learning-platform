import Image from 'next/image'
import React, { useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button'
import { PlayCircle } from 'lucide-react'
import Link from 'next/link'

function EnrollCourseCard({course,enrollcourse}) {
    const Calprogress = ()=>{
        return ((enrollcourse?.completedChapters?.length ?? 0) / (course?.courseContent?.length ?? 1)) * 100;
    }
    return (
      <div className='shadow rounded-b-xl mt-2'>
        <Image src={course?.bannerImageUrl} alt={course?.Name} width={400} height={300} className='w-full aspect-video rounded-t-xl object-cover'/>
        <div className='p-3 flex flex-col gap-2'>
            <h2 className='font-semibold text-lg'>{course?.courseJson?.course?.Name}</h2>
            <p className='line-clamp-3 text-gray-500 text-sm'>{course?.courseJson?.course?.Description}</p>
            <div className=''>
                <h2 className='flex justify-between mb-1 text-sm text-primary'>Progress <span>{Calprogress()}%</span></h2>
                <Progress value={Calprogress()} />
                <Link href={'/workspace/view-course/'+course?.cid}><Button className='w-full mt-3'><PlayCircle/>Continue Learning</Button></Link>
            </div>
        </div>
      </div>
    )
}

export default EnrollCourseCard