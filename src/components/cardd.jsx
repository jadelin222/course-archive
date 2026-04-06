'use client'

import Link from "next/link";
// import React, { useState } from "react";
import React from 'react';
import './cardd.css';

const Cardd = ({ title, artistName, description, keywords, images, link, socialLink, socialText, socialLink2, socialText2 }) => {
  return (
    <div className="card">
       <Link href={`/FogRot2024/Artworks/${encodeURIComponent(link)}`} className="card-link" rel="noopener noreferrer">
        <div className="imgContainer">
          {images && images.length > 0 && (
            <img src={images[0]} alt="Card image" />
          )}
        </div>
        
        <div className="card-body">
          <div>
            <h5 className="card-title">{title}</h5>
            <p className="card-artistName">{artistName}</p>
            {/* <p className="card-text" style={{ whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: description }}></p>
            <p className="card-text">{keywords}</p> */}
          </div>
          
          {/* <div className="socialLink-continer">
           <a href={socialLink} className="card-socialLink" target="_blank" rel="noopener noreferrer">{socialText}</a>
           <a href={socialLink2} className="card-socialLink" target="_blank" rel="noopener noreferrer">{socialText2}</a>
          </div> */}
          
          {/* {<a href={'Artworks/' + link} className="card-link">Learn More</a>} */}
        </div>
      </Link>
      
    </div>
  );
};


export default Cardd;
