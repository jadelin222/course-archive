"use client"

import Image from 'next/image'
import Link from 'next/link'

//This page.js file is located inside the /about directory, so its URL path becomes 'example.com/about'
import React, { useEffect, useRef } from 'react';
import {Engine, Render, Bodies, World} from 'matter-js';

const AboutFogRot = () => {
  const scene = useRef()
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())

  const divRef1 = useRef(null);
  const divRef2 = useRef(null);
  const divRef3 = useRef(null);

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

    const body5 = Bodies.rectangle(400, 200, 280, 300, {
      isStatic: false, // Make it dynamic
      mass: 5,
      restitution: 0.5,
      friction: 0.1,
      angle:1.2
    });
    const body6 = Bodies.rectangle(200, 400, 380, 300, {
      isStatic: false, // Make it dynamic
      mass: 2,
      restitution: 0.5,
      friction: 0.1,
      angle:1
    });
    const body7 = Bodies.rectangle(200, 200, 380, 300, {
      isStatic: false, // Make it dynamic
      mass: 4,
      restitution: 0.5,
      friction: 0.2,
      angle:0.5
    });
    World.add(engine.current.world, [
      body1, body2, body3, body4, body5, body6, body7])

    Engine.run(engine.current)
    Render.run(render)

     // Update function to sync Matter.js and DOM
  const update = () => {
    divRef1.current.style.transform = `translate(${body5.position.x - 140}px, ${body5.position.y - 150}px) rotate(${body5.angle}rad)`;
    divRef2.current.style.transform = `translate(${body6.position.x - 190}px, ${body6.position.y - 150}px) rotate(${body6.angle}rad)`;
    divRef3.current.style.transform = `translate(${body7.position.x - 190}px, ${body7.position.y - 150}px) rotate(${body7.angle}rad)`;
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
            onTouchStart={handleDown} 
            onTouchEnd={handleUp}   
            onTouchMove={handleAddCircle} 
          >
        {/* <div ref={scene} style={{ width: '100%', height: '100%' }} /> */}
        <div ref={scene} style={{ width: '100%', height: '100%' }}>

          <div ref={divRef1} style={{ position: 'absolute', width: '280px', height: '300px', transform: 'rotate(-30deg)', backgroundColor: 'blue', zIndex: 10, padding:'1.5rem' }}>
            The BSc Digital Arts Computing cohort present their degree show exhibition 'Fog Rot'. Working at the hybrid edges between art and technology, its artists exhibit work spanning sculpture, multimedia installation, performance, durational art, immersive soundscapes, and more.
          </div>
          <div ref={divRef2} style={{ position: 'absolute', width: '380px', height: '300px', backgroundColor: 'yellow', zIndex: 10 }}>
            'Fog Rot' explores cultural conditions of forgetting and the transience of memory in times of constant change and optimisation. By positioning 'Fog' and 'Rot' as an anagram for 'forgot', we suggest that we have even forgotten what it is to forget in the first place. Processes of memory decay can be paralleled to ecological processes of decomposition, where dampness grows, with slowness, moving in uncanny and ghostlike ways. What can slowness offer us in the face of ongoing change?
          </div>
          <div ref={divRef3} style={{ position: 'absolute', width: '380px', height: '300px', backgroundColor: 'green', zIndex: 10 }}>
            'Fog Rot' questions the role of technology in contributing to accelerated narratives of catastrophe, asking how digital decay can offer a different language for understanding the material relationships between technology, art and the ways in which forgetting gives us the task of re-remembering what it is that we are trying to say.
          </div>
        </div>
      </div>

    </main>
    
  )
  // const sceneRef = useRef();
  // const mainRef = useRef();  // Reference to the main element
  // const divRef1 = useRef();
  // const divRef2 = useRef();
  // const divRef3 = useRef();

  // useEffect(() => {
  //   const engine = Matter.Engine.create();
  //   const world = engine.world;

  //   const setupBoundaries = () => {
  //     const bounds = mainRef.current.getBoundingClientRect();
  //     const thickness = 350; // Thickness of boundary walls
  //     const offset = thickness / 2;
    
  //     // Top boundary
  //     const top = Matter.Bodies.rectangle(bounds.width / 2, -offset, bounds.width, thickness, { isStatic: true });
  //     // Bottom boundary
  //     const bottom = Matter.Bodies.rectangle(bounds.width / 2, bounds.height + offset, bounds.width, thickness, { isStatic: true });
  //     // Left boundary
  //     const left = Matter.Bodies.rectangle(-offset, bounds.height / 2, thickness, bounds.height, { isStatic: true });
  //     // Right boundary
  //     const right = Matter.Bodies.rectangle(bounds.width + offset, bounds.height / 2, thickness, bounds.height, { isStatic: true });
    
  //     Matter.World.add(world, [top, bottom, left, right]);
  //   };

  //   setupBoundaries();
  //   const updateDiv = (body, element) => {
  //     if (element && element.style) {
  //       element.style.transform = `translate(${body.position.x - 40}px, ${body.position.y - 40}px) rotate(-30deg)`;
  //     }
      
  //   };
  //   window.addEventListener('resize', setupBoundaries);
  //   // updateGroundPosition();  // Initial setup


  //   // Your existing setup for bodies and events...

  //   const body1 = Matter.Bodies.rectangle(400, 200, 80, 80);
  //   const body2 = Matter.Bodies.rectangle(450, 150, 80, 80);
  //   const body3 = Matter.Bodies.rectangle(400, 100, 80, 80);

  //   Matter.World.add(world, [body1, body2, body3]);

  //   Matter.Events.on(engine, 'afterUpdate', () => {
  //     updateDiv(body1, divRef1.current);
  //     updateDiv(body2, divRef2.current);
  //     updateDiv(body3, divRef3.current);
  //   });

  //   Matter.Engine.run(engine);


  //   return () => {
  //     window.removeEventListener('resize', setupBoundaries);
  //     Matter.Engine.clear(engine);
  //   };
  // }, []);

  // return (
  //   <main ref={mainRef} className="flex min-h-screen flex-col items-center justify-between p-24">
  //     <div ref={sceneRef}>
  //       <div ref={divRef1} style={{ position: 'absolute', width: '280px', height: 'auto', transform: 'rotate(-30deg)', backgroundColor: 'blue',zIndex: 10 }}>The BSc Digital Arts Computing cohort present their degree show exhibition &apos;Fog Rot&apos;. Working at the hybrid edges between art and technology, its artists exhibit work spanning sculpture, multimedia installation, performance, durational art, immersive soundscapes, and more.</div>
  //       <div ref={divRef2} style={{ position: 'absolute', width: '380px', height: 'auto', backgroundColor: 'yellow', zIndex: 10 }}> &apos;Fog Rot&apos; explores cultural conditions of forgetting and the transience of memory in times of constant change and optimisation. By positioning &apos;Fog&apos; and &apos;Rot&apos; as an anagram for &apos;forgot&apos;, we suggest that we have even forgotten what it is to forget in the first place. Processes of memory decay can be paralleled to ecological processes of decomposition, where dampness grows, with slowness, moving in uncanny and ghostlike ways. What can slowness offer us in the face of ongoing change? </div>
  //       <div ref={divRef3} style={{ position: 'absolute', width: '380px', height: 'auto', backgroundColor: 'green', zIndex: 10 }}>&apos;Fog Rot&apos; questions the role of technology in contributing to accelerated narratives of catastrophe, asking how digital decay can offer a different language for understanding the material relationships between technology, art and the ways in which forgetting gives us the task of re-remembering what it is that we are trying to say.</div>
  
  //     </div>
  //   </main>
  // );
};

export default AboutFogRot;