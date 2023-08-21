"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import StaffAddNew from "../components/staff/addnew";
import { StaffTable } from "../components/staff/table";
import { StaffObj } from "../components/staff/types";


export default function Staff() {

  const [staffRowData, setStaffRowData] = useState<StaffObj[]>([]);
  const [reloadTable, setReloadTable] = useState(false);

  const toggleReloadTable = () =>{
    setReloadTable((prv:boolean)=> !prv)
  }

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const columns = JSON.stringify({ staffid: true })
      const staff_details = await fetch(
        "api/staff",
      );
      const res = await staff_details.json();
      setStaffRowData(res.staff);
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
          Staff
        </h1>
        <StaffAddNew buttonName="Add New" setReloadTable={toggleReloadTable}/>
      </div>
      <div>
        {staffRowData && (
          <StaffTable staffRowData={staffRowData} setReloadTable={toggleReloadTable} />
        )}
      </div>
    </div>
  );
}

