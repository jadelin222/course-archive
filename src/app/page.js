"use client";

import Image from 'next/image'
import Link from 'next/link'

import lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';
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
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        
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
      // Optional: Clean up when the component unmounts
      // return () => animation.destroy();
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
          height: '100vh', //
          zIndex: -1, // Ensure it stays behind other content
        }}
      ></div>
      
      <main className="flex min-h-screen flex-col items-center justify-between p-24" style={{ position: 'relative', zIndex: 1 }}>
        <div> 
        The BSc Digital Arts Computing cohort present their
degree show exhibition 'Fog Rot'. Working at the
hybrid edges between art and technology, its artists
exhibit work spanning sculpture, multimedia
installation, performance, durational art, immersive
soundscapes, and more.
'Fog Rot' explores cultural conditions of forgetting
and the transience of memory in times of constant
change and optimisation. By positioning 'Fog' and
'Rot' as an anagram for 'forgot', we suggest that we
have even forgotten what it is to forget in the first
place. Processes of memory decay can be paralleled
to ecological processes of decomposition, where
dampness grows, with slowness, moving in uncanny
and ghostlike ways. What can slowness offer us in
the face of ongoing change? 'Fog Rot' questions the
role of technology in contributing to accelerated
narratives of catastrophe, asking how digital decay
can offer a different language for understanding the
material relationships between technology, art and
the ways in which forgetting gives us the task of re-
remembering what it is that we are trying to say.

        </div>

      </main>
    </>
  );
}

