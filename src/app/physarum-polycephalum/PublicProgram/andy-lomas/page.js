"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const AndyLomasPage = () => {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    window.addEventListener('resize', resizeCanvas);

    // Simple animated background
    const particles = [];
    for (let i = 0; i < 10; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 2 + Math.random() * 4,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: `rgba(${100 + Math.random() * 155}, ${150 + Math.random() * 105}, 255, ${0.4 + Math.random() * 0.3})`
      });
    }

    function animate() {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgb(15, 35, 20)');
      gradient.addColorStop(1, 'rgb(25, 45, 30)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        ctx.save();
        const glow = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        glow.addColorStop(0, particle.color);
        glow.addColorStop(1, 'rgba(120, 120, 255, 0)');
        
        ctx.globalCompositeOperation = 'lighter';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
        ctx.restore();
      });
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '1.5rem'
      }}>
        <div style={{
          backgroundColor: 'rgba(20, 35, 30, 0.9)',
          backdropFilter: 'blur(8px)',
          borderRadius: '0.75rem',
          maxWidth: '50rem',
          padding: '2rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          color: 'white'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textAlign: 'center',
            color: 'rgb(191, 219, 254)'
          }}>Andy Lomas</h1>
          
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '2rem',
            textAlign: 'center',
            color: 'rgb(147, 197, 253)'
          }}>Computational Artist & Mathematician</h2>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '2rem' 
          }}>
            <img 
              src="/images/2025artworks/physarum-polycephalum/panel talk/andylomas_pic_crop_bw_1.jpg"
              alt="Andy Lomas"
              style={{
                width: '300px',
                height: 'auto',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                objectFit: 'cover'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '2rem', lineHeight: '1.7' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Andy Lomas is a computational artist, mathematician and Emmy award winning supervisor of computer generated effects. His art work explores how complex sculptural forms can be created emergently by simulating growth processes.
            </p>
            
            <p style={{ marginBottom: '1.5rem' }}>
              Inspired by the work of Alan Turing, D'Arcy Thompson and Ernst Haeckel, he has found a computational art practice that exists at the boundary between art and science.
            </p>
            
            <p style={{ marginBottom: '1.5rem' }}>
              He has had work exhibited internationally, including at the Pompidou Centre, V&A, the Royal Society, SIGGRAPH, Japan Media Arts Festival, Ars Electronica Festival, the Science Museum and the ZKM. He also has work in the collections at the V&A, the Science Museum and the ZKM, Thompson Art Fund Collection. In 2014 his work Cellular Forms won The Lumen Prize Gold Award.
            </p>
            
            <p style={{ marginBottom: '1.5rem' }}>
              He is currently based in London, developing his art practice as well as working as a Visiting Research Fellow at Goldsmiths, University of London.
            </p>
            
            <div style={{
              backgroundColor: 'rgba(30, 64, 175, 0.2)',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              marginTop: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: 'rgb(147, 197, 253)'
              }}>Achievements & Collections</h3>
              <ul style={{
                listStyle: 'disc',
                marginLeft: '1.5rem',
                lineHeight: '1.8'
              }}>
                <li>Emmy Award Winner for Computer Generated Effects</li>
                <li>Lumen Prize Gold Award (2014) - Cellular Forms</li>
                <li>Works in V&A, Science Museum & ZKM Collections</li>
                <li>Visiting Research Fellow at Goldsmiths, University of London</li>
                <li>Exhibitions at Pompidou Centre, SIGGRAPH, Ars Electronica</li>
              </ul>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap' 
          }}>
            <Link href="/physarum-polycephalum/PublicProgram" style={{
              display: 'inline-block',
              backgroundColor: 'rgb(29, 78, 216)',
              color: 'white',
              fontWeight: 'bold',
              padding: '0.5rem 1.5rem',
              borderRadius: '9999px',
              transition: 'background-color 150ms',
              textDecoration: 'none'
            }}>
              Back to Panel Talk
            </Link>
            
            <Link href="/physarum-polycephalum" style={{
              display: 'inline-block',
              backgroundColor: 'rgba(29, 78, 216, 0.3)',
              border: '1px solid rgb(29, 78, 216)',
              color: 'white',
              fontWeight: 'bold',
              padding: '0.5rem 1.5rem',
              borderRadius: '9999px',
              transition: 'background-color 150ms',
              textDecoration: 'none'
            }}>
              Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AndyLomasPage; 