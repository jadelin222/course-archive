'use client'

import Link from "next/link";
// import React, { useState } from "react";
import React from 'react';
import './cardd.css';

const Cardd = ({ title, artistName, description, keywords, imageUrl, link }) => {
  return (
    <div className="card">
      {/* <Link href={`/Artworks/${encodeURIComponent(link)}`} className="card-link" target="_blank" rel="noopener noreferrer"> */}
        <img src={imageUrl} alt="Card image" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{artistName}</p>
          <p className="card-text">{description}</p>
          <p className="card-text">{keywords}</p>
          {/* <a href={link} className="card-link">Learn More</a> */}
        </div>
      {/* </Link> */}
      
    </div>
  );
};


export default Cardd;
