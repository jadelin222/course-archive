'use client'

import cardData from '../../../data/cardData';
import React, { useEffect, useState } from 'react';
import Footer from '../../../components/footer';
import styles from '../artworks.module.css';
import ImageSlider from '../../../components/ImageSlider';
import Link from 'next/link';

export default function ArtworkDetails({ params }){

var cardIndex = cardData.findIndex(obj => obj.link==params.artworksId);
// console.log(cardIndex);
const card = cardData[cardIndex];

    return (
        <>
            <main className={styles.main} style={{ backgroundColor: '#a3b5b4' }}>
                <div className={styles.imgContainer}>
                     <ImageSlider images={card.images} /> 
                </div>
                <div className={styles.titleArtistContainer}>
                    <h1 className={styles.title}>{card.title}</h1>
                    <p>{card.artistName}</p>
                </div>
                {<p className={styles.text} style={{ whiteSpace: 'pre-line'}} dangerouslySetInnerHTML={{ __html: card.description }}></p>}
                {/* {<p>{card.keywords}</p>} */}
                <div className={styles.socialLinkcontiner}>
                    <a href={card.socialLink} className={styles.cardSocialLink} target="_blank" rel="noopener noreferrer">{card.socialText}</a>
                    <a href={card.socialLink2} className={styles.cardSocialLink} target="_blank" rel="noopener noreferrer">{card.socialText2}</a>
                </div>
                <div className={styles.backToGallery}>
                ← <Link href={"/Artworks"}>back to the gallery</Link>
                </div>
            
            </main>
                {/* <h1>art title {params.artworksId}</h1> */}        
        <Footer />
        </>
       
       
        );       
    
}