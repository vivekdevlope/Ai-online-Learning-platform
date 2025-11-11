"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../../public/logo.svg"
import Link from "next/link";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaBook } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { TbTools } from "react-icons/tb";
import { IoWalletOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Addnewcourse from './Addnewcourse'


const CollapsibleSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const navItems = [
    { icon: <LuLayoutDashboard className="w-6 h-6"/>, label: "Dashboard", path: "/workspace" },
    { icon: <FaBook className="w-6 h-6"/>, label: "My Learning", path: "/workspace/my-learning" },
    { icon: <MdOutlineExplore className="w-6 h-6"/>, label: "Explore Courses", path: "/workspace/explore" },
    { icon: <IoWalletOutline className="w-6 h-6"/>, label: "Billing", path: "/workspace/billing" },
    { icon: <CgProfile className="w-6 h-6"/>, label: "Profile", path: "/workspace/profile" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`${isExpanded ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 ease-in-out relative`}
        role="navigation"
        aria-label="Main navigation"
      >
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-4 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? (
            <MdKeyboardArrowLeft />
          ) : (
            <MdKeyboardArrowRight />
          )}
        </button>

        <div className="p-4">
          <div className="flex items-center justify-center mb-8">
            <Image src={logo} alt="logo" priority/>
            {/* <FiMenu className="w-8 h-8 text-blue-600" /> */}
          </div>
          {isExpanded?
          <Addnewcourse>
          <Button className="font-normal text-md p-5 px-10 mb-5">Create New Course</Button>
          </Addnewcourse>:
          <Addnewcourse>
          <Button className="ml-1 mb-5">+</Button>
          </Addnewcourse>
          }

          <nav className="space-y-2">
            {navItems.map((item,index) => (
              <Link
                key={index}
                href={item.path}
                className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500"
                role="menuitem"
                aria-label={item.label}
              >
                <div className="text-gray-600 group-hover:text-blue-600 transition-colors duration-200">
                  {item.icon}
                </div>
                {isExpanded && (
                  <span className="text-gray-700 font-semibold group-hover:text-blue-600 transition-colors duration-200">
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSidebar;