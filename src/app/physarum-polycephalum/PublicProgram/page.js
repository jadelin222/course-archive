"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PanelTalkPage = () => {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const router = useRouter();
  const lastRenderTimeRef = useRef(0);
  const targetFPS = 60;
  const frameInterval = 1000 / targetFPS;
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [enlargedPhoto, setEnlargedPhoto] = useState(null);
  const [currentTourPhotoIndex, setCurrentTourPhotoIndex] = useState(0);
  const [galleryType, setGalleryType] = useState('talk'); // 'talk' or 'tour'

  // Array of photos for Panel Talk
  const talkPhotos = [
    'IMG_8095.jpg',
    'IMG_8136.jpg',
    'IMG_8141.jpg',
    'IMG_8148.jpg',
    'IMG_8155.jpg',
    'IMG_8159.jpg',
    'IMG_8173.jpg',
    'IMG_8236.jpg',
    'IMG_8248.jpg'
  ];

  // Array of photos for Panel Tour
  const tourPhotos = [
    '_70B2821-Enhanced-NR.jpg',
    '_70B2826-Enhanced-NR.jpg',
    '_70B2828-Enhanced-NR.jpg',
    '_70B2831-Enhanced-NR.jpg',
    '_70B2836-Enhanced-NR.jpg',
    '_70B2850-Enhanced-NR.jpg',
    '_70B2855-Enhanced-NR.jpg',
    '_70B2858-Enhanced-NR.jpg',
    '_70B2873-Enhanced-NR.jpg',
    '_70B2940-Enhanced-NR.jpg',
    '_70B2945-Enhanced-NR.jpg',
    '_70B2948-Enhanced-NR.jpg'
  ];

  // Auto-rotate photos every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % talkPhotos.length);
      setCurrentTourPhotoIndex((prev) => (prev + 1) % tourPhotos.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [talkPhotos.length, tourPhotos.length]);

  // Network structure and particles refs
  const netNodesRef = useRef([]);
  const netEdgesRef = useRef([]);
  const particlesRef = useRef([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set initial canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    window.addEventListener('resize', resizeCanvas);

    // Create network structure
    const netNodeCount = 20; // Fewer nodes for better performance
    if (netNodesRef.current.length === 0) {
      for (let i = 0; i < netNodeCount; i++) {
        netNodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
        });
      }
      
      // Generate sparse connections
      for (let i = 0; i < netNodeCount; i++) {
        for (let j = i + 1; j < netNodeCount; j++) {
          const dx = netNodesRef.current[i].x - netNodesRef.current[j].x;
          const dy = netNodesRef.current[i].y - netNodesRef.current[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          // Create fewer connections with larger minimum distance
          if (dist < Math.min(canvas.width, canvas.height) * 0.2 && Math.random() < 0.3) {
            netEdgesRef.current.push([i, j]);
          }
        }
      }
    }

    // Create particles
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 15; i++) { // Just 15 particles
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 3 + Math.random() * 3,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `rgba(${120 + Math.random() * 135}, ${120 + Math.random() * 135}, 255, ${0.3 + Math.random() * 0.4})`
        });
      }
    }

    function animate(currentTime) {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      // Throttle frame rate
      const deltaTime = currentTime - lastRenderTimeRef.current;
      if (deltaTime < frameInterval) return;
      lastRenderTimeRef.current = currentTime - (deltaTime % frameInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient - changed to green
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgb(15, 35, 20)');
      gradient.addColorStop(1, 'rgb(25, 45, 30)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      netNodesRef.current.forEach(node => {
        // Slow movement of nodes
        node.x += node.vx;
        node.y += node.vy;
        
        // Boundary check
        if (node.x < 0 || node.x > canvas.width) node.vx = -node.vx;
        if (node.y < 0 || node.y > canvas.height) node.vy = -node.vy;
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(100, 180, 255, 0.15)';
      ctx.lineWidth = 1;
      netEdgesRef.current.forEach(([i, j]) => {
        const nodeA = netNodesRef.current[i];
        const nodeB = netNodesRef.current[j];
        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);
        ctx.stroke();
      });

      // Draw nodes
      netNodesRef.current.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(150, 200, 255, 0.8)';
        ctx.fill();
      });

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check with wraparound
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle with glow
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
        animationFrameIdRef.current = null;
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
      
      {/* Enlarged Photo Modal */}
      {enlargedPhoto && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
          onClick={() => setEnlargedPhoto(null)}
        >
          <button 
            onClick={() => setEnlargedPhoto(null)}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              fontSize: '2.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '50%',
              cursor: 'pointer',
              zIndex: 2001
            }}
          >
            ×
          </button>
          <img 
            src={`/images/2025artworks/physarum-polycephalum/panel%20${galleryType}/gallery/${enlargedPhoto}`}
            alt="Enlarged photo"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              borderRadius: '0.5rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      
      {/* Photo Gallery Modal */}
      {showPhotoGallery && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <button 
            onClick={() => setShowPhotoGallery(false)}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              padding: '0.5rem 1rem',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
          <h2 style={{ 
            marginBottom: '2rem', 
            textAlign: 'center',
            color: galleryType === 'talk' ? 'rgb(200, 255, 220)' : 'rgb(120, 220, 140)',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}>
            {galleryType === 'talk' ? 'Panel Talk Photos' : 'Guided Tour Photos'}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
            maxWidth: '1200px',
            width: '100%'
          }}>
            {/* Display photos based on gallery type */}
            {(galleryType === 'talk' ? talkPhotos : tourPhotos).map((photo, index) => (
              <div key={index} style={{
                backgroundColor: galleryType === 'talk' ? 'rgba(20, 35, 30, 0.8)' : 'rgba(35, 30, 20, 0.8)',
                borderRadius: '1rem',
                overflow: 'hidden',
                border: galleryType === 'talk' ? '1px solid rgba(100, 180, 120, 0.3)' : '1px solid rgba(200, 180, 60, 0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => setEnlargedPhoto(photo)}
              >
                <img 
                  src={`/images/2025artworks/physarum-polycephalum/panel%20${galleryType}/gallery/${photo}`}
                  alt={`${galleryType === 'talk' ? 'Panel Talk' : 'Guided Tour'} Photo ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                />
                <div style={{
                  padding: '1rem',
                  textAlign: 'center',
                  color: galleryType === 'talk' ? 'rgb(200, 255, 220)' : 'rgb(120, 220, 140)'
                }}>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {galleryType === 'talk' ? 'Panel Talk' : 'Guided Tour'} Event - Photo {index + 1}
                  </p>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', opacity: 0.7 }}>
                    Click to enlarge
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '1.5rem'
      }}>
        {/* Large Cell Photo Display with rotating images - Panel Talk */}
        <div 
          onClick={() => {
            setGalleryType('talk');
            setShowPhotoGallery(true);
          }}
          style={{
            position: 'fixed',
            top: '50%',
            left: '20%',
            width: '360px',
            height: '360px',
            borderRadius: '50%',
            border: '4px solid rgba(100, 180, 120, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            boxShadow: '0 0 40px rgba(100, 180, 120, 0.2)',
            animation: 'cellSwim 25s ease-in-out infinite, cellPulse 6s ease-in-out infinite',
            zIndex: 10,
            transform: 'translate(-50%, -50%)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translate(-50%, -50%) scale(1.1)';
            e.target.style.boxShadow = '0 0 60px rgba(100, 180, 120, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translate(-50%, -50%) scale(1)';
            e.target.style.boxShadow = '0 0 40px rgba(100, 180, 120, 0.2)';
          }}
        >
          {/* Photo background */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundImage: `url(/images/2025artworks/physarum-polycephalum/panel%20talk/gallery/${talkPhotos[currentPhotoIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.8,
            transition: 'all 1s ease-in-out'
          }} />
          
          {/* Semi-transparent overlay */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, rgba(60, 120, 80, 0.25), rgba(40, 100, 60, 0.3))',
          }} />
          
          {/* Organic cell-like patterns */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 30% 40%, rgba(120, 200, 140, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(80, 160, 100, 0.15) 0%, transparent 40%)',
            animation: 'cellInnerMove 8s linear infinite'
          }} />
          
          {/* Additional organic layers */}
          <div style={{
            position: 'absolute',
            width: '80%',
            height: '80%',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 60% 30%, rgba(140, 220, 160, 0.08) 0%, transparent 60%)',
            animation: 'cellInnerMove2 10s linear infinite reverse'
          }} />
        </div>

        {/* Guided Tour Cell - Yellow theme */}
        <div 
          onClick={() => {
            setGalleryType('tour');
            setShowPhotoGallery(true);
          }}
          style={{
            position: 'fixed',
            top: '50%',
            left: '80%',
            width: '360px',
            height: '360px',
            borderRadius: '50%',
            border: '4px solid rgba(200, 180, 60, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            boxShadow: '0 0 40px rgba(200, 180, 60, 0.2)',
            animation: 'cellSwimTour 30s ease-in-out infinite, cellPulseTour 7s ease-in-out infinite',
            zIndex: 10,
            transform: 'translate(-50%, -50%)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translate(-50%, -50%) scale(1.1)';
            e.target.style.boxShadow = '0 0 60px rgba(200, 180, 60, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translate(-50%, -50%) scale(1)';
            e.target.style.boxShadow = '0 0 40px rgba(200, 180, 60, 0.2)';
          }}
        >
          {/* Photo background */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundImage: `url(/images/2025artworks/physarum-polycephalum/panel%20tour/gallery/${tourPhotos[currentTourPhotoIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.8,
            transition: 'all 1s ease-in-out'
          }} />
          
          {/* Semi-transparent overlay - Yellow theme */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, rgba(180, 160, 60, 0.25), rgba(200, 180, 80, 0.3))',
          }} />
          
          {/* Organic cell-like patterns - Yellow theme */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 30% 40%, rgba(220, 200, 100, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(200, 180, 80, 0.15) 0%, transparent 40%)',
            animation: 'cellInnerMove 9s linear infinite'
          }} />
          
          {/* Additional organic layers - Yellow theme */}
          <div style={{
            position: 'absolute',
            width: '80%',
            height: '80%',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 60% 30%, rgba(240, 220, 120, 0.08) 0%, transparent 60%)',
            animation: 'cellInnerMove2 11s linear infinite reverse'
          }} />
        </div>

        {/* Cell label text below Panel Talk cell */}
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '20%',
          color: 'rgba(255, 220, 100, 0.8)',
          fontSize: '0.9rem',
          fontWeight: '500',
          animation: 'cellSwim 25s ease-in-out infinite',
          textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
          zIndex: 11,
          transform: 'translate(-50%, 220px)',
          pointerEvents: 'none',
          textAlign: 'center'
        }}>
          Panel Talk Photos
        </div>

        {/* Cell label text below Guided Tour cell */}
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '80%',
          color: 'rgba(100, 200, 120, 0.8)',
          fontSize: '0.9rem',
          fontWeight: '500',
          animation: 'cellSwimTour 30s ease-in-out infinite',
          textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
          zIndex: 11,
          transform: 'translate(-50%, 220px)',
          pointerEvents: 'none',
          textAlign: 'center'
        }}>
          Guided Tour Photos
        </div>

        {/* Click me text that follows the Panel Talk cell */}
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '20%',
          color: 'rgba(200, 255, 220, 0.9)',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          animation: 'textFollow 25s ease-in-out infinite, textFloat 3s ease-in-out infinite',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          zIndex: 11,
          transform: 'translate(200px, -50%)',
          pointerEvents: 'none'
        }}>
          Click me →
        </div>

        {/* Click me text that follows the Guided Tour cell */}
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '80%',
          color: 'rgba(255, 240, 120, 0.9)',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          animation: 'textFollowTour 30s ease-in-out infinite, textFloat 3s ease-in-out infinite',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          zIndex: 11,
          transform: 'translate(-250px, -50%)',
          pointerEvents: 'none'
        }}>
          Click me →
        </div>

        <div style={{
          backgroundColor: 'rgba(20, 35, 30, 0.9)',
          backdropFilter: 'blur(8px)',
          borderRadius: '0.75rem',
          maxWidth: '64rem',
          padding: '2rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
          color: 'white',
          border: '1px solid rgba(100, 180, 120, 0.2)',
          marginTop: '2rem'
        }}>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            textAlign: 'center',
            color: 'rgb(200, 255, 220)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>Panel Talk</h1>
          
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'rgb(160, 220, 180)'
            }}>Event Details</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>Join us for an engaging panel discussion exploring the fascinating intersections of biology, technology, and art through the lens of Physarum Polycephalum.</p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginTop: '1.5rem'
            }}>
              <div style={{
                backgroundColor: 'rgba(40, 80, 60, 0.4)',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(100, 180, 120, 0.3)'
              }}>
                <h3 style={{
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                  marginBottom: '0.5rem',
                  color: 'rgb(160, 220, 180)'
                }}>Date & Time</h3>
                <p>Saturday 24th May</p>
                <p>1pm</p>
              </div>
              
              <div style={{
                backgroundColor: 'rgba(40, 80, 60, 0.4)',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(100, 180, 120, 0.3)'
              }}>
                <h3 style={{
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                  marginBottom: '0.5rem',
                  color: 'rgb(160, 220, 180)'
                }}>Location</h3>
                <p>The Ugly Duck</p>
                <p>Bermondsey, SE1 3PL</p>
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'rgb(160, 220, 180)'
            }}>Featured Speakers</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                backgroundColor: 'rgba(40, 80, 60, 0.3)',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(100, 180, 120, 0.2)'
              }}>
                <Link href="/physarum-polycephalum/PublicProgram/sophi-gardner" style={{
                  color: 'white',
                  textDecoration: 'none'
                }}>
                  <h3 style={{ 
                    fontWeight: 'bold', 
                    fontSize: '1.25rem',
                    cursor: 'pointer',
                    borderBottom: '1px solid transparent',
                    transition: 'border-bottom-color 0.2s',
                    color: 'rgb(200, 255, 220)'
                  }}
                  onMouseEnter={(e) => e.target.style.borderBottomColor = 'rgb(160, 220, 180)'}
                  onMouseLeave={(e) => e.target.style.borderBottomColor = 'transparent'}
                  >Sophi Gardner</h3>
                </Link>
                <p style={{ color: 'rgb(220, 240, 230)', marginTop: '0.5rem' }}>flow + echo - blends natural, sculptural and technological mediums to understand and re-enchant our connection in and to the wider natural world.</p>
              </div>
              
              <div style={{
                backgroundColor: 'rgba(40, 80, 60, 0.3)',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(100, 180, 120, 0.2)'
              }}>
                <Link href="/physarum-polycephalum/PublicProgram/andy-lomas" style={{
                  color: 'white',
                  textDecoration: 'none'
                }}>
                  <h3 style={{ 
                    fontWeight: 'bold', 
                    fontSize: '1.25rem',
                    cursor: 'pointer',
                    borderBottom: '1px solid transparent',
                    transition: 'border-bottom-color 0.2s',
                    color: 'rgb(200, 255, 220)'
                  }}
                  onMouseEnter={(e) => e.target.style.borderBottomColor = 'rgb(160, 220, 180)'}
                  onMouseLeave={(e) => e.target.style.borderBottomColor = 'transparent'}
                  >Andy Lomas</h3>
                </Link>
                <p style={{ color: 'rgb(220, 240, 230)', marginTop: '0.5rem' }}>Computational artist, mathematician and Emmy award winning supervisor of computer generated effects.</p>
              </div>
              
              <div style={{
                backgroundColor: 'rgba(40, 80, 60, 0.3)',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(100, 180, 120, 0.2)'
              }}>
                <Link href="/physarum-polycephalum/PublicProgram/heather-barnett" style={{
                  color: 'white',
                  textDecoration: 'none'
                }}>
                  <h3 style={{ 
                    fontWeight: 'bold', 
                    fontSize: '1.25rem',
                    cursor: 'pointer',
                    borderBottom: '1px solid transparent',
                    transition: 'border-bottom-color 0.2s',
                    color: 'rgb(200, 255, 220)'
                  }}
                  onMouseEnter={(e) => e.target.style.borderBottomColor = 'rgb(160, 220, 180)'}
                  onMouseLeave={(e) => e.target.style.borderBottomColor = 'transparent'}
                  >Heather Barnett</h3>
                </Link>
                <p style={{ color: 'rgb(220, 240, 230)', marginTop: '0.5rem' }}>Artist, researcher and educator working with living systems, exploring technologies and playful pedagogies to explore how we observe and influence interspecies ecologies.</p>
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Link href="/physarum-polycephalum" style={{
              display: 'inline-block',
              backgroundColor: 'rgba(60, 120, 80, 0.8)',
              color: 'white',
              fontWeight: 'bold',
              padding: '0.5rem 1.5rem',
              borderRadius: '9999px',
              transition: 'background-color 150ms',
              textDecoration: 'none',
              border: '1px solid rgba(100, 180, 120, 0.5)'
            }}>
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        @keyframes cellSwim {
          0% { 
            top: 50%; 
            left: 20%; 
          }
          12.5% { 
            top: 25%; 
            left: 35%; 
          }
          25% { 
            top: 30%; 
            left: 70%; 
          }
          37.5% { 
            top: 60%; 
            left: 80%; 
          }
          50% { 
            top: 75%; 
            left: 60%; 
          }
          62.5% { 
            top: 80%; 
            left: 25%; 
          }
          75% { 
            top: 65%; 
            left: 15%; 
          }
          87.5% { 
            top: 35%; 
            left: 10%; 
          }
          100% { 
            top: 50%; 
            left: 20%; 
          }
        }
        
        @keyframes textFollow {
          0% { 
            top: 50%; 
            left: 20%; 
            transform: translate(200px, -50%);
          }
          12.5% { 
            top: 25%; 
            left: 35%; 
            transform: translate(200px, -50%);
          }
          25% { 
            top: 30%; 
            left: 70%; 
            transform: translate(-250px, -50%);
          }
          37.5% { 
            top: 60%; 
            left: 80%; 
            transform: translate(-250px, -50%);
          }
          50% { 
            top: 75%; 
            left: 60%; 
            transform: translate(-250px, -50%);
          }
          62.5% { 
            top: 80%; 
            left: 25%; 
            transform: translate(200px, -50%);
          }
          75% { 
            top: 65%; 
            left: 15%; 
            transform: translate(200px, -50%);
          }
          87.5% { 
            top: 35%; 
            left: 10%; 
            transform: translate(200px, -50%);
          }
          100% { 
            top: 50%; 
            left: 20%; 
            transform: translate(200px, -50%);
          }
        }
        
        @keyframes cellPulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.02);
          }
        }
        
        @keyframes cellInnerMove {
          0% { 
            transform: rotate(0deg) scale(1);
          }
          25% { 
            transform: rotate(90deg) scale(1.05);
          }
          50% { 
            transform: rotate(180deg) scale(0.98);
          }
          75% { 
            transform: rotate(270deg) scale(1.03);
          }
          100% { 
            transform: rotate(360deg) scale(1);
          }
        }
        
        @keyframes cellInnerMove2 {
          0% { 
            transform: rotate(0deg) translateX(5px);
          }
          25% { 
            transform: rotate(-90deg) translateX(-3px);
          }
          50% { 
            transform: rotate(-180deg) translateX(7px);
          }
          75% { 
            transform: rotate(-270deg) translateX(-2px);
          }
          100% { 
            transform: rotate(-360deg) translateX(5px);
          }
        }
        
        @keyframes textFloat {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-8px);
          }
        }
        
        @keyframes cellSwimTour {
          0% { 
            top: 50%; 
            left: 80%; 
          }
          10% { 
            top: 30%; 
            left: 70%; 
          }
          20% { 
            top: 20%; 
            left: 50%; 
          }
          30% { 
            top: 40%; 
            left: 30%; 
          }
          40% { 
            top: 70%; 
            left: 20%; 
          }
          50% { 
            top: 80%; 
            left: 40%; 
          }
          60% { 
            top: 70%; 
            left: 65%; 
          }
          70% { 
            top: 40%; 
            left: 85%; 
          }
          80% { 
            top: 25%; 
            left: 85%; 
          }
          90% { 
            top: 35%; 
            left: 75%; 
          }
          100% { 
            top: 50%; 
            left: 80%; 
          }
        }
        
        @keyframes textFollowTour {
          0% { 
            top: 50%; 
            left: 80%; 
            transform: translate(-250px, -50%);
          }
          10% { 
            top: 30%; 
            left: 70%; 
            transform: translate(-250px, -50%);
          }
          20% { 
            top: 20%; 
            left: 50%; 
            transform: translate(200px, -50%);
          }
          30% { 
            top: 40%; 
            left: 30%; 
            transform: translate(200px, -50%);
          }
          40% { 
            top: 70%; 
            left: 20%; 
            transform: translate(200px, -50%);
          }
          50% { 
            top: 80%; 
            left: 40%; 
            transform: translate(200px, -50%);
          }
          60% { 
            top: 70%; 
            left: 65%; 
            transform: translate(-250px, -50%);
          }
          70% { 
            top: 40%; 
            left: 85%; 
            transform: translate(-250px, -50%);
          }
          80% { 
            top: 25%; 
            left: 85%; 
            transform: translate(-250px, -50%);
          }
          90% { 
            top: 35%; 
            left: 75%; 
            transform: translate(-250px, -50%);
          }
          100% { 
            top: 50%; 
            left: 80%; 
            transform: translate(-250px, -50%);
          }
        }
        
        @keyframes cellPulseTour {
          0%, 100% { 
            box-shadow: 0 0 40px rgba(200, 180, 60, 0.2), inset 0 0 40px rgba(200, 180, 60, 0.1); 
          }
          50% { 
            box-shadow: 0 0 80px rgba(200, 180, 60, 0.4), inset 0 0 80px rgba(200, 180, 60, 0.2); 
          }
        }
      `}</style>
    </>
  );
};

export default PanelTalkPage; 