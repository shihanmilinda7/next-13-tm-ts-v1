"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Navbar = () => {
  const currentRoute = usePathname();

  useEffect(() => {
    const button = document.querySelector('#menu-button') as HTMLButtonElement | null;
    const menu = document.querySelector('#menu') as HTMLElement | null;

    if (button && menu) {
      const clickHandler = () => {
        menu.classList.toggle('hidden');
      };

      button.addEventListener('click', clickHandler);

      // Clean up the event listener when the component unmounts
      return () => {
        button.removeEventListener('click', clickHandler);
      };
    }
    // const button = document.querySelector('#menu-button');
    // const menu = document.querySelector('#menu');

    // button.addEventListener('click', () => {
    //   menu.classList.toggle('hidden');
    // });

    // // Clean up the event listener when the component unmounts
    // return () => {
    //   button.removeEventListener('click', () => {
    //     menu.classList.toggle('hidden');
    //   });
    // };
  }, []);


  // styles for all links
  const commonStyles = "text-xl md:p-4 py-2 block hover:text-indigo-900 text-white";
  const activeStyle = commonStyles + ' rounded-t-lg bg-indigo-500 text-indigo-900 font-bold';
  const nonActiveStyle = commonStyles + ' text-white';

  return (
    // <header classNameName="navbar">
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
          text-lg text-gray-700
          bg-gradient-to-b from-indigo-600 to-blue-500
        "
      >
        <div>
          <a href="#">
            <h1 className="text-4xl text-red-100 font-extrabold italic">
              SDS
            </h1>
          </a>
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
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

        <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
          <ul
            className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0"
          >
            <li><Link href="/dashboard" className={currentRoute === '/dashboard' ? activeStyle : nonActiveStyle}>Dashboard</Link></li>
            <li><Link href="/staff" className={currentRoute === '/staff' ? activeStyle : nonActiveStyle}>Staff</Link></li>
            <li><Link href="/category" className={currentRoute === '/category' ? activeStyle : nonActiveStyle}>Category</Link></li>
            <li><Link href="/task" className={currentRoute === '/task' ? activeStyle : nonActiveStyle}>Task</Link></li>
            {/* <li><Link href="/projects" className={currentRoute === '/projects' ? activeStyle : nonActiveStyle}>Projects</Link></li> */}
            {/* <li><Link href={"/time_allocation/"+new Date().toJSON().slice(0, 10)} className={currentRoute === "/time_allocation/"+new Date().toJSON().slice(0, 10) ? activeStyle : nonActiveStyle}>Time Allocation</Link></li> */}
            <li><Link href="/" className={currentRoute === '/' ? activeStyle : nonActiveStyle}>Report</Link></li>
            <li><Link href="/" className={commonStyles}>Logout</Link></li>
          </ul>
        </div>
      </nav>
    </header >
  );
};

export default Navbar;
