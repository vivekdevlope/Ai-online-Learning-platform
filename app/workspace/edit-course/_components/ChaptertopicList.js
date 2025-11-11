import { Gift } from "lucide-react";
import React from "react";

function ChaptertopicList({ course }) {
  const courseLayout = course?.courseJson?.course;

  return (
    <div>
      <h2 className="font-bold text-3xl mt-10 ml-5">Chapters & Topics</h2>
      <div className="flex flex-col items-center justify-center mt-10">
        {courseLayout?.chapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="flex flex-col items-center ">
            <div className="p-4 border shadow rounded-xl bg-primary text-white w-full max-w-md">
              <h2 className="text-center mb-3">Chapter {chapterIndex + 1}</h2>
              <h2 className="font-semibold text-lg text-center">
                {chapter.chapterName}
              </h2>
              <h2 className="text-xs flex justify-between gap-16 mt-3">
                <span>Duration: {chapter.duration}</span>
                <span>Topics: {chapter?.topics?.length}</span>
              </h2>
            </div>

            <div className="">
              {chapter?.topics.map((topic, topicIndex) => (
                <div className="flex flex-col items-center" key={topicIndex}>
                  <div className="h-10 bg-gray-300 w-1"></div>
                  <div className="flex items-center gap-5">
                    <span
                      className={`${
                        topicIndex % 2 !== 0 ? "text-transparent" : ""
                      }`}
                    >
                      <h1 className="text-xl">{topic}</h1>
                    </span>
                    <h2 className="text-center rounded-full bg-gray-300 px-5 py-3">
                      {topicIndex + 1}
                    </h2>
                    <span
                      className={`${
                        topicIndex % 2 === 0 ? "text-transparent" : ""
                      }`}
                    >
                      <h1 className="text-xl">{topic}</h1>
                    </span>
                  </div>

                  {topicIndex === chapter?.topics?.length - 1 && (
                    <div className="flex flex-col items-center">
                      <div className="h-10 bg-gray-300 w-1"></div>
                      <Gift className="text-center rounded-full bg-gray-300 p-3 w-12 h-12" />
                      <div className="h-10 bg-gray-300 w-1"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChaptertopicList;
