"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import StaffAddNew from "../components/staff/addnew";
import { StaffTable } from "../components/staff/table";
import { StaffObj } from "../components/staff/types";
import Toast from "../components/common-comp/toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { WithRole } from "../components/common-comp/withRole";
import Spinner from "../dashboard/loading";
import DateRangePickerComponent from "../components/common-comp/date-range-picker";
import SelectBoxInputField from "../components/common-comp/input-fields/select-input-field";
import { toast } from "react-toastify";
import DateInputField from "../components/common-comp/input-fields/date-input-fields";
import Pagination from "../components/common-comp/pagination";

export default function TaskReport() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [completedTasksObject, setCompletedTasksObject] = useState<any[]>([]);
  const [staffid, setStaffid] = useState("");
  // const [selectedStartDate, setSelectedStartDate] = useState("2023-09-01");
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date().toJSON().slice(0, 10)
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    new Date().toJSON().slice(0, 10)
  );
  const [staffOptionValues, setStaffOptionValues] = useState<
    { value?: number | string; name?: string }[]
  >([
    {
      value: "no",
      name: "No Data",
    },
  ]);
  const [tablePagination, setTablePagination] = useState(1);
  const [totalTaskCount, setTotalTaskCount] = useState(1);

  const nextTabel = () => {
    if (Math.ceil(totalTaskCount / 10) > tablePagination) {
      setTablePagination((prv: number) => prv + 1);
    }
  };

  const prvTabel = () => {
    if (tablePagination > 1) {
      setTablePagination((prv: number) => prv - 1);
    }
  };
  //get staff details
  const getStaffValues = () => {
    const fetchData = async () => {
      const columns = JSON.stringify({ staffid: true, staffname: true });
      const staff_details = await fetch("api/staff?=columns" + columns);
      const res = await staff_details.json();
      const staffData: any[] = res.staff;

      //create option array
      const optionArray: { value?: number | string; name?: string }[] =
        staffData.map((s) => {
          return { value: s.staffid, name: s.staffname };
        });
      optionArray.unshift({ value: "", name: "Select Staff" });
      setStaffOptionValues(optionArray);
    };
    fetchData().catch(console.error);
  };

  useEffect(() => {
    getStaffValues();
  }, []);

  useEffect(() => {
    if (staffid) {
      const fetchData = async () => {
        const task_details = await fetch(
          "api/task-report?page-number=" +
            tablePagination +
            "&staffid=" +
            staffid +
            "&start-date=" +
            selectedStartDate +
            "&end-date=" +
            selectedEndDate
        );
        const res = await task_details.json();
        console.log("completedTasks", res);
        setCompletedTasksObject(res.completedTasks);
        setTotalTaskCount(res.completedTasksCount);
      };

      // call the function
      fetchData().catch(console.error);
    }
    console.log("staffid", staffid);
    console.log("selectedStartDate", selectedStartDate);
    console.log("selectedEndDate", selectedEndDate);
  }, [staffid, selectedStartDate, selectedEndDate]);

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
          <h1 className="text-4xl text-indigo-600 mr-auto">Report</h1>
        </div>
        <div className="flex sm:w-2/3p-4">
          <div className="w-full sm:w-1/3 mr-2">
            <DateInputField
              label="Start Date"
              id="startdate"
              name="startdate"
              autoComplete=""
              placeholder="Start Date"
              value={selectedStartDate}
              onChange={(e) => setSelectedStartDate(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-1/3 mr-2">
            <DateInputField
              label="End Date"
              id="enddate"
              name="enddate"
              autoComplete=""
              placeholder="End Date"
              value={selectedEndDate}
              onChange={(e) => setSelectedEndDate(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-1/3">
            <SelectBoxInputField
              label="Staff Name"
              value={staffid}
              options={staffOptionValues}
              onSelect={(e) => setStaffid(e.target.value)}
            />
          </div>
        </div>
        <div>
          {/* <h1>{JSON.stringify(completedTasksObject)}</h1> */}
          {completedTasksObject.map((obj: any, index: number) => (
            <div className="mt-4 w-full px-5 mb-4" key={obj.taskid}>
              <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap">
                    <div className="flex flex-col w-full">
                      <div className="flex w-full">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1 flex-col">
                          <h4 className="text-slate-900 text-xl mb-4">
                            <span className="font-semibold">TaskID:</span> Task
                            -{obj.taskid}
                          </h4>
                          <h4 className="text-slate-900 text-xl mb-4">
                            <span className="font-semibold">Category: </span>
                            Category:
                            {obj.categoryname}
                          </h4>
                        </div>
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1 flex-col">
                          <h4 className="text-slate-900 text-xl mb-4">
                            <span className="font-semibold">Client Name: </span>
                            {obj.clientname}
                          </h4>
                          <h4 className="text-slate-900 text-xl mb-4">
                            <span className="font-semibold">Location: </span>
                            {obj.location}
                          </h4>
                        </div>
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1 flex-col">
                          <h4 className="text-slate-900 text-xl mb-4">
                            <span className="font-semibold">Date: </span>
                            {obj.completeddate}
                          </h4>
                        </div>
                      </div>
                      <div className="flex w-full">
                        <div className="flex relative w-full pr-4 max-w-full flex-wrap border-t border-gray-400">
                          {obj.taskPhotos.map((p: any, index: number) => (
                            <div
                              className="p-10 w-full md:w-1/4"
                              key={p.categorydetailid}
                            >
                              <h3 className="text-slate-800 font-semibold mb-4">
                                {index + 1}. {p.categorydetailname}
                              </h3>
                              <div className="bg-white rounded-lg shadow-lg">
                                <img
                                  src={p.photodataurl}
                                  alt=""
                                  className="rounded-t-lg"
                                />
                              </div>
                            </div>
                          ))}

                          {/* <img src={} alt="Captured" /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          tablePagination={tablePagination}
          totalProjectCount={totalTaskCount}
          prvTabel={prvTabel}
          nextTabel={nextTabel}
        />
      </div>
    </WithRole>
  );
}
{
  /* <h4 className="text-slate-900 text-xl mb-4">
<span className="font-semibold">Type </span>
{p.categorydetailname}
</h4> */
}
