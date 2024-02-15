'use client'

// import Link from "next/link";
// import React, { useState } from "react";
import NavItem from "./navItem"
//Declare and initialise an array of Navigation Item properties. 
const NAV_LIST = [
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
    { text: "Contact Us", href: "/contact" },
];

const NavBar = () => {
    return (
      <header>
      {NAV_LIST.map((item, index) => (
        <NavItem key={index} text={item.text} href={item.href} active={item.active} />
      ))}
      </header>
    );
};

export default NavBar;