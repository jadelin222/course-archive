"use client";

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLink } from '@fortawesome/free-solid-svg-icons';
import Cardd from '../../components/cardd';
import Footer from '../../components/footer';
import styles from './artworks.module.css';
import EditorDetails from '../../components/editorDetails';

import cardData from '../../data/cardData';

//The page.js file is the default 'page' of it's respective directory. This is the default 'home' page, so it's URL path will be 'example.com/'

export default function Artworks() {
  const animationContainer = useRef(null);
  let animationInstance = null;

  useEffect(() => {
    // Ensure lottie and the container ref are available
    if (animationContainer.current) {
      animationInstance = lottie.loadAnimation({
        container: animationContainer.current, // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'jsonAnims/fogrot.json',
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

  
  return (
    <>

      {/* Full-screen Animation container */}
      <div 
        ref={animationContainer} 
        style={{
          position: 'fixed', // Use 'absolute' if you don't want it to stay fixed during scroll
          top: 0,
          left: 0,
          width: '100vw',
          // height: '100vh', //
          height:'100%',
          zIndex: -1, // Ensure it stays behind other content
        }}
      ></div>
      
      <main className="flex min-h-screen flex-col items-center justify-between p-2" style={{ position: 'relative', zIndex: 1, paddingTop:'3rem' }}>
        <div className='content'>
          <div className='left'>
            {/* <div>

            <Link href="/">
              <h2 style={{
                fontSize: '48px',
                textShadow: '2px 4px 4px rgba(46,91,173,0.6)',
                textDecoration: 'underline',
                textDecorationThickness: '2px'
              }}>Fog Rot?</h2>
            </Link>
            </div> */}
         
          </div>
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
                    link={index+1}
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
            summary="designed and edited by jade, background by jade" 
          />
        </div>   
      
      </main>
      
      <Footer />
    </>
  );
}

