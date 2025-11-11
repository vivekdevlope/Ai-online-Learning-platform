import { NextResponse } from "next/server";
import {
    GoogleGenAI,
  } from '@google/genai';
import axios from "axios";
import { coursesTable } from "config/schema";
import { eq } from "drizzle-orm";
import { db } from 'config/db';


const PROMPT = `
Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format.
Schema:{
chapterName:<>,
{
topic:<>,
content:<>
}
}
:User Input:
`;

export async function POST(req) {
    const {courseJson,courseTitle,courseId} = await req.json()

    const promises = courseJson?.chapters?.map(async(chapter)=>{
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
                text: PROMPT+JSON.stringify(chapter),
              },
            ],
          },
        ];
      
        const response = await ai.models.generateContent({
          model,
          contents,
        });
        // console.log(response.candidates[0].content.parts[0].text)
        const Rawres = response?.candidates[0]?.content?.parts[0]?.text
        // console.log(Rawres)
        const Rawjson = Rawres.replace('```json','').replace('```','');
        const JSONres = JSON.parse(Rawjson);

        const youtubeData = await GetYoutubeVideo(chapter?.chapterName)
        return {
            youtubeVideo:youtubeData,
            courseData:JSONres
        }
    })
    const courseContent = await Promise.all(promises)

    // save database-->
    const dbResp = await db.update(coursesTable).set({
      courseContent:courseContent
    }).where(eq(coursesTable.cid,courseId))
    return NextResponse.json({
        courseName:courseTitle,
        courseContent:courseContent
    })
}
const YOUTUBE_BASE_URL='https://www.googleapis.com/youtube/v3/search'
const GetYoutubeVideo = async (topic) => {
  const params = {
    part: 'snippet',
    q: topic,
    maxResults: 3,
    type: 'video',
    key: process.env.YOUTUBE_API_KEY,
  };

  try {
    const res = await axios.get(YOUTUBE_BASE_URL, { params });
    const youtubeVideoList = res.data.items.map((item) => ({
      videoId: item.id?.videoId,
      title: item.snippet?.title,
    }));

    return youtubeVideoList;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error.message);
    return [];
  }
};
