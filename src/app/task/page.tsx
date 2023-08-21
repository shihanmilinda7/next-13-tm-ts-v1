"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import TaskAddNew from "../components/task/addnew";
import { TaskObj, TaskObjExtend } from "../components/task/types";
import { TaskTable } from "../components/task/table";


export default function Task() {

  const [taskRowData, setTaskRowData] = useState<TaskObjExtend[]>([]);
  const [reloadTable, setReloadTable] = useState(false);

  const toggleReloadTable = () =>{
    setReloadTable((prv:boolean)=> !prv)
  }
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const columns = JSON.stringify({ staffid: true })
      const task_details = await fetch(
        "api/task",
      );
      const res = await task_details.json();
      setTaskRowData(res.tasks);
      console.log("res",res,)
    };

    // call the function
    fetchData().catch(console.error);
  }, [reloadTable]);
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center p-4">
        <h1 className="text-4xl font-extrabold uppercase text-indigo-600 mr-auto">
          Tasks
        </h1>
        <TaskAddNew buttonName="Add New" setReloadTable={toggleReloadTable} />
      </div>
      <div>
        {taskRowData && (
          <TaskTable taskRowData={taskRowData} setReloadTable={toggleReloadTable}/>
        )}
      </div>
    </div>
  );
}
