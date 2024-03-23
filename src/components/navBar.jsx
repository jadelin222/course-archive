'use client'

// import Link from "next/link";
// import React, { useState } from "react";
import NavItem from "./navItem"
//Declare and initialise an array of Navigation Item properties. 
const NAV_LIST = [
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
    { text: "Schedule", href: "/schedule" },
    // { text: "FogRot", href: "/fogrot" },
    // { text: "Contact Us", href: "mailto:computing@gold.ac.uk" },
];

const NavBar = () => {
    return (
      <header className="sticky-navbar">
      {NAV_LIST.map((item, index) => (
        <NavItem key={index} text={item.text} href={item.href} active={item.active} />
      ))}
      </header>
    );
};

export default NavBar;

// const NavBar = ({ customNavList }) => {
//   const NAV_LIST = customNavList || [
//       { text: "Home", href: "/" },
//       { text: "About", href: "/about" },
//       { text: "FogRot", href: "/fogrot" },
//       { text: "Contact Us", href: "mailto:computing@gold.ac.uk" },
//   ];

//   return (
//       <header>
//           {NAV_LIST.map((item, index) => (
//               <NavItem key={index} text={item.text} href={item.href} active={item.active} />
//           ))}
//       </header>
//   );
// };

// export default NavBar;