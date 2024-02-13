'use client'

import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./navItem"
//Declare and initialise an array of Navigation Item properties. 
const NAV_LIST = [
    { text: "Home", href: "/" },
    { text: "Where am I?", href: "/about" },
    { text: "Get in Touch", href: "/contact" },
];

const NavBar = () => {
    const [navActive, setNavActive] = useState(null);
    const [activeIdx, setActiveIdx] = useState(-1);
  
    return (
      <header>
        <nav className={`nav`}>
          <Link href={"/"}>
              <h1 className="logo">Digital Arts Computing</h1>
          </Link>
          <div
            onClick={() => setNavActive(!navActive)}
            className={`nav__menu-bar`}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={`${navActive ? "active" : ""} nav__menu-list`}>
            {NAV_LIST.map((menu, idx) => (
              <div
                onClick={() => {
                  setActiveIdx(idx);
                  setNavActive(false);
                }}
                key={menu.text}
              >
                {/* <NavItem active={activeIdx === idx} {...menu} /> */}
              </div>
            ))}
          </div>
        </nav>
      </header>
    );
  };

export default NavBar;