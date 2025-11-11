
import { coursesTable } from '../../../config/schema.js';
import {db} from '../../../config/db.js'

import { currentUser } from '@clerk/nextjs/server';
import {
    GoogleGenAI,
  } from '@google/genai';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm';

const PROMPT = `
Generate a learning course based on the following details. Include:
- Course Name, Description, Category, Level, includeVideo (boolean), NoofChapters
- Chapters with: chapterName, duration, topics[], imagePrompt

Course Banner Image Prompt:
Create a modern, flat-style 2D digital illustration representing the user's topic. Include UI/UX elements like mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements such as sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational—ideal for visualizing concepts in the user's course.

Return only JSON matching this schema:
{
  "course": {
    "Name": "string",
    "Description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "NoofChapters": "number",
    "imagePromt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": ["string"],
      }
    ],
  }
}
,User Input:
`;


export async function POST(req) {
    const {courseId,...formData} = await req.json();
    const user =await currentUser();
    const { has } = await auth()
    const hasBronzePlan = has({ plan: 'starter' })
        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
        });
        const config = {
            responseMimeType: 'text/plain',
        };
        const model = 'gemini-2.0-flash';
        const contents = [
          {
            role: 'user',
            parts: [
              {
                text: PROMPT+JSON.stringify(formData),
              },
            ],
          },
        ];
        if(!hasBronzePlan){
          const result = await db.select().from(coursesTable).where(eq(coursesTable.userEmail,user?.primaryEmailAddress?.emailAddress))

          if(result?.length>=1){
            return NextResponse.json({'resp':'limit exceed'})
          }
        }
        const response = await ai.models.generateContent({
          model,
          config,
          contents,
        });
        console.log(response.candidates[0].content.parts[0].text)
        const Rawres = response?.candidates[0]?.content?.parts[0]?.text
        const Rawjson = Rawres.replace('```json','').replace('```','');
        const JSONres = JSON.parse(Rawjson);

        // generate image__>
        const Imageprompt = JSONres.course?.imagePromt
        const bannerImageUrl =await GenerateImage(Imageprompt)
        // save to database-->
        const result = await db.insert(coursesTable).values({
          ...formData,
          courseJson:JSONres,
          userEmail:user?.primaryEmailAddress?.emailAddress,
          cid:courseId,
          bannerImageUrl:bannerImageUrl
        });

        return NextResponse.json({courseId:courseId});
      }


      const GenerateImage = async (ImagePrompt) => {
        const BASE_URL = 'https://aigurulab.tech';
      
        try {
          const result = await axios.post(
            `${BASE_URL}/api/generate-image`,
            {
              width: 1024,
              height: 1024,
              input: ImagePrompt,
              model: 'sdxl',
              aspectRatio: '16:9',
            },
            {
              headers: {
                'x-api-key': process.env.AI_GURU_API_KEY,
                'Content-Type': 'application/json',
              },
            }
          );
      
          console.log(result.data.image);
          return result.data.image;
        } catch (error) {
          console.error('Image generation failed:', error.response?.data || error.message);
          return null;
        }
      };