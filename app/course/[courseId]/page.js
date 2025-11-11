"use client"
import AppHeader from '../../workspace/_components/Appheader'
import React from 'react'
import ChapterListSidebar from '../_components/ChaptersListSidebar'
import ChapterContent from '../_components/ChapterContent'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'

function Course() {
    const { courseId } = useParams();
    const [courseInfo, setCourseInfo] = useState();
    useEffect(() => {
        GetEnrollCourseById();
    }, [])
    const GetEnrollCourseById = async () => {
        const result = await axios.get('/api/enroll-course?courseId=' + courseId);
        console.log(result.data)
        setCourseInfo(result.data);

    }
    return (
        <div>
            <div className='sticky top-0 bg-white'>
                <AppHeader hideSideBar={true} />
            </div>
            
            <div className='flex gap-10'>
                <ChapterListSidebar courseInfo={courseInfo} />
                <ChapterContent courseInfo={courseInfo} refreshData={() => GetEnrollCourseById()} />
            </div>
        </div>
    )
}

export default Course