"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import cardData from '../../../../data/physarum-polycephalum/cardData';
// import Footer from '../../../../components/footer';
import styles from '../artworks.module.css';
import ImageSlider from '../../../../components/ImageSlider';
import Link from 'next/link';

export default function ArtworkPage({ params }) {
  const router = useRouter();
  const { artworksId } = params;
  const artwork = cardData.find(a => a.link === artworksId);
  const [imgIdx, setImgIdx] = useState(0);
  if (!artwork) return <div className="text-white p-8">Artwork not found</div>;
  const images = artwork.images || [];
  const nextImg = () => setImgIdx(i => (i + 1) % images.length);
  const prevImg = () => setImgIdx(i => (i - 1 + images.length) % images.length);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(90deg, #18182a 60%, #221a3a 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 0',
      gap: 0,
    }}>
      {/* Left side cell image carousel */}
      <div style={{
        flex: '0 0 420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        minWidth: 320,
        maxWidth: 480,
        marginRight: 56,
      }}>
        <div style={{
          width: 480,
          height: 360,
          borderRadius: 36,
          background: 'linear-gradient(135deg, #e0aaff 0%, #ffb3e6 60%, #221a3a 100%)',
          boxShadow: '0 0 64px 0 #e0aaff55, 0 0 32px 0 #ffb3e655',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {images.length > 0 && (
            <img
              src={images[imgIdx]}
              alt={artwork.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: 32,
                background: '#18182a',
                boxShadow: '0 0 32px 0 #e0aaff33',
                transition: 'opacity 0.3s',
              }}
            />
          )}
          {/* Left and right navigation buttons */}
          {images.length > 1 && (
            <>
              <button onClick={prevImg} style={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(30,30,60,0.7)',
                border: 'none',
                color: '#fff',
                fontSize: 32,
                borderRadius: '50%',
                width: 40,
                height: 40,
                cursor: 'pointer',
                zIndex: 2,
                boxShadow: '0 2px 8px #0006',
              }}>&#8592;</button>
              <button onClick={nextImg} style={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(30,30,60,0.7)',
                border: 'none',
                color: '#fff',
                fontSize: 32,
                borderRadius: '50%',
                width: 40,
                height: 40,
                cursor: 'pointer',
                zIndex: 2,
                boxShadow: '0 2px 8px #0006',
              }}>&#8594;</button>
            </>
          )}
        </div>
      </div>
      {/* Right side information area */}
      <div style={{
        flex: '1 1 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 48,
        maxWidth: 600,
        minWidth: 260,
      }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#e0aaff', marginBottom: 8 }}>{artwork.title}</h1>
        <h2 style={{ fontSize: 22, fontWeight: 500, color: '#ffb3e6', marginBottom: 18 }}>{artwork.artistName}</h2>
        <div style={{ fontSize: 18, color: '#fff', marginBottom: 24, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{artwork.description}</div>
        {/* Social links */}
        {artwork.socialLinks && (
          <div style={{ display: 'flex', gap: 18, marginTop: 8 }}>
            {Object.entries(artwork.socialLinks).map(([platform, url]) => (
              <a key={platform} href={url} target="_blank" rel="noopener noreferrer" style={{
                color: '#e0aaff',
                fontWeight: 500,
                fontSize: 18,
                textDecoration: 'underline',
                letterSpacing: 0.2,
              }}>{platform}</a>
            ))}
          </div>
        )}
        <Link href="/physarum-polycephalum/Artworks" style={{
          marginTop: 36,
          color: '#fff',
          fontSize: 18,
          textDecoration: 'underline',
          opacity: 0.7,
        }}>← Back to Gallery</Link>
      </div>
    </div>
  );
}
