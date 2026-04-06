"use client";

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import cardData from '../../data/WorksInChaosData/cardData';

// Carousel component
const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-full max-w-6xl h-[40rem] my-8">
            {/*  Show 3 slides simultaneously to create a layered effect */}
            {images.map((image, index) => {
                // Calculate the position offset of the current slide
                const offset = (index - currentIndex + images.length) % images.length;

                return (
                    <div
                        key={image.id}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                            offset === 0 ? 'z-30 opacity-100' :
                                offset === 1 ? 'z-20 opacity-80 -translate-x-8' :
                                    offset === 2 ? 'z-10 opacity-60 -translate-x-16' :
                                        'z-0 opacity-0'
                        }`}
                        style={{
                            transform: `scale(${1 - offset * 0.09})`, // Slight scaling for depth
                        }}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-contain rounded-lg shadow-xl"
                            priority={index < 3} // Preload the first 3 pictures
                        />
                    </div>
                );
            })}

            {/* Navigation dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-40">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

//  Helper to get a random item from an array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Select n random artworks (excluding a specific path)
function getRandomArtworks(data, count) {
    // 1. First, filter out the works that contain specific paths
    const filteredData = data.filter(artwork =>
        !artwork.images.some(image =>
            image.includes('/images/Artworks/DevonKennedy-images/')
        )
    );

    // 2. Randomly select from the filtered array
    const shuffled = [...filteredData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// This page.js file is located inside the /about directory, so its URL path becomes 'example.com/about'
export default function WorksInChaos() {
    // Randomly select n works
    const randomArtworks = getRandomArtworks(cardData, 6);

    // Convert to the format required for the carousel
    const carouselImages = randomArtworks.map((artwork, index) => ({
        id: index + 1,
        src: getRandomItem(artwork.images), // Use the first picture of each work
        alt: `${artwork.title} by ${artwork.artistName}`,
        artworkData: artwork // Retain the complete work data for subsequent use
    }));

    useEffect(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.zIndex = '0';
        document.body.appendChild(canvas);

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();
        let time = 0;
        function draw() {
            // Modify in the draw function
            // const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            // gradient.addColorStop(0, 'rgba(48, 27, 63, 0.5)');   // Top - deep purple
            // gradient.addColorStop(0.5, 'rgba(20, 40, 80, 0.5)'); // Middle - deep blue
            // gradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)');      // Bottom - black
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            const hueShift = Math.sin(time / 60) * 30;

            gradient.addColorStop(0, `hsl(${200 + hueShift}, 60%, 20%)`);
            gradient.addColorStop(0.5, `hsl(${220 + hueShift}, 70%, 15%)`);
            gradient.addColorStop(1, `hsl(${240 + hueShift}, 80%, 10%)`);

            ctx.fillStyle = gradient;
            
            // ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // add art glitch effects
            for (let i = 0; i < 150; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const w = Math.random() * 8;
                const h = Math.random() * 6;
                ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
               
                ctx.fillRect(x, y, w, h);
            }
            time++;
            requestAnimationFrame(draw);
        }
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            document.body.removeChild(canvas);
        };
    }, []);

    return (
        <div className="noise-bg"> {/* Add an outer relative positioning container */}
            {/* The background canvas will be automatically added to the body through the useEffect */}

            <main className="relative z-10 flex min-h-screen flex-col items-center justify-between p-24">
                {/* Note that relative and z-10 have been added here */}
                <div className="max-w-4xl text-center mb-8">
                    Welcome to Works in Disarray, a work-in-progress exhibition by all three years of digital art computing students. This exhibition creates ripples in the art world, waves of butterfly effects, and a chaotic future. Chaos is the whisper of the cosmos. Forms, ideas, and structures—are destined to dissolve. Our students' Videos, signals, sounds, and cables hold time, space, and memory fragments. "Works in Disarray" mixes consciousness and patterns by composing a spontaneous orchestra in a digital world. So please join us and enjoy our students' artwork in chaotic disarray.
                </div>

                <ImageCarousel images={carouselImages} />

                <Link
                    href="/WorksInChaos/Artworks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    View Artworks
                </Link>
            </main>
        </div>
    )
}
