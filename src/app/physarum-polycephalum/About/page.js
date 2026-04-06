"use client";
import { useState, useEffect, useRef } from 'react';

export default function AboutPage() {
  const images = [
    '/images/2025artworks/physarum-polycephalum/about0.png',
    '/images/2025artworks/physarum-polycephalum/about1.png',
    '/images/2025artworks/physarum-polycephalum/about2.png',
    '/images/2025artworks/physarum-polycephalum/about3.png',
  ];
  const [page, setPage] = useState(0); // 0: first two images, 1: last two images
  const [zoomImg, setZoomImg] = useState(null); // Currently enlarged image index

  // Flip animation style
  const [isFlipping, setIsFlipping] = useState(false);
  const handleFlip = (dir) => {
    setIsFlipping(true);
    setTimeout(() => {
      setPage(p => (dir === 'right' ? 1 : 0));
      setIsFlipping(false);
    }, 400); // Animation duration
  };

  return (
    <main style={{ color: 'white', padding: 40, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Soft purple-pink radial gradient background */}
      <div style={{
        position: 'absolute',
        zIndex: 0,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 60% 40%, rgba(200,120,255,0.22) 0%, rgba(255,180,240,0.18) 40%, rgba(120,80,180,0.12) 100%)',
        pointerEvents: 'none',
      }} />
      <h1 style={{ position: 'relative', zIndex: 1 }}></h1>
      <div style={{ width: '100%', textAlign: 'center', marginBottom: 16, position: 'relative', zIndex: 2 }}>
        <span style={{ fontSize: 24, color: '#e0aaff', letterSpacing: 1, textShadow: '0 2px 8px #0008', fontWeight: 500 }}>
          click the image
        </span>
      </div>
      <div style={{ display: 'flex', gap: 64, margin: '64px 0', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        {/* Left arrow */}
        <button
          onClick={() => !isFlipping && handleFlip('left')}
          disabled={page === 0 || isFlipping}
          style={{
            background: 'rgba(30,30,60,0.18)',
            border: 'none',
            color: page === 0 ? '#aaa' : '#e0aaff',
            fontSize: 36,
            borderRadius: '50%',
            width: 56,
            height: 56,
            cursor: page === 0 ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px #0003',
            transition: 'background 0.2s',
            alignSelf: 'center',
            marginRight: 24,
          }}
        >&#8592;</button>
        {/* Two cells */}
        {[0, 1].map(i => {
          const imgIdx = page * 2 + i;
          return (
            <div
              key={imgIdx}
              style={{
                width: 600,
                height: 600,
                borderRadius: 56,
                background: 'radial-gradient(circle at 60% 40%, #e0aaff 0%, #ffb3e6 80%, #fff0 100%)',
                boxShadow: '0 0 64px 0 #e0aaff44, 0 0 32px 0 #ffb3e644',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transition: 'transform 0.4s cubic-bezier(.4,2,.6,1)',
                transform: isFlipping ? `rotateY(${page === 0 ? 90 : -90}deg)` : 'none',
                backfaceVisibility: 'hidden',
                cursor: 'pointer',
              }}
              onClick={() => setZoomImg(imgIdx)}
            >
              <img
                src={images[imgIdx]}
                alt={`about${imgIdx}`}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 40, display: 'block', margin: 'auto' }}
              />
            </div>
          );
        })}
        {/* Right arrow */}
        <button
          onClick={() => !isFlipping && handleFlip('right')}
          disabled={page === 1 || isFlipping}
          style={{
            background: 'rgba(30,30,60,0.18)',
            border: 'none',
            color: page === 1 ? '#aaa' : '#e0aaff',
            fontSize: 36,
            borderRadius: '50%',
            width: 56,
            height: 56,
            cursor: page === 1 ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px #0003',
            transition: 'background 0.2s',
            alignSelf: 'center',
            marginLeft: 24,
          }}
        >&#8594;</button>
      </div>
      {/* Enlarged image overlay */}
      {zoomImg !== null && (
        <div
          onClick={() => setZoomImg(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(30,20,40,0.88)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
          }}
        >
          <img
            src={images[zoomImg]}
            alt={`about${zoomImg}`}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: 32,
              boxShadow: '0 0 64px #e0aaffcc, 0 0 32px #ffb3e6cc',
              background: '#fff',
              transition: 'all 0.3s',
            }}
          />
        </div>
      )}
      <FloatingCells />
    </main>
  );
}

