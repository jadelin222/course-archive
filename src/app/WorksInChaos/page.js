import Image from 'next/image'
import Link from 'next/link'
//This page.js file is located inside the /about directory, so its URL path becomes 'example.com/about'

export default function WorksInChaos() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div> 
      {/* this page is for the pop up show. Add poster and a button on this page to direct to cards for artworks */}
      Welcome to Works in Disarray, a work-in-progress exhibition by all three years of digital art computing students. This exhibition creates ripples in the art world, waves of butterfly effects, and a chaotic future. Chaos is the whisper of the cosmos. Forms, ideas, and structures—are destined to dissolve. Our students’ Videos, signals, sounds, and cables hold time, space, and memory fragments. “Works in Disarray” mixes consciousness and patterns by composing a spontaneous orchestra in a digital world. So please join us and enjoy our students’ artwork in chaotic disarray.
      </div>
      <Link href="/WorksInChaos/Artworks" target="_blank" rel="noopener noreferrer">
      View Artworks</Link>
    </main>
  )
}
