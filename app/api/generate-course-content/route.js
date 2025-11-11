import { NextResponse } from "next/server";
import {
    GoogleGenAI,
  } from '@google/genai';
import axios from "axios";
import { coursesTable } from "config/schema";
import { eq } from "drizzle-orm";
import { db } from 'config/db';


const PROMPT = `Based on the provided Chapter name and its Topics, generate detailed content for each topic in HTML format.
The final output must be a single, valid JSON object only, without any surrounding text or markdown like \`\`\`json.
Follow this exact JSON schema:
{
    "chapterName": "<The name of the chapter>",
    "topics": [
        {
            "topic": "<The name of the topic>",
            "content": "<The generated HTML content for this topic, including h3 tags>"
        }
    ]
}

IMPORTANT: Inside the "content" HTML, you MUST use single quotes for all attributes (e.g., <div class='my-class'>) to avoid breaking the JSON structure. Do NOT use double quotes inside the HTML.

User Input:
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
