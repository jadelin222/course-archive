'use client'

// import Link from "next/link";
// import React, { useState } from "react";
import React from 'react';
import NavItem from "./navItem"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
//Declare and initialise an array of Navigation Item properties. 
const NAV_LIST = [
    // { imgSrc: "/images/dac_icon.png", href: "/" }, // Adjust the path to your actual image location
    { text: "WORKS IN CHAOS", href: "/WorksInChaos" },
    { icon: faInstagram, href: "https://www.instagram.com/digital_arts_computing/?hl=en", newTab: true }
    // { text: "Floorplan", href: "/floorplan" }
    // { text: "Floorplan", href: "/images/floorplan.png" }
    // { text: "FogRot", href: "/fogrot" },
    // { text: "Contact Us", href: "mailto:computing@gold.ac.uk" },
];

const NavBarWIC = () => {

  return (
    <header className="sticky-navbar">
    {NAV_LIST.map((item, index) => (
      <NavItem key={index} href={item.href} active={item.active}>
        {item.imgSrc ? (
          <img src={item.imgSrc} alt="Home" className="nav-icon" />
        ) : item.icon ? (
          <FontAwesomeIcon icon={item.icon} style={{ color: 'white' }} className="nav-icon" />
        ) : (
          item.text
        )}
      </NavItem>
    ))}
  </header>
  );
};

export default NavBarWIC;