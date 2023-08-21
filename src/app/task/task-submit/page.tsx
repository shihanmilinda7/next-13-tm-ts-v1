"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { CategoryDetailObj } from "@/app/components/category/types";
import WebcamComponent from "@/app/components/common-comp/web-cam";
import Navbar from "@/app/components/navbar/navbar";
import { UploadButton } from "@uploadthing/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type taskPhotoObjTypes = {
  taskphotoid?: number;
  taskid?: number;
  categoryid?: number;
  categorydetailid?: number;
  photodataurl?: string;
}

export default function Task() {

  //get pathname
  let pathname: string = "";

  try {
    pathname = window.location.href;
    // console.log("pathname1", window.location.href);
  } catch (error) { }

  if (pathname) {
    const r: number = pathname.indexOf("/", 7);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
    // console.log("pathname", pathname);
  }

  const searchParams = useSearchParams();
  const taskid = searchParams.get('taskid');
  const clientname = searchParams.get('clientname');
  const location = searchParams.get('location');
  const categoryid = searchParams.get('categoryid');
  const categoryname = searchParams.get('categoryname');

  let taskidInt: number;
  if (taskid) {
    taskidInt = parseInt(taskid)
  }

  const [fetchedCategoryDetailsData, setFetchedCategoryDetailsData] = useState<CategoryDetailObj[]>([]);
  const [taskPhotos, setTaskPhotos] = useState<taskPhotoObjTypes[]>([]);

  //get category detials as task
  const getCategoryDetails = async () => {
    const fetchData = async () => {
      const all_cat_details = await fetch(
        pathname + "/api/category/get_cat_as_catid?categoryid=" + categoryid,
      );
      const res = await all_cat_details.json();
      setFetchedCategoryDetailsData(res.categoriesData);
      // setStaffid(selRowData?.staffid ?? "");
    };
    // call the function
    fetchData().catch(console.error);
  }

  //get task photo detials as task
  const getTaskPhotoDetails = async () => {
    const fetchData = async () => {
      const taskPhotos = await fetch(
        pathname + "/api/task/upload_photos?taskid=" + taskid,
      );
      const res = await taskPhotos.json();
      console.log(res.taskPhotos);
      setTaskPhotos(res.taskPhotos);
    };
    fetchData().catch(console.error);
  }

  useEffect(() => {
    getCategoryDetails();
    getTaskPhotoDetails();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center p-4">
        <h1 className="text-4xl font-extrabold uppercase text-indigo-600 mr-auto">
          Task Submission
        </h1>
      </div>
      <div className="flex flex-wrap pt-4">
        <div className="ml-5 mr-5 w-full border-b-2 border-t-2 cursor-pointer border-indigo-700">
          {/* <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
            Prev
          </button> */}
          <h5 className="font-semibold text-2xl text-blueGray-700">{clientname} - {location}</h5>
          <h5 className="font-semibold text-cl text-blueGray-700">Category: {categoryname}</h5>
        </div>
      </div>
      <div className="flex flex-wrap pt-4">
        {fetchedCategoryDetailsData.map((task, index) => {
          const taskPhotoObject = taskPhotos.find((p:taskPhotoObjTypes) => p.categorydetailid==task.categorydetailid)
          console.log("taskPhotoObject",taskPhotoObject?.taskphotoid)
        return (
        <div key={task.categorydetailid} className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 className="text-blueGray-400 uppercase font-bold text-xl mb-3">{task.categorydetailname}</h5>

                  <WebcamComponent taskDetails={task} taskid={taskidInt} pathname={pathname} taskphotoid={taskPhotoObject?.taskphotoid ?? 0} photodataurl={taskPhotoObject?.photodataurl ?? ''} />
                </div>
              </div>
            </div>
          </div>
        </div>)
        })}
      </div>
      {/* <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      /> */}
    </div>
  );
}
