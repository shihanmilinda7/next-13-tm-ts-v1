"use client"

import React, { useState } from 'react'
import Modal from 'react-modal'
import TextInputField from '../common-comp/input-fields/text-input-fields';
import { StaffObj } from './types';
import ConfirmAlertbox from '../common-comp/confirm-alertbox';
import { useRouter } from 'next/navigation';
import Toast from '../common-comp/toast';


type ParamTypes = {
  buttonName: string;
  selRowData?: StaffObj;
  delButton?: boolean;
  setReloadTable?: () => void;
}

const StaffAddNew = (params: ParamTypes) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false)
  const [staffid, setStaffid] = useState(params.selRowData?.staffid ?? "");
  const [staffname, setStaffname] = useState(params.selRowData?.staffname ?? "");
  const [username, setUsername] = useState(params.selRowData?.username ?? "");
  const [contracttype, setContracttype] = useState(params.selRowData?.contracttype ?? "");
  const [contactno, setContactno] = useState(params.selRowData?.contactno ?? "");
  const [nic, setNic] = useState(params.selRowData?.nic ?? "");
  const [password, setPassword] = useState(params.selRowData?.password ?? "");
  const [confirmpassword, setConfirmpassword] = useState(params.selRowData?.password ?? "");
  const [userid, setUserid] = useState(params.selRowData?.userid ?? "");

  const [showDelButton, setShowDelButton] = useState(params.delButton);

  const [successfulToast, setSuccessfulToast] = useState(true);
  const closeButtonAction = () => {
    setSuccessfulToast(false);
  }

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
  }

  const submitButtonHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (staffid) {
      console.log("sdfsdfsdfsdfsdfsdfs",)
      update();
    } else {
      console.log("2312312312",)
      addnew();
    }
  }

  //add new staff action
  const addnew = async () => {
    if (password == confirmpassword) {
      const responseNewStaff = await fetch(
        "api/staff",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ staffname, contracttype, contactno, nic, password, username }),
        }
      );

      const res = await responseNewStaff.json();
      console.log(res);

      if (res == "SUCCESS") {
        setIsOpen(false);
        if (params.setReloadTable) {
          params.setReloadTable();
        }
        setSuccessfulToast(true);
        setTimeout(() => {
          setSuccessfulToast(false);
        }, 3000);
        router.push("/staff");
      } else { }

      return res;
    } else {
      // setShowPasswordWarnAlert(true);
      // setTimeout(() => {
      //   setShowPasswordWarnAlert(false);
      // }, 5000);
    }
  };

  //update staff action
  const update = async () => {
    if (password == confirmpassword) {
      const responseUpdateStaff = await fetch(
        "api/staff",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userid, staffid, staffname, contracttype, contactno, nic, password, username }),
        }
      );

      const res = await responseUpdateStaff.json();

      if (res == "SUCCESS") {
        setIsOpen(false);
        if (params.setReloadTable) {
          params.setReloadTable();
        }
        // 
        // window.location.href = "/staff"
        router.push("/staff");
      } else { }

      return res;
    }
  };

  const deleteAction = async () => {
    if (staffid) {
      const responseDelStaff = await fetch(
        "api/staff",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ staffid, userid }),
        }
      );

      const res = await responseDelStaff.json();
      if (res == "SUCCESS") {
        setIsOpen(false);
        if (params.setReloadTable) {
          params.setReloadTable();
        }
        // window.location.href = "/staff"
        router.push("/staff");
      } else { }
    } else {
      // window.location.href = "/staff"
      if (params.setReloadTable) {
        params.setReloadTable();
      }
      router.push("/staff");
    }
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
      >
        {params.buttonName}
      </button>
      {/* <button onClick={() => setIsOpen(true)}>Open Modal</button> */}
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles} ariaHideApp={false}>
        {/* <TextInputField
          id="staffid"
          name="staffid"
          type="hidden"
          autocomplete=""
          value={staffid}
          onChange={(e) => setStaffid(e.target.value)}
        /> */}
        <div className="pl-12 pb-1">
          <h1 className="text-2xl uppercase text-indigo-800">Add New Staff Member</h1>
        </div>
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px]">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <TextInputField
                  label="Name"
                  id="staffname"
                  name="staffname"
                  autoComplete=""
                  placeholder="Name"
                  value={staffname}
                  onChange={(e) => setStaffname(e.target.value)}
                />
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <TextInputField
                  label="Contract Type"
                  id="contracttype"
                  name="contracttype"
                  autoComplete=""
                  placeholder="Contract Type"
                  value={contracttype}
                  onChange={(e) => setContracttype(e.target.value)}
                />
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3">
                <TextInputField
                  label="Username"
                  id="username"
                  name="username"
                  autoComplete=""
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <TextInputField
                  label="Contact No"
                  id="contactno"
                  name="contactno"
                  autoComplete=""
                  placeholder="Contact No"
                  value={contactno}
                  onChange={(e) => setContactno(e.target.value)}
                />
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <TextInputField
                  label="NIC"
                  id="nic"
                  name="nic"
                  autoComplete=""
                  placeholder="NIC"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                />
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <TextInputField
                  label="Password"
                  id="password"
                  name="password"
                  autoComplete=""
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <TextInputField
                  label="Confirm Password"
                  id="confirmpassword"
                  name="confirmpassword"
                  autoComplete=""
                  placeholder="Confirm Password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex">
              <div className="mr-3">
                <button onClick={submitButtonHandler}
                  className="rounded-lg bg-gradient-to-r from-green-500 to-green-600  hover:bg-gradient-to-l hover:from-green-500 hover:to-green-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Submit
                </button>
              </div>
              <div>
                <button onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-600  hover:bg-gradient-to-l hover:from-amber-500 hover:to-amber-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Cancel
                </button>
              </div>


              <div className={showDelButton ? "flex ml-auto" : "flex ml-auto hidden"}>
                <ConfirmAlertbox buttonName="Delete" leftButtonAction={deleteAction} title="Are you sure?" description="Do you want to delete this record ?" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {successfulToast && (
        < Toast title="Succes" description="Staff Created successfully!" buttonColour="bg-green-600 dark:bg-green-700" closeButtonAction={closeButtonAction} />)}

    </div>
  )
}
export default StaffAddNew
