"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './artworks.module.css';
import cardData from '../../../data/physarum-polycephalum/cardData';
import { useSearchParams } from 'next/navigation';

const ArtworksGallery = () => {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const [activeArtwork, setActiveArtwork] = useState(null);
  const searchParams = useSearchParams();
  const N = cardData.length;
  const step = (Math.PI * 2) / N;
  const selected = Number(searchParams.get('selected'));
  const [rotation, setRotation] = useState(0);
  const [cellPositions, setCellPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [navCells, setNavCells] = useState({ left: null, right: null });
  const cellsRef = useRef([]);
  const lastRenderTimeRef = useRef(0);
  const targetFPS = 60;
  const frameInterval = 1000 / targetFPS;
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

  // Calculate topIndex for Link usage
  let minDiff = Infinity;
  let topIndex = 0;
  for (let i = 0; i < N; i++) {
    const cellAngle = step * i + rotation;
    let diff = Math.abs(((cellAngle + Math.PI * 2) % (Math.PI * 2)) - (3 * Math.PI / 2));
    if (diff > Math.PI) diff = Math.abs(diff - Math.PI * 2);
    if (diff < minDiff) {
      minDiff = diff;
      topIndex = i;
    }
  }

  class ArtworkCell {
    constructor(x, y, radius, artwork, canvas) {
      this.x = x;
      this.y = y;
      this.centerX = x;
      this.centerY = y;
      this.radius = radius;
      this.originalRadius = radius;
      this.artwork = artwork;
      this.canvas = canvas;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.glowPhase = Math.random() * Math.PI * 2;
      this.wanderRadius = 50 + Math.random() * 30;
      this.wanderAngle = Math.random() * Math.PI * 2;
      this.wanderPhase = Math.random() * Math.PI * 2;
      this.isHovered = false;
      this.imageLoaded = false;
      this.imageObj = null;
      this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;

      if (artwork.images && artwork.images[0]) {
        this.imageObj = document.createElement('img');
        this.imageObj.crossOrigin = "anonymous";
        this.imageObj.src = artwork.images[0];
        this.imageObj.onload = () => {
          this.imageLoaded = true;
        };
        this.imageObj.onerror = () => {
          console.warn(`Failed to load image for artwork: ${artwork.title}`);
        };
      }
    }

    update() {
      this.pulsePhase += 0.02;
      this.glowPhase += 0.03;
      this.radius = this.originalRadius + Math.sin(this.pulsePhase) * 5;
      // Position always remains on the circular ring
      this.x = this.centerX;
      this.y = this.centerY;
    }

    draw(ctx) {
      if (!ctx) return;

      const glow = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius * 2.5
      );
      
      const glowIntensity = 0.4 + 0.3 * Math.sin(this.glowPhase);
      glow.addColorStop(0, `rgba(255, 255, 150, ${this.isHovered ? glowIntensity * 1.5 : glowIntensity})`);
      glow.addColorStop(0.5, `rgba(255, 200, 50, ${this.isHovered ? glowIntensity : glowIntensity * 0.6})`);
      glow.addColorStop(1, 'rgba(255, 200, 50, 0)');

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      if (this.imageLoaded && this.imageObj) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.clip();
        
        const size = this.radius * 2;
        ctx.drawImage(this.imageObj, 
          this.x - this.radius, 
          this.y - this.radius,
          size, size
        );
        
        ctx.restore();
      } else {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        const pattern = Math.floor((Date.now() / 1000 + this.pulsePhase) % 4);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        
        switch(pattern) {
          case 0:
            for (let i = 0; i < 5; i++) {
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.radius * 0.3 * (i + 1), 
                this.pulsePhase + i, this.pulsePhase + i + Math.PI);
              ctx.stroke();
            }
            break;
          case 1:
            ctx.beginPath();
            ctx.moveTo(this.x - this.radius, this.y);
            ctx.lineTo(this.x + this.radius, this.y);
            ctx.moveTo(this.x, this.y - this.radius);
            ctx.lineTo(this.x, this.y + this.radius);
            ctx.stroke();
            break;
          case 2:
            ctx.beginPath();
            for (let i = -this.radius; i <= this.radius; i += 10) {
              const y = Math.sin(i * 0.1 + this.pulsePhase) * 10;
              ctx.lineTo(this.x + i, this.y + y);
            }
            ctx.stroke();
            break;
          case 3:
            for (let i = 0; i < 5; i++) {
              for (let j = 0; j < 5; j++) {
                const x = this.x + (i - 2) * this.radius * 0.4;
                const y = this.y + (j - 2) * this.radius * 0.4;
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
              }
            }
            break;
        }
        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 240, 150, ${this.isHovered ? 1 : 0.8})`;
      ctx.lineWidth = this.isHovered ? 3 : 2;
      ctx.stroke();

      if (this.isHovered) {
        setActiveArtwork(this.artwork);
      }
    }
  }

  class NavigationCell {
    constructor(x, y, radius, direction) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.direction = direction;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.glowPhase = Math.random() * Math.PI * 2;
      this.isHovered = false;
    }

    draw(ctx) {
      const glow = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius * 2
      );
      
      const glowIntensity = 0.4 + 0.3 * Math.sin(this.glowPhase);
      glow.addColorStop(0, `rgba(255, 255, 150, ${this.isHovered ? glowIntensity * 1.5 : glowIntensity})`);
      glow.addColorStop(0.5, `rgba(255, 200, 50, ${this.isHovered ? glowIntensity : glowIntensity * 0.6})`);
      glow.addColorStop(1, 'rgba(255, 200, 50, 0)');

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 220, 50, ${this.isHovered ? 0.8 : 0.6})`;
      ctx.fill();

      // Draw arrow
      ctx.beginPath();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 3;
      if (this.direction === 'left') {
        ctx.moveTo(this.x + 10, this.y - 10);
        ctx.lineTo(this.x - 10, this.y);
        ctx.lineTo(this.x + 10, this.y + 10);
      } else {
        ctx.moveTo(this.x - 10, this.y - 10);
        ctx.lineTo(this.x + 10, this.y);
        ctx.lineTo(this.x - 10, this.y + 10);
      }
      ctx.stroke();
    }

    update() {
      this.pulsePhase += 0.02;
      this.glowPhase += 0.03;
    }
  }

  class Pointer {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.pulsePhase = 0;
    }

    draw(ctx) {
      ctx.save();
      
      // Draw pointer triangle
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - 20);
      ctx.lineTo(this.x - 10, this.y - 40);
      ctx.lineTo(this.x + 10, this.y - 40);
      ctx.closePath();
      
      // Add glow effect
      ctx.shadowColor = 'rgba(255, 220, 50, 0.8)';
      ctx.shadowBlur = 10 + Math.sin(this.pulsePhase) * 5;
      ctx.fillStyle = 'rgba(255, 220, 50, 0.8)';
      ctx.fill();
      
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.restore();
    }

    update() {
      this.pulsePhase += 0.1;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    const radius = 60;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const distance = Math.min(canvas.width, canvas.height) * 0.35;
    cellsRef.current = cardData.map((artwork, index) => {
      const angle = step * index + rotation;
      return new ArtworkCell(
        centerX + Math.cos(angle) * distance,
        centerY + Math.sin(angle) * distance,
        radius,
        artwork,
        canvas
      );
    });

    let ctx = null;

    function animate(currentTime) {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Only declare centerX/centerY once
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Draw red and blue alternating background ---
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(canvas.width, canvas.height) * 0.7);
      bgGradient.addColorStop(0, 'rgba(120,0,20,0.85)'); // Center red
      bgGradient.addColorStop(0.45, 'rgba(60,0,60,0.7)');
      bgGradient.addColorStop(0.7, 'rgba(0,0,80,0.85)'); // Surrounding blue
      bgGradient.addColorStop(1, 'rgba(0,0,40,1)');
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      // --- Draw web-like background ---
      const ringRadius = Math.min(canvas.width, canvas.height) * 0.35;
      const netNodeCount = 40; // More nodes
      const netNodes = [];
      for (let i = 0; i < netNodeCount; i++) {
        const angle = (Math.PI * 2 * i) / netNodeCount + Math.sin(currentTime * 0.0002 + i) * 0.13;
        const r = ringRadius + 100 + Math.sin(currentTime * 0.0005 + i) * 32; // Further out and with larger fluctuations
        netNodes.push({
          x: centerX + Math.cos(angle) * r,
          y: centerY + Math.sin(angle) * r,
        });
      }
      // Draw nodes
      netNodes.forEach(node => {
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 28);
        grad.addColorStop(0, 'rgba(255,255,120,0.55)');
        grad.addColorStop(0.5, 'rgba(180,255,80,0.28)');
        grad.addColorStop(1, 'rgba(180,255,80,0)');
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });
      // Draw branch lines
      for (let i = 0; i < netNodeCount; i++) {
        for (let j = i + 1; j < netNodeCount; j++) {
          if (Math.abs(i - j) === 1 || Math.abs(i - j) === netNodeCount - 1 || Math.random() < 0.05) {
            ctx.save();
            ctx.strokeStyle = 'rgba(200,255,100,0.38)';
            ctx.shadowColor = 'rgba(255,255,120,0.28)';
            ctx.shadowBlur = 16;
            ctx.lineWidth = 3.2;
            ctx.beginPath();
            ctx.moveTo(netNodes[i].x, netNodes[i].y);
            const mx = (netNodes[i].x + netNodes[j].x) / 2 + (Math.random() - 0.5) * 38;
            const my = (netNodes[i].y + netNodes[j].y) / 2 + (Math.random() - 0.5) * 38;
            ctx.quadraticCurveTo(mx, my, netNodes[j].x, netNodes[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      // --- Draw floating transparent peripheral cells ---
      const floatCellCount = 16;
      for (let i = 0; i < floatCellCount; i++) {
        // Distribute on both sides
        let angle;
        if (i < floatCellCount / 2) {
          // Left side: 2π/3 ~ 4π/3
          angle = (2 * Math.PI / 3) + (i / (floatCellCount / 2 - 1)) * (2 * Math.PI / 3);
        } else {
          // Right side: -π/3 ~ π/3
          angle = (-Math.PI / 3) + ((i - floatCellCount / 2) / (floatCellCount / 2 - 1)) * (2 * Math.PI / 3);
        }
        // Floating animation
        angle += Math.sin(currentTime * 0.0005 + i * 2) * 0.18;
        const floatR = ringRadius + 260 + Math.sin(currentTime * 0.0007 + i) * 36;
        const x = centerX + Math.cos(angle) * floatR;
        const y = centerY + Math.sin(angle) * floatR;
        ctx.save();
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 48);
        grad.addColorStop(0, 'rgba(255,255,200,0.32)');
        grad.addColorStop(0.7, 'rgba(255,255,200,0.16)');
        grad.addColorStop(1, 'rgba(255,255,200,0)');
        ctx.beginPath();
        ctx.arc(x, y, 38 + Math.sin(currentTime * 0.001 + i) * 8, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }
      // --- End of web-like structure drawing ---

      const deltaTime = currentTime - lastRenderTimeRef.current;
      if (deltaTime < frameInterval) return;

      lastRenderTimeRef.current = currentTime - (deltaTime % frameInterval);

      cellsRef.current.forEach(cell => {
        cell.update();
        cell.draw(ctx);
      });

      // Pointer always points to the top of the circular ring
      const pointerLength = distance - radius - 10;
      const pointerAngle = -Math.PI / 2; // 12 o'clock direction
      const endX = centerX + Math.cos(pointerAngle) * pointerLength;
      const endY = centerY + Math.sin(pointerAngle) * pointerLength;
      ctx.save();
      ctx.strokeStyle = 'rgba(255,0,0,0.85)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      // Arrow head
      ctx.fillStyle = 'rgba(255,0,0,0.85)';
      ctx.beginPath();
      const headlen = 32;
      const headAngle = Math.PI / 7;
      ctx.moveTo(endX, endY);
      ctx.lineTo(
        endX - headlen * Math.cos(pointerAngle - headAngle),
        endY - headlen * Math.sin(pointerAngle - headAngle)
      );
      ctx.lineTo(
        endX - headlen * Math.cos(pointerAngle + headAngle),
        endY - headlen * Math.sin(pointerAngle + headAngle)
      );
      ctx.lineTo(endX, endY);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Calculate the index of the cell at the top (closest angle method)
      let minDiff = Infinity;
      let topIndex = 0;
      for (let i = 0; i < N; i++) {
        const cellAngle = step * i + rotation;
        // Normalize to [0, 2π]
        let diff = Math.abs(((cellAngle + Math.PI * 2) % (Math.PI * 2)) - (3 * Math.PI / 2));
        if (diff > Math.PI) diff = Math.abs(diff - Math.PI * 2);
        if (diff < minDiff) {
          minDiff = diff;
          topIndex = i;
        }
      }
      const activeArtwork = cardData[topIndex];
      if (activeArtwork) {
        const boxWidth = Math.min(canvas.width * 0.7, canvas.width - 80);
        const boxHeight = 180;
        const boxX = canvas.width / 2 - boxWidth / 2;
        const boxY = canvas.height - boxHeight - 40;
        ctx.save();
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetY = 8;
        ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
        ctx.restore();
        ctx.font = 'bold 32px Arial';
        ctx.fillStyle = 'rgba(255, 220, 50, 0.95)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(activeArtwork.title, canvas.width / 2, boxY + 36);
        ctx.font = '24px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
        ctx.fillText(activeArtwork.artistName, canvas.width / 2, boxY + 90);
        // Operation guide
        ctx.font = '18px Arial';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText('Please use the left and right arrows to select an artwork. Click on a cell to view more information about the artwork.', canvas.width / 2, boxY + boxHeight - 18);
      }

      setCellPositions(cellsRef.current.map(cell => ({
        x: cell.x,
        y: cell.y,
        radius: cell.radius,
        artwork: cell.artwork,
        isHovered: cell.isHovered
      })));
    }

    animate(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [rotation]);

  useEffect(() => {
    if (!isNaN(selected) && selected >= 0 && selected < N) {
      setRotation(-step * selected);
    }
  }, [selected, N, step]);

  // Left and right arrows control overall rotation of the ring
  const handleNavigation = (direction) => {
    const N = cardData.length;
    const step = (Math.PI * 2) / N;
    setRotation(r => direction === 'left' ? r + step : r - step);
  };

  const handleCellHover = (cell, isEntering) => {
    const artworkCell = cellsRef.current.find(c => c.artwork.link === cell.artwork.link);
    if (artworkCell) {
      artworkCell.isHovered = isEntering;
      if (isEntering) {
        setActiveArtwork(cell.artwork);
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!navCells.left || !navCells.right) return;

    const { clientX, clientY } = e;
    const leftCell = navCells.left;
    const rightCell = navCells.right;

    const isInsideCell = (cell, x, y) => {
      const dx = x - cell.x;
      const dy = y - cell.y;
      return Math.sqrt(dx * dx + dy * dy) <= cell.radius * 2;
    };

    leftCell.isHovered = isInsideCell(leftCell, clientX, clientY);
    rightCell.isHovered = isInsideCell(rightCell, clientX, clientY);
  };

  const handleClick = (e) => {
    if (!navCells.left || !navCells.right) return;

    const { clientX, clientY } = e;
    const leftCell = navCells.left;
    const rightCell = navCells.right;

    const isInsideCell = (cell, x, y) => {
      const dx = x - cell.x;
      const dy = y - cell.y;
      return Math.sqrt(dx * dx + dy * dy) <= cell.radius * 2;
    };

    if (isInsideCell(leftCell, clientX, clientY)) {
      handleNavigation('left');
    } else if (isInsideCell(rightCell, clientX, clientY)) {
      handleNavigation('right');
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [navCells]);

  return (
    <div className={styles.galleryContainer}>
      {/* Back button */}
      <Link
        href="/physarum-polycephalum"
        style={{
          position: 'fixed',
          top: 24,
          left: 24,
          zIndex: 100,
          background: 'rgba(30,30,60,0.82)',
          color: '#e0aaff',
          fontWeight: 600,
          fontSize: 20,
          borderRadius: 24,
          padding: '10px 22px',
          textDecoration: 'none',
          boxShadow: '0 2px 12px #0006',
          letterSpacing: 0.5,
          transition: 'background 0.2s',
        }}
      >
        ← Back
      </Link>
      <canvas
        ref={canvasRef}
        className={styles.galleryCanvas}
      />
      <div className={styles.cellOverlay}>
        {cellPositions.map((cell, index) => (
          <Link
            key={cell.artwork.link}
            href={`/physarum-polycephalum/Artworks/${cell.artwork.link}?selected=${topIndex}`}
            style={{
              position: 'absolute',
              left: cell.x - cell.radius,
              top: cell.y - cell.radius,
              width: cell.radius * 2,
              height: cell.radius * 2,
              cursor: 'pointer',
              zIndex: 10,
            }}
            onMouseEnter={() => handleCellHover(cell, true)}
            onMouseLeave={() => handleCellHover(cell, false)}
            aria-label={`View artwork: ${cell.artwork.title} by ${cell.artwork.artistName}`}
          >
            <span className="sr-only">
              {cell.artwork.title} by {cell.artwork.artistName}
            </span>
          </Link>
        ))}
      </div>
      {/* Slider arrows */}
      <button
        onClick={() => handleNavigation('left')}
        aria-label="Previous artwork"
        style={{
          position: 'fixed',
          left: '5vw',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'black',
          width: 56,
          height: 56,
          borderRadius: '50%',
          fontSize: 36,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
          zIndex: 30,
          pointerEvents: 'auto',
        }}
      >
        &#8592;
      </button>
      <button
        onClick={() => handleNavigation('right')}
        aria-label="Next artwork"
        style={{
          position: 'fixed',
          right: '5vw',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'black',
          width: 56,
          height: 56,
          borderRadius: '50%',
          fontSize: 36,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
          zIndex: 30,
          pointerEvents: 'auto',
        }}
      >
        &#8594;
      </button>
    </div>
  );
};

export default ArtworksGallery; 