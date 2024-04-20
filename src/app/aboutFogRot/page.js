"use client"
import '../../styles/home.css';
import Image from 'next/image'
import Link from 'next/link'

//This page.js file is located inside the /about directory, so its URL path becomes 'example.com/about'
import React, { useEffect, useRef } from 'react';
import {Engine, Render, Bodies, World} from 'matter-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';



const AboutFogRot = () => {
  const scene = useRef()
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())

  const divRef1 = useRef(null);
  const divRef2 = useRef(null);
  const divRef3 = useRef(null);
  const divRef4 = useRef(null);   //zine link
  const divRef5 = useRef(null);   //floorplan link
  const divRef6 = useRef(null);   //workshop link
  const divRef7 = useRef(null);   //time
  const divRef8 = useRef(null);   //location Link

  useEffect(() => {
    // const cw = document.body.clientWidth
    // const ch = document.body.clientHeight
    const cw = document.body.clientWidth
    const ch = document.body.clientHeight

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'grey'
      }
    })

    //load forot icon image
  // const image = new Image();
  // image.src = '/images/forRot_icon.png'; 


    const body1 = Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true });
    const body2 = Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true });
    const body3 = Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true });
    const body4 = Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true });

    const body5 = Bodies.rectangle(200, 200, divRef1.current.offsetWidth, divRef1.current.offsetHeight, {
      isStatic: false, // Make it dynamic
      mass: 5,
      restitution: 0.5,
      friction: 0.1,
      angle:0.2
    });
    const body6 = Bodies.rectangle(200, 400, divRef2.current.offsetWidth, divRef2.current.offsetHeight, {
      isStatic: false, // Make it dynamic
      mass: 2,
      restitution: 0.5,
      friction: 0.1,
      angle:1
    });
    const body7 = Bodies.rectangle(200, 200, divRef3.current.offsetWidth, divRef3.current.offsetHeight, {
      isStatic: false, // Make it dynamic
      mass: 4,
      restitution: 0.5,
      friction: 0.2,
      angle:0.5
    });
//zine
    const body8 = Bodies.rectangle(cw/2, 200, divRef4.current.offsetWidth, divRef4.current.offsetHeight, {
      isStatic: false, // Make it dynamic
      mass: 4,
      restitution: 0.5,
      friction: 0.4,
      angle:0.3
    });
