'use client'

// import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import cardData from '../../../data/cardData';

import React, { useEffect, useState } from 'react';
import Cardd from '../../../components/cardd';

export default function ArtworkDetails({ params }){
      
const card = cardData[params.artworksId];
    return (
        <div>
            <h1>art title {params.artworksId}</h1>
            {/* <p>{card.keywords}</p> */}
        </div>
        
        );       
    
 }