"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import TaskAddNew from "../components/task/addnew";
import { TaskObj, TaskObjExtend } from "../components/task/types";
import { TaskTable } from "../components/task/table";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { WithRole } from "../components/common-comp/withRole";
import Spinner from "../dashboard/loading";

export default function Task() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [taskRowData, setTaskRowData] = useState<TaskObjExtend[]>([]);
  const [reloadTable, setReloadTable] = useState(false);
  const [tablePagination, setTablePaination] = useState(1);

  const toggleReloadTable = () => {
    setReloadTable((prv: boolean) => !prv);
  };

  const nextTablePagination = () => {
    setTablePaination((prv: number) => prv + 1);
  };

  const prvTablePagination = () => {
    if (tablePagination > 0) {
      setTablePaination((prv: number) => prv - 1);
    }
  };

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const columns = JSON.stringify({ staffid: true });
      const task_details = await fetch("api/task");
      const res = await task_details.json();
      setTaskRowData(res.tasks);
      console.log("res", res);
    };

    // call the function
    fetchData().catch(console.error);
  }, [reloadTable]);


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
    <WithRole roles={["admin"]}>
      <div>
        <Navbar />
        <div className="flex items-center justify-center p-4">
          <h1 className="text-4xl     text-indigo-600 mr-auto">Tasks</h1>
          <TaskAddNew buttonName="Add New" setReloadTable={toggleReloadTable} />
        </div>
        <div>
          {taskRowData && (
            <TaskTable
              taskRowData={taskRowData}
              setReloadTable={toggleReloadTable}
            />
          )}
        </div>
        {/* <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
          <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
            <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.1665 4H12.8332"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.1665 4L4.49984 7.33333"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.1665 4.00002L4.49984 0.666687"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p
                className="text-sm ml-3 font-medium leading-none "
                onClick={prvTablePagination}
              >
                Previous
              </p>
            </div>
            <div className="sm:flex hidden">
              <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
                {tablePagination}
              </p>
            </div>
            <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
              <p
                className="text-sm font-medium leading-none mr-3"
                onClick={nextTablePagination}
              >
                Next
              </p>
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.1665 4H12.8332"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.5 7.33333L12.8333 4"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.5 0.666687L12.8333 4.00002"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div> */}
      </div>
    </WithRole>
  );
}
