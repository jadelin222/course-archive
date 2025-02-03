"use client";

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLink } from '@fortawesome/free-solid-svg-icons';
import Cardd from '../../../components/cardd';
import Footer from '../../../components/footer';
import styles from './artworks.module.css';
import EditorDetails from '../../../components/editorDetails';

import cardData from '../../../data/cardData';

//The page.js file is the default 'page' of it's respective directory. This is the default 'home' page, so it's URL path will be 'example.com/'

export default function Artworks() {
  const animationContainer = useRef(null);
  let animationInstance = null;
//background animation code start 
  useEffect(() => {
    // Ensure lottie and the container ref are available
    if (animationContainer.current) {
      animationInstance = lottie.loadAnimation({
        container: animationContainer.current, // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '../jsonAnims/fogrot.json',
        rendererSettings: {
          // preserveAspectRatio: 'none' // This will stretch the animation to fill the container
          preserveAspectRatio: 'xMidYMid slice'
        },
      });

      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight+4;
        // const scrollMax = document.documentElement.scrollHeight;
        
        // Calculate the current frame of the lottie animation
        const currentFrame = animationInstance.totalFrames * (scrollPosition / scrollMax);
        
        // Go to the calculated frame and stop there
        animationInstance.goToAndStop(currentFrame, true);
      };

      // Add event listener for scroll
      window.addEventListener('scroll', handleScroll);

      // Clean up function
      return () => {
        window.removeEventListener('scroll', handleScroll);
        animationInstance.destroy();
      };
      
    }
  }, []);

  //background animation ends
  return (
    <>

      {/* Full-screen Animation container */}
      <div 
        ref={animationContainer} 
        style={{
          position: 'fixed', 
          top: 0,
          left: 0,
          width: '100vw',
          height:'100%',
          zIndex: -1, 
        }}
      ></div>
      
      <main className="flex min-h-screen flex-col items-center justify-between p-2" style={{ position: 'relative', zIndex: 1, paddingTop:'3rem' }}>
        <div className='content'>
          <div className='left'>
          </div>
          {/* --------------------------------container for cards!!----------------------------------- */}
          <div className='right'>
            {/* Selected Artworks Section */}
            {/* cards here */}
              <div className={styles.cardsContainer}>
                {cardData.map((card, index) => (
                  <Cardd
                    className={styles.card}
                    key={index}
                    title={card.title}
                    artistName={card.artistName}
                    description={card.description}
                    keywords={card.keywords}
                    images={card.images}
                    // link={index+1}
                    link={card.link}
                    socialLink={card.socialLink}
                    socialText={card.socialText}
                    socialLink2={card.socialLink2}
                    socialText2={card.socialText2}
                  />
                ))}
              </div>
            
     
          </div>
         

        </div>
        <div>
          <EditorDetails  
            summary="designed and edited by jade & david, background by jade" 
          />
        </div>   
      
      </main>
      
      <Footer />
    </>
  );
}

