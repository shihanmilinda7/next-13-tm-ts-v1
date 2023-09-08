"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { AiFillSetting, AiOutlineLogout } from "react-icons/ai";
import UpdatePassword from "../common-comp/update-password";

const Navbar = () => {
  const currentRoute = usePathname();
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;
  const userName = session?.user?.username;
  // console.log("userRole", userRole);
  console.log("session?.user?", session.user);
  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signOut();
    window.location.href = "/";
  };

  useEffect(() => {
    const button = document.querySelector(
      "#menu-button"
    ) as HTMLButtonElement | null;
    const menu = document.querySelector("#menu") as HTMLElement | null;

    if (button && menu) {
      const clickHandler = () => {
        menu.classList.toggle("hidden");
      };

      button.addEventListener("click", clickHandler);

      // Clean up the event listener when the component unmounts
      return () => {
        button.removeEventListener("click", clickHandler);
      };
    }
  }, []);

  // styles for all links
  const commonStyles = "md:p-4 py-2 block text-indigo-800 hover:font-bold";
  const activeStyle =
    // commonStyles + " rounded-t-lg bg-indigo-500 text-indigo-900";
    commonStyles + " overline";
  const nonActiveStyle = commonStyles;

  const dropCommonStyle = "hover:font-bold py-2 px-4 block whitespace-no-wrap ";

  const dropNonActiveStyle =
    dropCommonStyle + "bg-white text-xs p-4 border border-gray-100 shadow-md";
  // const dropCommonStyle =
  //   "hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap ";
  // const dropActiveStyle = dropCommonStyle + "bg-purple-400";
  // const dropNonActiveStyle = dropCommonStyle + "bg-purple-300";

  return (
    <header>
      <nav
        className="
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-lg text-gray-700 bg-white p-4 border border-gray-200 shadow-md
        "
      >
        <div className="flex ">
          <svg
            height="35px"
            width="35px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g transform="translate(0 1)">
                <path
                  style={{ fill: "#FDCC00" }}
                  d="M268.8,408.6c0-52.053,33.28-93.867,85.333-93.867c5.973,0,11.947,0.853,17.067,1.707V58.733 h-85.333v51.2H166.4v-51.2H64V485.4h244.907C284.16,468.333,268.8,440.173,268.8,408.6"
                ></path>
                <polygon
                  // style="fill:#FFFFFF;"
                  style={{ fill: "#FFFFFF" }}
                  points="46.933,485.4 64,485.4 64,58.733 46.933,58.733 "
                ></polygon>
                <polygon
                  // style="fill:#FFA800;"
                  style={{ fill: "#FFA800" }}
                  points="371.2,314.733 388.267,314.733 388.267,58.733 371.2,58.733 "
                ></polygon>
                <path
                  // style="fill:#FFE100;"
                  style={{ fill: "#FFE100" }}
                  d="M277.333,408.6c0-46.08,33.28-84.48,76.8-92.16V92.867h-68.267v17.067H149.333V92.867H81.067v358.4 h206.507C280.747,438.467,277.333,423.96,277.333,408.6"
                ></path>
                <path
                  // style="fill:#FDCC00;"
                  style={{ fill: "#FDCC00" }}
                  d="M251.733,41.667c0-18.773-15.36-34.133-34.133-34.133s-34.133,15.36-34.133,34.133h-34.133v68.267 h110.933V41.667H251.733z"
                ></path>
                <polygon
                  // style="fill:#FFA800;"
                  style={{ fill: "#FFA800" }}
                  points="260.267,109.933 285.867,109.933 285.867,41.667 260.267,41.667 "
                ></polygon>
                <path
                  // style="fill:#00DA6C;"
                  style={{ fill: "#00DA6C" }}
                  d="M439.467,408.6c0-52.053-36.693-93.867-81.067-93.867s-81.067,41.813-81.067,93.867 s36.693,93.867,81.067,93.867S439.467,460.653,439.467,408.6"
                ></path>
                <path
                  // style="fill:#00AD55;"
                  style={{ fill: "#00AD55" }}
                  d="M371.2,314.733c-2.56,0-4.267,0-6.827,0c41.813,3.413,75.093,44.373,75.093,93.867 s-33.28,89.6-75.093,93.867c2.56,0,4.267,0,6.827,0c52.053,0,93.867-41.813,93.867-93.867S423.253,314.733,371.2,314.733"
                ></path>
                <path d="M371.2,511c-56.32,0-102.4-46.08-102.4-102.4s46.08-102.4,102.4-102.4s102.4,46.08,102.4,102.4S427.52,511,371.2,511z M371.2,323.267c-46.933,0-85.333,38.4-85.333,85.333s38.4,85.333,85.333,85.333s85.333-38.4,85.333-85.333 S418.133,323.267,371.2,323.267z"></path>{" "}
                <path d="M285.867,118.467H149.333c-5.12,0-8.533-3.413-8.533-8.533V41.667c0-5.12,3.413-8.533,8.533-8.533h26.453 C180.053,13.507,197.12-1,217.6-1s37.547,14.507,41.813,34.133h26.453c5.12,0,8.533,3.413,8.533,8.533v68.267 C294.4,115.053,290.133,118.467,285.867,118.467z M157.867,101.4h119.467V50.2h-25.6c-5.12,0-8.533-3.413-8.533-8.533 c0-14.507-11.093-25.6-25.6-25.6c-14.507,0-25.6,11.093-25.6,25.6c0,5.12-3.413,8.533-8.533,8.533h-25.6V101.4z M260.267,41.667 L260.267,41.667L260.267,41.667z"></path>{" "}
                <path d="M251.733,169.667H132.267c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h119.467 c5.12,0,8.533,3.413,8.533,8.533C260.267,166.253,256,169.667,251.733,169.667z"></path>{" "}
                <path d="M311.467,169.667h-25.6c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h25.6 c5.12,0,8.533,3.413,8.533,8.533C320,166.253,315.733,169.667,311.467,169.667z"></path>{" "}
                <path d="M311.467,203.8h-85.333c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h85.333 c5.12,0,8.533,3.413,8.533,8.533C320,200.387,315.733,203.8,311.467,203.8z"></path>{" "}
                <path d="M311.467,237.933h-34.133c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h34.133 c5.12,0,8.533,3.413,8.533,8.533C320,234.52,315.733,237.933,311.467,237.933z"></path>{" "}
                <path d="M192,203.8h-59.733c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533H192c5.12,0,8.533,3.413,8.533,8.533 C200.533,200.387,196.267,203.8,192,203.8z"></path>{" "}
                <path d="M157.867,237.933h-25.6c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h25.6 c5.12,0,8.533,3.413,8.533,8.533C166.4,234.52,162.133,237.933,157.867,237.933z"></path>{" "}
                <path d="M200.533,272.067h-68.267c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h68.267 c5.12,0,8.533,3.413,8.533,8.533C209.067,268.653,204.8,272.067,200.533,272.067z"></path>{" "}
                <path d="M243.2,237.933H192c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h51.2c5.12,0,8.533,3.413,8.533,8.533 C251.733,234.52,247.467,237.933,243.2,237.933z"></path>{" "}
                <path d="M311.467,272.067h-8.533c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h8.533 c5.12,0,8.533,3.413,8.533,8.533C320,268.653,315.733,272.067,311.467,272.067z"></path>{" "}
                <path d="M268.8,272.067h-34.133c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533H268.8 c5.12,0,8.533,3.413,8.533,8.533C277.333,268.653,273.067,272.067,268.8,272.067z"></path>{" "}
                <path d="M140.8,306.2h-8.533c-5.12,0-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533h8.533c5.12,0,8.533,3.413,8.533,8.533 S145.067,306.2,140.8,306.2z"></path>{" "}
                <path d="M311.467,306.2H243.2c-5.12,0-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533h68.267c5.12,0,8.533,3.413,8.533,8.533 S315.733,306.2,311.467,306.2z"></path>{" "}
                <path d="M209.067,306.2h-34.133c-5.12,0-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533h34.133c5.12,0,8.533,3.413,8.533,8.533 S213.333,306.2,209.067,306.2z"></path>{" "}
                <path d="M317.44,493.933H46.933c-5.12,0-8.533-3.413-8.533-8.533V178.2c0-5.12,3.413-8.533,8.533-8.533s8.533,3.413,8.533,8.533 v298.667h239.787C278.187,458.093,268.8,434.2,268.8,408.6c0-56.32,46.08-102.4,102.4-102.4c2.56,0,5.973,0,8.533,0V67.267H294.4 v42.667c0,5.12-3.413,8.533-8.533,8.533H149.333c-5.12,0-8.533-3.413-8.533-8.533V67.267H55.467v42.667 c0,5.12-3.413,8.533-8.533,8.533s-8.533-3.413-8.533-8.533v-51.2c0-5.12,3.413-8.533,8.533-8.533h102.4 c5.12,0,8.533,3.413,8.533,8.533V101.4h119.467V58.733c0-5.12,3.413-8.533,8.533-8.533h102.4c5.12,0,8.533,3.413,8.533,8.533 V316.44c0,2.56-0.853,5.12-3.413,6.827c-1.707,1.707-4.267,2.56-6.827,1.707c-5.12-0.853-10.24-1.707-15.36-1.707 c-46.933,0-85.333,38.4-85.333,85.333c0,27.307,13.653,53.76,36.693,69.973c3.413,2.56,4.267,5.973,3.413,9.387 C324.267,491.373,320.853,493.933,317.44,493.933z"></path>{" "}
                <path d="M55.467,144.067c0-5.12-3.413-8.533-8.533-8.533s-8.533,3.413-8.533,8.533c0,5.12,3.413,8.533,8.533,8.533 S55.467,149.187,55.467,144.067"></path>{" "}
                <path d="M287.573,459.8H81.067c-5.12,0-8.533-3.413-8.533-8.533v-358.4c0-5.12,3.413-8.533,8.533-8.533h68.267 c5.12,0,8.533,3.413,8.533,8.533v8.533h119.467v-8.533c0-5.12,3.413-8.533,8.533-8.533h68.267c5.12,0,8.533,3.413,8.533,8.533 V316.44c0,4.267-2.56,7.68-6.827,8.533c-40.96,6.827-69.973,42.667-69.973,83.627c0,13.653,3.413,26.453,9.387,38.4 c1.707,2.56,0.853,5.973,0,8.533C293.547,458.093,290.133,459.8,287.573,459.8z M89.6,442.733h185.173 c-4.267-11.093-5.973-22.187-5.973-34.133c0-46.933,31.573-87.893,76.8-98.987V101.4h-51.2v8.533c0,5.12-3.413,8.533-8.533,8.533 H149.333c-5.12,0-8.533-3.413-8.533-8.533V101.4H89.6V442.733z"></path>{" "}
                <path d="M362.667,459.8c-2.56,0-5.12-0.853-6.827-3.413l-25.6-34.133c-2.56-3.413-1.707-9.387,1.707-11.947 c3.413-2.56,9.387-1.707,11.947,1.707l25.6,34.133c2.56,3.413,1.707,9.387-1.707,11.947 C366.08,458.947,364.373,459.8,362.667,459.8z"></path>{" "}
                <path d="M362.667,459.8c-1.707,0-3.413-0.853-5.12-1.707c-4.267-2.56-5.12-7.68-2.56-11.947l51.2-76.8 c2.56-4.267,7.68-5.12,11.947-2.56s5.12,7.68,2.56,11.947l-51.2,76.8C367.787,458.093,365.227,459.8,362.667,459.8z"></path>{" "}
              </g>{" "}
            </g>
          </svg>
          <h1 className="text-xl text-indigo-700 italic flex items-center justify-center">
            CeyInfo - Taskmon
          </h1>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="menu-button"
          className="h-6 w-6 cursor-pointer md:hidden block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

        <div
          className="hidden w-full md:flex md:items-center md:w-auto"
          id="menu"
        >
          <ul
            className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0"
          >
            <li>
              <Link
                href="/dashboard"
                className={
                  currentRoute === "/dashboard" ? activeStyle : nonActiveStyle
                }
              >
                Dashboard
              </Link>
            </li>
            <li className={userRole == "admin" ? "" : "hidden"}>
              <Link
                href="/staff"
                className={
                  currentRoute === "/staff" ? activeStyle : nonActiveStyle
                }
              >
                Staff
              </Link>
            </li>
            <li className={userRole == "admin" ? "" : "hidden"}>
              <Link
                href="/category"
                className={
                  currentRoute === "/category" ? activeStyle : nonActiveStyle
                }
              >
                Category
              </Link>
            </li>
            <li className={userRole == "admin" ? "" : "hidden"}>
              <Link
                href="/task"
                className={
                  currentRoute === "/task" ? activeStyle : nonActiveStyle
                }
              >
                Task
              </Link>
            </li>
            <li className={userRole == "admin" ? "" : "hidden"}>
              <Link
                href="/task-report"
                className={
                  currentRoute === "/task-report" ? activeStyle : nonActiveStyle
                }
              >
                Report
              </Link>
            </li>
            <div className="flex items-center justify-center">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                width="30px"
                height="30px"
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
                    style={{ fill: "#90DFAA" }}
                    cx="256"
                    cy="256"
                    r="256"
                  />{" "}
                  <path
                    style={{ fill: "#2C9984" }}
                    d="M508.114,300.639L369.778,162.302L205.145,325.818l-61.487,72.404l113.761,113.761 C382.942,511.3,487.072,420.29,508.114,300.639z"
                  />{" "}
                  <polygon
                    style={{ fill: "#FFFFFF" }}
                    points="321.253,113.778 143.658,113.778 143.658,398.222 369.778,398.222 369.778,162.302 "
                  />{" "}
                  <polygon
                    style={{ fill: "#E6F3FF" }}
                    points="369.778,162.302 321.253,113.778 237.037,113.778 237.037,398.222 369.778,398.222 "
                  />{" "}
                  <polygon
                    style={{ fill: "#CFDBE6" }}
                    points="321.253,162.304 369.778,162.302 321.253,113.778 "
                  />{" "}
                  <circle
                    style={{ fill: "#26BEBE" }}
                    cx="237.037"
                    cy="215.143"
                    r="37.9"
                  />{" "}
                  <path
                    style={{ fill: "#1DA09C" }}
                    d="M274.937,215.14c0-20.932-16.968-37.9-37.898-37.9v75.798 C257.969,253.038,274.937,236.07,274.937,215.14z"
                  />{" "}
                  <path
                    style={{ fill: "#324A5E" }}
                    d="M158.868,334.76c0-43.172,34.997-78.169,78.169-78.169s78.169,34.997,78.169,78.169L158.868,334.76 L158.868,334.76z"
                  />{" "}
                  <path
                    style={{ fill: "#2B3B4E" }}
                    d="M237.037,256.593v78.169h78.167C315.206,291.59,280.209,256.593,237.037,256.593z"
                  />{" "}
                  <circle
                    style={{ fill: "#FFD15D" }}
                    cx="350.815"
                    cy="293.926"
                    r="63.104"
                  />{" "}
                  <g>
                    {" "}
                    <path
                      style={{ fill: "#F4A200" }}
                      d="M350.815,369.778c-41.825,0-75.852-34.026-75.852-75.852s34.026-75.852,75.852-75.852 s75.852,34.026,75.852,75.852S392.64,369.778,350.815,369.778z M350.815,243.571c-27.765,0-50.355,22.59-50.355,50.355 c0,27.765,22.59,50.355,50.355,50.355c27.765,0,50.355-22.59,50.355-50.355C401.17,266.161,378.58,243.571,350.815,243.571z"
                    />{" "}
                    <rect
                      x="339.334"
                      y="265.24"
                      style={{ fill: "#F4A200" }}
                      width="22.947"
                      height="57.372"
                    />{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>
            <div className="dropdown inline-block relative rounded-lg z-40">
              <button className={nonActiveStyle + " inline-flex"}>
                <span className="mr-1">{userName}</span>
              </button>
              <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                <li>
                  <div className={dropNonActiveStyle + " flex"}>
                    <span className="text-gray-500 pr-2">
                      <AiOutlineLogout className="inline-block h-5 w-5" />
                    </span>
                    <button
                      onClick={handleSignOut}
                      // className={dropNonActiveStyle}
                    >
                      Logout
                    </button>
                  </div>
                </li>
                <li>
                  <div className={dropNonActiveStyle + " flex"}>
                    <span className="text-gray-500 pr-2">
                      <AiFillSetting className="inline-block h-5 w-5" />
                    </span>
                    <UpdatePassword />
                  </div>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
// {/* <div className="dropdown inline-block relative rounded-lg z-50">
//               <button className="md:pt-4 md:pb-4 md:pl-2 block text-indigo-800 hover:font-bold inline-flex">
//                 <span className="mr-1">{userName}</span>
//                 {/* <svg
//                   className="fill-current h-4 w-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//                 </svg> */}
//               </button>
//               <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
//                 <li>
//                   <button
//                     onClick={handleSignOut}
//                     className="z-50 w-full flex justify-center text-gray-700 bg-white p-4 border border-gray-200 shadow-md hover:font-bold p-4  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </div> */}
