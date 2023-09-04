"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import { useGlobalContext } from "../globalContext/store";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Spinner from "./loading";

type TaskDashBoardObj = {
  taskid?: number;
  location?: string;
  clientname?: string;
  categoryid?: number;
  categoryname?: string;
};

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const tmpUser = session?.user;

  const [taskData, setTaskData] = useState<TaskDashBoardObj[]>([]);
  const [staffid, setStaffid] = useState(tmpUser?.staffid);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const columns = JSON.stringify({ staffid: true });
      const task_details = await fetch(
        "api/task/get_task_as_staffid?staffid=" +
          staffid +
          "&status=Not%20Completed"
      );
      const res = await task_details.json();
      // console.log("res.tasks", res.tasks);
      setTaskData(res.tasks);
    };

    // call the function
    fetchData().catch(console.error);
  }, []);
  const taskClickEvent = (task: TaskDashBoardObj) => {
    router.push(
      "/task/task-submit?taskid=" +
        task.taskid +
        "&clientname=" +
        task.clientname +
        "&location=" +
        task.location +
        "&categoryid=" +
        task.categoryid +
        "&categoryname=" +
        task.categoryname
    );
  };

  if (status === "loading") {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!session) {
    router.push("/"); // Redirect to login page if not authenticated
    return null;
  }
  return (
    <div>
      <Navbar />
      {/* <h1 className="text-2xl m-4 text-indigo-800 font-semibold">Insights at a Glance: Your Project Dashboard</h1> */}
      <h1 className="text-2xl m-4 text-indigo-800 font-semibold">
        Elevate productivity today.
      </h1>

      <div className="flex flex-wrap pt-4">
        <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1 flex-col">
                  <h4 className="text-indigo-900   text-2xl mb-4">
                    Assigned Tasks
                  </h4>
                  <div className="flex flex-col">
                    {!taskData ? (
                      <div className="flex">
                        <svg
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 484.8 484.8"
                          xmlSpace="preserve"
                          width="45px"
                          height="45px"
                          fill="#000000"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0" />

                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />

                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <circle
                              style={{ fill: "#C42014" }}
                              cx="242.4"
                              cy="242.4"
                              r="242.4"
                            />{" "}
                            <path
                              style={{ fill: "#840202" }}
                              d="M0,242.4C0,376,108,484,242.4,484C376,484,484,376,484,242.4"
                            />{" "}
                            <polygon
                              style={{ fill: "#EBFFF6" }}
                              points="268,306.4 216.8,306.4 197.6,66.4 287.2,66.4 "
                            />{" "}
                            <polyline
                              style={{ fill: "#D6EAE0" }}
                              points="288,64.8 268,306.4 218.4,306.4 "
                            />{" "}
                            <rect
                              x="212.603"
                              y="346.124"
                              transform="matrix(-0.707 0.7072 -0.7072 -0.707 680.122 470.4758)"
                              style={{ fill: "#EBFFF6" }}
                              width="59.999"
                              height="59.999"
                            />{" "}
                            <polyline
                              style={{ fill: "#D6EAE0" }}
                              points="242.4,334.4 284.8,376.8 242.4,418.4 "
                            />{" "}
                          </g>
                        </svg>
                        <h1 className="flex items-center justify-center ml-4">No Asssigned Tasks</h1>
                      </div>
                    ) : (
                      taskData?.map((task, index) => (
                        <div
                          key={task.taskid}
                          className=" border-b-2 cursor-pointer border-indigo-700"
                          onClick={() => taskClickEvent(task)}
                        >
                          <h5 className="font-semibold text-xl text-blueGray-700">
                            {index + 1}. {task["clientname"]}
                          </h5>
                          <h5 className="font-semibold text-sm text-blueGray-700">
                            {task["location"]}
                          </h5>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-green-500">
                    <i className="fas fa-chart-bar">
                      {JSON.stringify(taskData?.length)}
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <span className="font-semibold text-xl text-blueGray-700">
                    Ongoing Tasks
                  </span>
                  <h5 className="text-blueGray-400   font-bold text-xs">
                    Ongoing Tasks
                  </h5>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-red-500">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                </div>
              </div>
              <p className="text-sm text-blueGray-400 mt-4">
                <span className="text-emerald-500 mr-2">
                  <i className="fas fa-arrow-up"></i> More...
                </span>
                <span className="whitespace-nowrap"> </span>
              </p>
            </div>
          </div>
        </div>

        <div className=" mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <span className="font-semibold text-xl text-blueGray-700">
                    Incomplete Tasks
                  </span>
                  <h5 className="text-blueGray-400   font-bold text-xs">
                    Incomplete Tasks
                  </h5>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-pink-500">
                    <i className="fas fa-chart-pie"></i>
                  </div>
                </div>
              </div>
              <p className="text-sm text-blueGray-400 mt-4">
                <span className="text-red-500 mr-2">
                  <i className="fas fa-arrow-down"></i> More...
                </span>
                <span className="whitespace-nowrap"> </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <span className="font-semibold text-xl text-blueGray-700">
                    Total Staff
                  </span>
                  <h5 className="text-blueGray-400   font-bold text-xs">
                    Total Staff
                  </h5>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-lightBlue-500">
                    <i className="fas fa-users"></i>
                  </div>
                </div>
              </div>
              <p className="text-sm text-blueGray-400 mt-4">
                <span className="text-red-500 mr-2">
                  <i className="fas fa-arrow-down"></i> More...
                </span>
                <span className="whitespace-nowrap"> </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
