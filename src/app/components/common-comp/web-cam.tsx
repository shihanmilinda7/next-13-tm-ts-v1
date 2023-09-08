"use client";

import { uploadFiles } from "@/app/utils/uploadthing";
import { useState, useEffect, useRef } from "react";
import { CategoryDetailObj } from "../category/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BsFillCameraFill } from "react-icons/bs";
import { TbCaptureFilled } from "react-icons/tb";
import { FaUpload } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

// type taskPhotoObjTypes = {
//     taskphotoid?: number;
//     photodataurl:string;
// }

const WebcamComponent = ({
  taskDetails,
  taskid,
  pathname,
  taskphotoid,
  photodataurl,
  setReloadPage,
}: {
  taskDetails: CategoryDetailObj;
  taskid: number;
  pathname: string;
  taskphotoid: number;
  photodataurl: string;
  setReloadPage: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [showDelButton, setShowDelButton] = useState(false);
  // const [deletePhoto, setDeletePhoto]= useState(false);

  const router = useRouter();
  // const toggleDeletePhotoState = () =>{
  //     setDeletePhoto((p) => !p)
  // }
  // const [taskPhoto, setTaskPhoto] = useState<taskPhotoObjTypes>();
  const format = "image/jpeg";
  useEffect(() => {
    // console.log("taskDetails------------------------");
    if (photodataurl) {
      // console.log("deletedfffffffffffffff");
      setCapturedImage(photodataurl);
      setShowDelButton(true);
    } else {
      // setCapturedImage("https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg");
    }
  }, [taskphotoid]);

  useEffect(() => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        // console.log("camera off");
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    }
  }, [capturedImage]);

  const cameraOnButtonClick = async () => {
    // const constraints: MediaStreamConstraints = { video: true };
    const constraints: MediaStreamConstraints = {
      video: { facingMode: "environment" },
    };

    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    await startWebcam();
    // if (videoRef.current) {
    //         const stream = videoRef.current.srcObject as MediaStream;
    //         if (stream) {
    //             console.log("camera off",)
    //             const tracks = stream.getTracks();
    //             tracks.forEach(track => track.stop());
    //         }
    //     }
    // return () => {
    //     if (videoRef.current) {
    //         const stream = videoRef.current.srcObject as MediaStream;
    //         if (stream) {
    //             console.log("camera off",)
    //             const tracks = stream.getTracks();
    //             tracks.forEach(track => track.stop());
    //         }
    //     }
    // };
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const capturedDataURL = canvasRef.current.toDataURL("image/png");
        setCapturedImage(capturedDataURL);
        setCameraActive(false);
      }
    }
  };

  const uploadImg = async () => {
    const capturedDataURL = canvasRef.current?.toDataURL(format);
    const tmpCategoryId = taskDetails.categoryid;
    const tmpCategoryDetailId = taskDetails.categorydetailid;

    // console.log("taskDetails", taskDetails,)

    //call for end point
    const response = await fetch(pathname + "/api/task/upload_photos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskid,
        tmpCategoryId,
        tmpCategoryDetailId,
        capturedDataURL,
        taskphotoid,
      }),
    });

    const res = await response.json();
    console.log(res);

    if (res == "SUCCESS") {
      toast.success("Photo uploaded successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setReloadPage();
    } else {
    }
  };

  const deleteImg = async () => {
    const res_del_cat = await fetch(pathname + "/api/task/upload_photos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskphotoid }),
    });
    toast.success("Photo deleted successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setCapturedImage("");
    setReloadPage();
    setShowDelButton(false);
    // setTimeout(() => {
    //      setReloadPage();
    // }, 500);

    // toggleDeletePhotoState();

    // const context = canvasRef?.current?.getContext('2d');
    //     if(context){
    //         context.clearRect(0,0,canvasRef?.current?.width ??0,canvasRef?.current?.height?? 0)
    //     }
  };

  return (
    <div>
      {/* <img src={photodataurl} alt="Captured" /> */}
      <div
        className={
          !cameraActive ? "flex ml-auto w-full" : "flex ml-auto hidden"
        }
      >
        <button
          onClick={cameraOnButtonClick}
          className="rounded-lg py-3 px-8 text-center text-base font-semibold outline-none bg-gray-300 flex justify-center items-center w-full"
        >
          {capturedImage ? (
            <BsFillCameraFill color="black " className="inline-block h-8 w-8" />
          ) : (
            <BsFillCameraFill className="inline-block h-8 w-8" />
          )}
        </button>
      </div>
      <div>
        <div
          className={
            cameraActive ? "flex flex-col ml-auto" : "flex ml-auto hidden"
          }
        >
          <video ref={videoRef} autoPlay playsInline />
          <button
            onClick={captureImage}
            className="mt-3 w-full rounded-lg py-3 px-8 text-center text-base font-semibold text-white bg-gray-300 outline-none flex justify-center items-center w-full"
          >
            <TbCaptureFilled color="black " className="inline-block h-8 w-8" />
          </button>
        </div>
        {capturedImage && !cameraActive && (
          <div className="mt-3 ">
            <img src={capturedImage} alt="Captured" />
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
      <div className="flex">
        {capturedImage && !cameraActive && (
          <div
            className={
              !cameraActive ? "w-full flex ml-auto mr-2" : "flex ml-auto hidden"
            }
          >
            <button
              onClick={uploadImg}
              className="mt-3 w-full rounded-lg py-3 px-8 text-center text-base font-semibold text-white outline-none flex justify-center items-center w-full"
            >
              <FaUpload color="black " className="inline-block h-8 w-8" />
            </button>
          </div>
        )}
        {showDelButton && (
          <div
            className={
              !cameraActive ? "ml-4 w-full flex ml-auto" : "flex ml-auto hidden"
            }
          >
            <button
              onClick={deleteImg}
              className="mt-3 w-full rounded-lg py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              <AiFillDelete color="black " className="inline-block h-8 w-8" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebcamComponent;
