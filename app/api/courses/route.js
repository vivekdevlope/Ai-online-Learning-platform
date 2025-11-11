import { coursesTable } from "../../../config/schema.js";
import { db } from "../../../config/db.js";
import { NextResponse } from "next/server";
import {eq, ne, sql } from "drizzle-orm";
import { currentUser } from '@clerk/nextjs/server';
import { desc } from 'drizzle-orm';


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams?.get('courseId');
    const user =await currentUser()
    if(courseId==0){
      const result = await db.select().from(coursesTable).where(sql`${coursesTable.courseContent}::jsonb != '{}'::jsonb`);

      
      return NextResponse.json(result[0]);
    }
  
    if(courseId){
      const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.cid, courseId));

      
      return NextResponse.json(result[0]);
    }
    else{
      const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.userEmail, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(coursesTable.id));
      
      
      
      return NextResponse.json(result);
    }
  
    
  }