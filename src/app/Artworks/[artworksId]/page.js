'use client'

import cardData from '../../../data/cardData';
import React, { useEffect, useState } from 'react';
import Cardd from '../../../components/cardd';
import styles from '../artworks.module.css';

export default function ArtworkDetails({ params }){
      
const card = cardData[params.artworksId-1];
    return (
        <div className={styles.cardStyle}>
            <h1>art title {params.artworksId}</h1>
            {<p>{card.title}</p>}
            {<p>{card.artistName}</p>}
            {<p>{card.description}</p>}
            {<p>{card.keywords}</p>}
        </div>
        );       
    
}