function FloatingCells() {
  const cellTexts = [
    ...Array(3).fill('2025 degree show'),
    ...Array(3).fill('physarum-polycephalum'),
  ];
  const [cells, setCells] = useState(() => cellTexts.map((text, i) => ({
    id: i,
    text,
    x: Math.random() * 0.7 + 0.1,
    y: Math.random() * 0.6 + 0.1,
    vx: (Math.random() - 0.5) * 0.0006,
    vy: (Math.random() - 0.5) * 0.0006,
    radius: text === ' 2025 degree show' ? 54 : 74,
    color: text === '2925 degree show' ? 'rgba(180,120,255,0.7)' : 'rgba(255,180,240,0.7)',
    border: text === '2025 degree show' ? 'rgba(120,180,255,0.7)' : 'rgba(255,120,220,0.7)',
    splitting: false,
  })));
  const containerRef = useRef(null);

  useEffect(() => {
    let animationId;
    function animate() {
      setCells(prevCells => {
        let newCells = prevCells.map(cell => {
          let { x, y, vx, vy, radius } = cell;
          x += vx;
          y += vy;
          // Velocity damping to prevent increasing speed
          vx *= 0.985;
          vy *= 0.985;
          // Boundary bounce
          if (x < 0.05) { x = 0.05; vx = Math.abs(vx); }
          if (x > 0.95) { x = 0.95; vx = -Math.abs(vx); }
          if (y < 0.05) { y = 0.05; vy = Math.abs(vy); }
          if (y > 0.85) { y = 0.85; vy = -Math.abs(vy); }
          return { ...cell, x, y, vx, vy };
        });
        // Collision detection
        for (let i = 0; i < newCells.length; i++) {
          for (let j = i + 1; j < newCells.length; j++) {
            const a = newCells[i], b = newCells[j];
            const dx = (a.x - b.x) * window.innerWidth;
            const dy = (a.y - b.y) * window.innerHeight;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < a.radius + b.radius) {
              // Repel
              const angle = Math.atan2(dy, dx);
              const force = 0.0015;
              newCells[i].vx += Math.cos(angle) * force;
              newCells[i].vy += Math.sin(angle) * force;
              newCells[j].vx -= Math.cos(angle) * force;
              newCells[j].vy -= Math.sin(angle) * force;
              // Merge/reorganize (optional: here we only repel without merging)
            }
          }
        }
        // Splitting logic (random splitting, max 12)
        if (newCells.length < 12 && Math.random() < 0.002) {
          const idx = Math.floor(Math.random() * newCells.length);
          const c = newCells[idx];
          newCells.push({
            ...c,
            id: Date.now() + Math.random(),
            x: Math.min(0.9, Math.max(0.1, c.x + (Math.random() - 0.5) * 0.08)),
            y: Math.min(0.8, Math.max(0.1, c.y + (Math.random() - 0.5) * 0.08)),
            vx: (Math.random() - 0.5) * 0.0006,
            vy: (Math.random() - 0.5) * 0.0006,
            splitting: true,
          });
        }
        return newCells;
      });
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 1 }}>
      {cells.map(cell => (
        <div
          key={cell.id}
          style={{
            position: 'absolute',
            left: `calc(${cell.x * 100}vw - ${cell.radius}px)` ,
            top: `calc(${cell.y * 100}vh - ${cell.radius}px)` ,
            width: cell.radius * 2,
            height: cell.radius * 2,
            borderRadius: '50%',
            border: `3.5px solid ${cell.border}`,
            boxShadow: `0 0 32px 0 ${cell.color}, 0 0 64px 0 ${cell.color}`,
            background: 'radial-gradient(circle at 60% 40%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 80%, rgba(255,255,255,0) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: cell.text.length > 15 ? 16 : 20,
            color: cell.text.length > 15 ? '#e0aaff' : '#ffb3e6',
            textShadow: '0 2px 12px #fff8, 0 0 8px #e0aaff',
            pointerEvents: 'none',
            userSelect: 'none',
            transition: cell.splitting ? 'transform 0.4s cubic-bezier(.4,2,.6,1)' : undefined,
            transform: cell.splitting ? 'scale(1.2)' : 'none',
            opacity: 0.92,
            backdropFilter: 'blur(2px)',
          }}
        >
          <span style={{
            display: 'block',
            width: '80%',
            textAlign: 'center',
            wordBreak: 'break-word',
            lineHeight: 1.2,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: '2px 6px',
            pointerEvents: 'none',
          }}>{cell.text}</span>
        </div>
      ))}
    </div>
  );
} 