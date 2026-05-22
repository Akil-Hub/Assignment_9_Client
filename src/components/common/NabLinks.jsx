"use client";
import { ThemeToggler } from "@/components/common/ThemeToggler";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = ({ isMenuOpen, className ,setIsMenuOpen}) => {
  const menuItems = [
    { title: "Home", path: "/" },
    { title: "All Facilities", path: "/allFacilities" },
    { title: "My Bookings", path: "/myBookings" },
    { title: "Add Facility", path: "/addFacilities" },
    { title: "Manage My Facility", path: "/manageFacilities" },
  ];

  const pathname = usePathname();

  return (
    <ul
      className={`${isMenuOpen ? " flex-col gap-6 " : "flex-row gap-x-6 "} flex items-center ${className} `}
    >
      {menuItems.map((item, idx) => (
        <li
          key={idx}
          className={pathname === item.path ? " border-primary text-green-400" : "dark:hover:text-green-400"}
        >
          <Link   onClick={()=>setIsMenuOpen(!isMenuOpen)} href={item.path}>{item.title}</Link>
        </li>
      ))}
      {isMenuOpen && <ThemeToggler />}
    </ul>
  );
};

export default NavLinks;