//floorplan
    const body9 = Bodies.rectangle(cw/2, 400, divRef5.current.offsetWidth, divRef5.current.offsetHeight, {
      isStatic: false, // Make it dynamic
      mass: 4,
      restitution: 0.5,
      friction: 0.4,
      angle:0.3,
      render: {
        fillStyle: 'transparent',
   }
    });

    //workshop
    const body10 = Bodies.rectangle(cw*2/3, 400, divRef6.current.offsetWidth, divRef6.current.offsetHeight, {
      isStatic: false, // Make it dynamic
      mass: 6,
      restitution: 0.5,
      friction: 0.4,
      angle:0.5,
      render: {
        fillStyle: 'transparent',
   }
    });

     //artworks
     const body11 = Bodies.rectangle(cw*2/3, 200, divRef7.current.offsetWidth, divRef7.current.offsetHeight, {
      isStatic: false, // Make it dynamic
      mass: 3,
      restitution: 0.5,
      friction: 0.4,
      angle:0.5,
      render: {
        fillStyle: 'transparent',
   }
    });

     //opentime
     const body12 = Bodies.rectangle(cw*2/3, ch-divRef8.current.offsetHeight, divRef8.current.offsetWidth, divRef8.current.offsetHeight, {
      isStatic: false, // Make it dynamic
      mass: 3,
      restitution: 0.5,
      friction: 0.4,
      angle:0.5,
      render: {
        fillStyle: 'green',
   }
    });


    World.add(engine.current.world, [
      body1, body2, body3, body4, body5, body6, body7, body8, body9, body10, body11, body12])

    Engine.run(engine.current)
    Render.run(render)

     // Update function to sync Matter.js and DOM
  const update = () => {
    const halfWidth1 = divRef1.current.offsetWidth / 2;
    const halfHeight1 = divRef1.current.offsetHeight / 2;
    divRef1.current.style.transform = `translate(${body5.position.x - halfWidth1}px, ${body5.position.y - halfHeight1}px) rotate(${body5.angle}rad)`;

    const halfWidth2 = divRef2.current.offsetWidth / 2;
    const halfHeight2 = divRef2.current.offsetHeight / 2;
    divRef2.current.style.transform = `translate(${body6.position.x - halfWidth2}px, ${body6.position.y - halfHeight2}px) rotate(${body6.angle}rad)`;

    const halfWidth3 = divRef3.current.offsetWidth / 2;
    const halfHeight3 = divRef3.current.offsetHeight / 2;
    divRef3.current.style.transform = `translate(${body7.position.x - halfWidth3}px, ${body7.position.y - halfHeight3}px) rotate(${body7.angle}rad)`;
    
    const halfWidth4 = divRef4.current.offsetWidth / 2;
    const halfHeight4 = divRef4.current.offsetHeight / 2;
    divRef4.current.style.transform = `translate(${body8.position.x - halfWidth4}px, ${body8.position.y - halfHeight4}px) rotate(${body8.angle}rad)`;
    
//floorplan
    const halfWidth5 = divRef5.current.offsetWidth / 2;
    const halfHeight5 = divRef5.current.offsetHeight / 2;
    divRef5.current.style.transform = `translate(${body9.position.x - halfWidth5}px, ${body9.position.y - halfHeight5}px) rotate(${body9.angle}rad)`;

//events
    const halfWidth6 = divRef6.current.offsetWidth / 2;
    const halfHeight6 = divRef6.current.offsetHeight / 2;
    divRef6.current.style.transform = `translate(${body10.position.x - halfWidth6}px, ${body10.position.y - halfHeight6}px) rotate(${body10.angle}rad)`;

//artworks
    const halfWidth7 = divRef7.current.offsetWidth / 2;
    const halfHeight7 = divRef7.current.offsetHeight / 2;
    divRef7.current.style.transform = `translate(${body11.position.x - halfWidth7}px, ${body11.position.y - halfHeight7}px) rotate(${body11.angle}rad)`;


    //time
    const halfWidth8 = divRef8.current.offsetWidth / 2;
    const halfHeight8 = divRef8.current.offsetHeight / 2;
    divRef8.current.style.transform = `translate(${body12.position.x - halfWidth8}px, ${body12.position.y - halfHeight8}px) rotate(${body12.angle}rad)`;

    requestAnimationFrame(update);
  };

  update();

    return () => {
      Render.stop(render)
      World.clear(engine.current.world)
      Engine.clear(engine.current)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}
    }
  }, [])

  const handleDown = () => {
    isPressed.current = true
  }

  const handleUp = () => {
    isPressed.current = false
  }

  const handleAddCircle = e => {
    // Check if the event is a touch event and prevent the default action
    if (e.touches) e.preventDefault();
  
    // Determine whether this is a touch event or a mouse event
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const radius = 10 + Math.random() * 30; 
    const baseSize = 90;
  
    if (isPressed.current) {
      const ball = Bodies.circle(
        clientX,
        clientY,
        radius,
        {
          mass: 10,
          restitution: 0.9,
          friction: 0.005,
          render: {
            fillStyle: '#0000ff',
            sprite: {
              texture: '/images/favicon_io/apple-touch-icon.png',
              xScale: radius / baseSize, // Adjust these based on your needs
              yScale: radius / baseSize
          } 
          }
        }
      );
      World.add(engine.current.world, [ball]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0" style={{ overflow:'hidden' }}>
      <div
            onMouseDown={handleDown}
            onMouseUp={handleUp}
            onMouseMove={handleAddCircle}
            // onTouchStart={handleDown} 
            // onTouchEnd={handleUp}   
            // onTouchMove={handleAddCircle} 
          >
        {/* <div ref={scene} style={{ width: '100%', height: '100%' }} /> */}
        <div ref={scene} style={{ width: '100%', height: '100%' }}>

          <div className="aboutContainer" ref={divRef1} style={{ position: 'absolute', width: '280px', height: 'auto', transform: 'rotate(-30deg)', zIndex: 10, padding:'1.5rem' }}>
            The BSc Digital Arts Computing cohort present their degree show exhibition 'Fog Rot'. Working at the hybrid edges between art and technology, its artists exhibit work spanning sculpture, multimedia installation, performance, durational art, immersive soundscapes, and more.
          </div>
          <div className="aboutContainer" ref={divRef2} style={{ position: 'absolute', width: '380px', height: 'auto', zIndex: 10 }}>
            'Fog Rot' explores cultural conditions of forgetting and the transience of memory in times of constant change and optimisation. By positioning 'Fog' and 'Rot' as an anagram for 'forgot', we suggest that we have even forgotten what it is to forget in the first place. Processes of memory decay can be paralleled to ecological processes of decomposition, where dampness grows, with slowness, moving in uncanny and ghostlike ways. What can slowness offer us in the face of ongoing change?
          </div>
          <div className="aboutContainer" ref={divRef3} style={{ position: 'absolute', width: '380px', height: 'auto', zIndex: 10 }}>
            'Fog Rot' questions the role of technology in contributing to accelerated narratives of catastrophe, asking how digital decay can offer a different language for understanding the material relationships between technology, art and the ways in which forgetting gives us the task of re-remembering what it is that we are trying to say.
          </div>
          <div className="zineContainer" ref={divRef4} style={{ position: 'absolute', width: '380px', height: 'auto', zIndex: 10 }}>
            
            <Link href="https://online.fliphtml5.com/tljyw/cccr/#p=1" target="_blank" rel="noopener noreferrer">
              <Image src='/images/zinecover.png' alt='image' width={795} height={1118}>
              </Image>
              Read our Zine online
             <FontAwesomeIcon icon={faLink} />
            </Link>
          </div>

          <div className="wordArtContainer" ref={divRef5} style={{ position: 'absolute', width: '380px', height: 'auto', zIndex: 10 }}>
            
            <Link href="/images/floorplan.png" target="_blank" rel="noopener noreferrer">
              <Image src='/images/words/floorPlanTxt.png' alt='image' width={581} height={346}>
              </Image>
            </Link>
          </div>

          <div className="wordArtContainer" ref={divRef6} style={{ position: 'absolute', width: '380px', height: 'auto', zIndex: 10 }}>
            
            <Link href="/workshop" target="_blank" rel="noopener noreferrer">
              <Image src='/images/words/workshopTxt.png' alt='image' width={835} height={208}>
              </Image>
            </Link>
          </div>

          <div className="wordArtContainer" ref={divRef7} style={{ position: 'absolute', width: '380px', height: 'auto', zIndex: 10 }}>
            
            <Link href="/Artworks" target="_blank" rel="noopener noreferrer">
              <Image src='/images/words/artworksTxt.png' alt='image' width={1354} height={442}>
              </Image>
            </Link>
          </div>
          {/* time */}
          <div className="timeContainer" ref={divRef8} style={{ position: 'absolute', width: 'auto', height: 'auto', zIndex: 10 }}>   
            <div className="footer-flex-item">
              <h3>Opening Time</h3>
              <div style={{ paddingBottom: '12px' }}>
                <p>[25 April, 2024]</p>
                <p>6PM - 10PM</p>
              </div>
              <div style={{ paddingBottom: '12px' }}>
                <p>[26-27 April, 2024]</p>
                <p>10AM - 8PM</p>
              </div>
              <div style={{ paddingBottom: '12px' }}>
                <p>[28 April, 2024]</p>
                <p>10AM - 5PM</p>
              </div>
            </div>
            <div className="footer-flex-item">
            <h3>Getting Here</h3>
            <a href="https://www.gold.ac.uk/campus-map/st-james-hatcham-building/#map-view">
              St. James Hatcham Building (AKA The Church)
              <Image
                src="/images/StjamesHatchamresized.jpg"
                width={150}
                height={80}
                alt="Picture of the St. James Hatcham Building"
              />
            </a>
            <p>- Turn off New Cross road and walk up St James</p>
            <p style={{ paddingBottom: '12px' }}>- The St James Hatcham Building is at the end of the road</p>
          </div>
          </div>
      
        </div>
      </div>

    </main>
    
  )
  
};

export default AboutFogRot;