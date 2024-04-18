'use client'

// import Link from "next/link";
// import React, { useState } from "react";
import React from 'react';
import './cardd.css';
// import NavItem from "./navItem"
//Declare and initialise an array of Navigation Item properties. 
// const NAV_LIST = [
//     { imgSrc: "/images/forRot_icon.png", href: "/" }, // Adjust the path to your actual image location
//     { text: "Fog Rot 2024", href: "/images/dac_icon.png" },
//     // { text: "Floorplan", href: "/floorplan" }
//     { text: "Floorplan", href: "/images/floorplan.png" }
//     // { text: "FogRot", href: "/fogrot" },
//     // { text: "Contact Us", href: "mailto:computing@gold.ac.uk" },
// ];

const Cardd = ({ title, description, imageUrl, link }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt="Card image" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href={link} className="card-link">Learn More</a>
      </div>
    </div>
  );
};


export default Cardd;
