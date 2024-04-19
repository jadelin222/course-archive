"use client";

import Image from 'next/image'
import Link from 'next/link'

import lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faLink } from '@fortawesome/free-solid-svg-icons';
import Cardd from '../../components/cardd';

const cardData = [
  {
    title: "First Card",
    description: "This is the description for the first card.",
    imageUrl: "/path/to/your/first-image.jpg",
    link: "/first-link-path"
  },
  {
    title: "Second Card",
    description: "This is the description for the second card.",
    imageUrl: "/path/to/your/second-image.jpg",
    link: "/second-link-path"
  },
  // Add more card objects as needed
];

//The page.js file is the default 'page' of it's respective directory. This is the default 'home' page, so it's URL path will be 'example.com/'

export default function Home() {
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
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight+3;
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
      
      <main className="flex min-h-screen flex-col items-center justify-between p-24" style={{ position: 'relative', zIndex: 1 }}>
        <div className='content'>
          <div className='left'>
            <div
            style={{
              background: 'linear-gradient(to top right, rgba(255,255,255,0), rgba(255,255,255,0.2))',
              backdropFilter: 'blur(10px)', 
              WebkitBackdropFilter: 'blur(10px)', // For Safari browser support
              // color: 'black', // Adjust the text color 
              padding: '20px',
              // margin: '20px',
              // borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
              // maxWidth: '40vw', 
              lineHeight: '1.6', 
              // fontSize: '18px', 
              // fontWeight: 'normal', 
            }
            }>   The BSc Digital Arts Computing cohort present their degree show exhibition &apos;Fog Rot&apos;. Working at the hybrid edges between art and technology, its artists exhibit work spanning sculpture, multimedia installation, performance, durational art, immersive soundscapes, and more. &apos;Fog Rot&apos; explores cultural conditions of forgetting and the transience of memory in times of constant change and optimisation. By positioning &apos;Fog&apos; and &apos;Rot&apos; as an anagram for &apos;forgot&apos;, we suggest that we have even forgotten what it is to forget in the first place. Processes of memory decay can be paralleled to ecological processes of decomposition, where dampness grows, with slowness, moving in uncanny and ghostlike ways. What can slowness offer us in the face of ongoing change? &apos;Fog Rot&apos; questions the role of technology in contributing to accelerated narratives of catastrophe, asking how digital decay can offer a different language for understanding the material relationships between technology, art and the ways in which forgetting gives us the task of re-remembering what it is that we are trying to say.
            </div>
              <div
                style={{
                  background: 'linear-gradient(to top right, rgba(200,200,255,0.1), rgba(255,255,255,0.2))',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)', // For Safari browser support
                  padding: '20px', 
                  // margin: '20px', 
                
                  // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                
                }
                }> 
                  Guest-talk Schedule?
                  <br></br>
                  xxxxx/xxx/xxx/  ssssssdhdjdj
                  <br></br>
                  xxxxx/xxx/xxx/  ssssssdhdjdj
                  <br></br>
                  xxxxx/xxx/xxx/  ssssssdhdjdj
                  <br></br>
                  xxxxx/xxx/xxx/  ssssssdhdjdj
                  <br></br>
                  xxxxx/xxx/xxx/  ssssssdhdjdj
                  <br></br>
                  xxxxx/xxx/xxx/  ssssssdhdjdj
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src="/images/StjamesHatchamresized.jpg" alt="Descriptive Alt Text" style={{ marginRight: '10px', width: '80%' }} />
              <a href="https://online.fliphtml5.com/tljyw/cccr/#p=1" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
                Read our Zine online
              </a>
              <FontAwesomeIcon icon={faLink} />
              <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i> {/* Replace 'fa-icon-name' with your specific icon class name */}
            </div>
          </div>
          <div className='right'>
            Selected Artworks Section
            {/* cards here */}
            <div>
              {cardData.map((card, index) => (
                <Cardd
                  key={index}
                  title={card.title}
                  description={card.description}
                  imageUrl={card.imageUrl}
                  link={card.link}
                />
              ))}
            </div>
     
          </div>
        </div>
       
      
      </main>
    </>
  );
}

