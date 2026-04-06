"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import cardData from '../../data/physarum-polycephalum/cardData';
import NavItem from '../../components/navItem';

const OrganicBackground = () => {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const [activeLink, setActiveLink] = useState(null);
  const navigationCellsRef = useRef([]);
  const cellsRef = useRef([]);
  const [cellPositions, setCellPositions] = useState([]);
  const router = useRouter();

  // Add requestAnimationFrame throttling
  const lastRenderTimeRef = useRef(0);
  const targetFPS = 60;
  const frameInterval = 1000 / targetFPS;

  // New: Static network structure and light points ref, placed at the component top
  const netNodesRef = useRef([]);
  const netEdgesRef = useRef([]);
  const lightParticlesRef = useRef([]);

  // New: Static mycelium structure ref
  const myceliumStructuresRef = useRef([]);

  const textBoxRef = useRef(null);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const cells = navigationCellsRef.current;
      const currentIndex = cells.findIndex(cell => cell.link === activeLink);
      
      switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = currentIndex < cells.length - 1 ? currentIndex + 1 : 0;
          setActiveLink(cells[nextIndex].link);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : cells.length - 1;
          setActiveLink(cells[prevIndex].link);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (activeLink) {
            router.push(activeLink);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLink, router]);

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

    // --- Static Network Structure ---
    // Only generate once
    const netNodeCount = 32;
    if (netNodesRef.current.length === 0) {
      for (let i = 0; i < netNodeCount; i++) {
        netNodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        });
      }
      // Generate connections
      for (let i = 0; i < netNodeCount; i++) {
        for (let j = i + 1; j < netNodeCount; j++) {
          const dx = netNodesRef.current[i].x - netNodesRef.current[j].x;
          const dy = netNodesRef.current[i].y - netNodesRef.current[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < Math.min(canvas.width, canvas.height) * 0.28 && Math.random() < 0.45) {
            // Organic curve control points
            const mx = (netNodesRef.current[i].x + netNodesRef.current[j].x) / 2 + (Math.random() - 0.5) * 24;
            const my = (netNodesRef.current[i].y + netNodesRef.current[j].y) / 2 + (Math.random() - 0.5) * 24;
            netEdgesRef.current.push([i, j, mx, my]);
          }
        }
      }
    }

    // --- Light Points ---
    // One light point per connection, flowing back and forth
    if (lightParticlesRef.current.length === 0) {
      // Only generate light points on some connections, fewer in number
      const edgeIndices = netEdgesRef.current.length > 0 ? Array.from({length: netEdgesRef.current.length}, (_, i) => i) : [];
      // Randomly select some connections
      const pickCount = Math.min(14, edgeIndices.length); // 14 light points
      for (let k = 0; k < pickCount; k++) {
        const edgeIdx = edgeIndices.splice(Math.floor(Math.random() * edgeIndices.length), 1)[0];
        const [i, j, mx, my] = netEdgesRef.current[edgeIdx];
        lightParticlesRef.current.push({
          edge: [i, j, mx, my],
          t: Math.random(),
          dir: Math.random() > 0.5 ? 1 : -1, // 1: forward, -1: backward
          speed: 0.003 + Math.random() * 0.002 // slow speed
        });
      }
    }

    // --- Static radial mycelium structure ---
    // Only generate once
    if (myceliumStructuresRef.current.length === 0) {
      const centerCount = 7 + Math.floor(Math.random() * 3); // 7~9 center points
      const mainCount = 18 + Math.floor(Math.random() * 10); // 18~28 rays
      const mainLength = Math.max(canvas.width, canvas.height) * (0.7 + Math.random() * 0.5);
      const colorSet = [
        ['rgba(120,180,255,0.28)', 'rgba(180,120,255,0.22)', 'rgba(200,120,255,0.22)'],
        ['rgba(180,120,255,0.22)', 'rgba(120,180,255,0.28)', 'rgba(200,120,255,0.22)'],
        ['rgba(200,120,255,0.22)', 'rgba(120,180,255,0.28)', 'rgba(180,120,255,0.22)'],
      ];
      // Distribute center points only on both sides of the canvas
      for (let c = 0; c < centerCount; c++) {
        let centerX, centerY;
        // Randomly decide left or right side
        if (Math.random() < 0.5) {
          // Left side 0.03~0.13
          centerX = canvas.width * (0.03 + Math.random() * 0.10);
        } else {
          // Right side 0.87~0.97
          centerX = canvas.width * (0.87 + Math.random() * 0.10);
        }
        centerY = canvas.height * (0.18 + Math.random() * 0.64); // Top-bottom distribution
        const lines = [];
        for (let i = 0; i < mainCount; i++) {
          const mainAngle = (i / mainCount) * Math.PI * 2;
          const color = colorSet[i % colorSet.length];
          const endX = centerX + Math.cos(mainAngle) * mainLength;
          const endY = centerY + Math.sin(mainAngle) * mainLength;
          lines.push({x1: centerX, y1: centerY, x2: endX, y2: endY, color, width: 1.5 + Math.random() * 0.7, centerX, centerY});
        }
        myceliumStructuresRef.current.push({lines, centerX, centerY});
      }
      // Add one center point in each of the four directions (top, bottom, left, right) that only shows explosion glow
      const glowCenters = [
        { x: canvas.width / 2, y: canvas.height * 0.08 }, // Top
        { x: canvas.width / 2, y: canvas.height * 0.92 }, // Bottom
        { x: canvas.width * 0.08, y: canvas.height / 2 }, // Left
        { x: canvas.width * 0.92, y: canvas.height / 2 }, // Right
      ];
      glowCenters.forEach(pos => {
        myceliumStructuresRef.current.push({lines: [], centerX: pos.x, centerY: pos.y, onlyGlow: true});
      });
    }

    // Text box width and position
    const textBoxWidth = Math.min(800, canvas.width * 0.9);
    const textBoxHeight = 32 + 36 + 32 + 36 + 120; // Estimated height (can be adjusted based on actual content)
    const textBoxX = canvas.width / 2 - textBoxWidth / 2;
    const textBoxY = 36;
    const textBoxBottom = textBoxY + textBoxHeight;
    const navRadius = Math.max(48, Math.min(canvas.width, canvas.height) * 0.06);
    const navBg = 'rgba(30, 30, 60, 0.82)';
    const navTextColor = 'rgba(255,220,255,0.92)';
    // All four cells distributed on the left side of the text box, arranged vertically
    const sideGap = 48; // Horizontal distance between cells and text box
    const leftX = textBoxX - navRadius - sideGap;
    const offsetY = 60; // Overall downward shift
    const spread = textBoxHeight * 1.6; // Extend the distribution interval
    const navYs = [0, 0.5, 1].map(f => textBoxY + offsetY + spread * f);
    const navCells = [
      {
        get x() { return leftX + Math.cos(Date.now() * 0.001 + 0) * 18; },
        get y() { return navYs[0] + Math.sin(Date.now() * 0.001 + 0) * 12; },
        radius: navRadius,
        text: 'Artworks',
        link: '/physarum-polycephalum/Artworks',
        isHovered: false,
        update: function() {},
        draw: function(ctx) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = navBg;
          ctx.shadowColor = 'rgba(180,120,255,0.18)';
          ctx.shadowBlur = this.isHovered ? 32 : 16;
          ctx.fill();
          ctx.restore();
          ctx.save();
          ctx.font = `bold ${this.radius * 0.48}px 'Montserrat', 'Arial', sans-serif`;
          ctx.fillStyle = navTextColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowColor = this.isHovered ? 'rgba(255,120,220,0.22)' : 'rgba(0,0,0,0.18)';
          ctx.shadowBlur = this.isHovered ? 12 : 4;
          ctx.fillText(this.text, this.x, this.y);
          ctx.restore();
        },
      },
      {
        get x() { return leftX + Math.cos(Date.now() * 0.001 + 1) * 18; },
        get y() { return navYs[1] + Math.sin(Date.now() * 0.001 + 1) * 12; },
        radius: navRadius,
        text: 'Panel Talk',
        link: '/physarum-polycephalum/PublicProgram',
        isHovered: false,
        update: function() {},
        draw: function(ctx) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = navBg;
          ctx.shadowColor = 'rgba(200,120,255,0.18)';
          ctx.shadowBlur = this.isHovered ? 32 : 16;
          ctx.fill();
          ctx.restore();
          ctx.save();
          ctx.font = `bold ${this.radius * 0.32}px 'Montserrat', 'Arial', sans-serif`;
          ctx.fillStyle = navTextColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowColor = this.isHovered ? 'rgba(200,120,255,0.22)' : 'rgba(0,0,0,0.18)';
          ctx.shadowBlur = this.isHovered ? 12 : 4;
          ctx.fillText(this.text, this.x, this.y);
          ctx.restore();
        },
      },
      {
        get x() { return leftX + Math.cos(Date.now() * 0.001 + 2) * 18; },
        get y() { return navYs[2] + Math.sin(Date.now() * 0.001 + 2) * 12; },
        radius: navRadius,
        text: 'About',
        link: '/physarum-polycephalum/About',
        isHovered: false,
        update: function() {},
        draw: function(ctx) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = navBg;
          ctx.shadowColor = 'rgba(120,180,255,0.18)';
          ctx.shadowBlur = this.isHovered ? 32 : 16;
          ctx.fill();
          ctx.restore();
          ctx.save();
          ctx.font = `bold ${this.radius * 0.38}px 'Montserrat', 'Arial', sans-serif`;
          ctx.fillStyle = navTextColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowColor = this.isHovered ? 'rgba(120,180,255,0.22)' : 'rgba(0,0,0,0.18)';
          ctx.shadowBlur = this.isHovered ? 12 : 4;
          ctx.fillText(this.text, this.x, this.y);
          ctx.restore();
        },
      },
    ];
    navigationCellsRef.current = navCells;

    function animate(currentTime) {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Throttle frame rate
      const deltaTime = currentTime - lastRenderTimeRef.current;
      if (deltaTime < frameInterval) return;
      lastRenderTimeRef.current = currentTime - (deltaTime % frameInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Background ---
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgb(18, 18, 28)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // --- Draw radial main rays and explosion glow ---
      myceliumStructuresRef.current.forEach(mycelium => {
        // Explosion glow
        ctx.save();
        const grad = ctx.createRadialGradient(mycelium.centerX, mycelium.centerY, 0, mycelium.centerX, mycelium.centerY, 90);
        grad.addColorStop(0, 'rgba(255,120,220,0.18)');
        grad.addColorStop(0.4, 'rgba(255,180,240,0.12)');
        grad.addColorStop(1, 'rgba(255,180,240,0)');
        ctx.globalCompositeOperation = 'lighter';
        ctx.beginPath();
        ctx.arc(mycelium.centerX, mycelium.centerY, 90, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
        // Main rays
        if (!mycelium.onlyGlow) {
          mycelium.lines.forEach(line => {
            const grad = ctx.createLinearGradient(line.x1, line.y1, line.x2, line.y2);
            grad.addColorStop(0, line.color[0]);
            grad.addColorStop(0.5, line.color[1]);
            grad.addColorStop(1, line.color[2]);
            ctx.save();
            ctx.strokeStyle = grad;
            ctx.shadowColor = line.color[1];
            ctx.shadowBlur = 7;
            ctx.lineWidth = line.width;
            ctx.beginPath();
            ctx.moveTo(line.x1, line.y1);
            ctx.lineTo(line.x2, line.y2);
            ctx.stroke();
            ctx.restore();
          });
        }
      });

      // --- Draw light points (electrical current) ---
      myceliumStructuresRef.current.forEach(mycelium => {
        for (let i = 0; i < Math.min(10, mycelium.lines.length); i++) {
          const line = mycelium.lines[i];
          const t = (Math.sin(currentTime * 0.0003 + i * 0.7) + 1) / 2;
          const x = line.x1 + (line.x2 - line.x1) * t;
          const y = line.y1 + (line.y2 - line.y1) * t;
          if (!isFinite(x) || !isFinite(y)) continue;
          ctx.save();
          const grad = ctx.createRadialGradient(x, y, 0, x, y, 16);
          grad.addColorStop(0, 'rgba(255,120,220,0.38)');
          grad.addColorStop(0.4, 'rgba(200,120,255,0.22)');
          grad.addColorStop(1, 'rgba(120,180,255,0)');
          ctx.globalCompositeOperation = 'lighter';
          ctx.beginPath();
          ctx.arc(x, y, 12, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.restore();
        }
      });

      // Update navigation cell sizes based on screen size
      const minDimension = Math.min(canvas.width, canvas.height);
      const baseRadius = minDimension * 0.03; // 3% of screen size
      navigationCellsRef.current.forEach(cell => {
        cell.originalRadius = baseRadius * 1.8;
        cell.draw(ctx);
      });

      // Update cell positions state
      setCellPositions(navigationCellsRef.current.map(cell => ({
        x: cell.x,
        y: cell.y,
        radius: cell.radius,
        text: cell.text,
        link: cell.link,
        isHovered: cell.isHovered
      })));
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

  const handleCellHover = (cell, isEntering) => {
    const navCell = navigationCellsRef.current.find(nc => nc.link === cell.link);
    if (navCell) {
      navCell.isHovered = isEntering;
    }
    setActiveLink(isEntering ? cell.link : null);
  };

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
          background: 'black'
        }}
      />
      <NavigationOverlay 
        cells={cellPositions}
        activeLink={activeLink}
        onHover={handleCellHover}
      />
      {/* Exhibition introduction text */}
      <div
        ref={textBoxRef}
        style={{
          position: 'fixed',
          top: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 30,
          background: 'rgba(20, 20, 40, 0.72)',
          color: 'white',
          borderRadius: 18,
          padding: '32px 36px',
          maxWidth: 800,
          width: '90vw',
          fontSize: 20,
          fontWeight: 400,
          lineHeight: 1.6,
          boxShadow: '0 4px 32px 0 rgba(0,0,0,0.18)',
          letterSpacing: 0.1,
          textAlign: 'center',
          fontFamily: 'inherit',
        }}
      >
        The 2025 degree show, led by the students of the Digital Arts Computing course at Goldsmiths, explores the extraordinary ability of <b>Physarum Polycephalum</b>, a single-cell slime mould with the ability to adapt to its environment, no matter how intricate or complex, for the sake of reaching a destination.<br/><br/>
        Looking through this lens, our work serves to be viewed as challenging the centrality of humans and how perspectives may shift when coming to different understandings of life, intelligence and connectivity.<br/><br/>
        Through the fusion of art and technology, <b>net_work Reconfiguration</b> encourages the viewer to ponder the current boundaries between biological and digital networks. By highlighting an organism, which is capable of reconfiguring itself to solve a fundamental problem, we can learn from this strange yet intriguing lifeform.<br/><br/>
        Join us in reimagining the world through the metaphorical lens of <b>Physarum Polycephalum</b> where the "blob" becomes a guide to reconfigure our understanding of networks, intelligence and posthumanist concepts.
      </div>
    </>
  );
};

const NavigationOverlay = ({ cells, activeLink, onHover }) => {
  return (
    <div 
      role="navigation" 
      aria-label="Main navigation"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      {cells.map((cell, index) => (
        <Link
          key={cell.link}
          href={cell.link}
          style={{
            position: 'absolute',
            left: cell.x - cell.radius * 2,
            top: cell.y - cell.radius * 2,
            width: cell.radius * 4,
            height: cell.radius * 4,
            cursor: 'pointer',
            pointerEvents: 'auto',
            zIndex: 10,
          }}
          onMouseEnter={() => onHover(cell, true)}
          onMouseLeave={() => onHover(cell, false)}
          aria-label={`Navigate to ${cell.text}`}
        >
          <span className="sr-only">{cell.text}</span>
        </Link>
      ))}
    </div>
  );
};

export default OrganicBackground; 