import React from 'react'
import Welcomebanner from '../_components/Welcomebanner'
import EnrollCourseList from '../_components/EnrollCourseList'

function MyLearning() {
  return (
    <div>
        <Welcomebanner/>
        <h2 className='font-semibold text-3xl mt-5'>My Learning</h2>
        <EnrollCourseList/>
    </div>
  )
}

export default MyLearning