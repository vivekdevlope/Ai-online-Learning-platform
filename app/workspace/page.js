"use client";
import React from 'react';
import Welcomebanner from './_components/Welcomebanner';
import Courselist from "./_components/Courselist"
import EnrollCourseList from "./_components/EnrollCourseList"

function Workspace() {
  return (
    <div>
      <Welcomebanner/>
      <EnrollCourseList/>
      <Courselist/>
    </div>
    
  );
}

export default Workspace;