import Image from 'next/image'
import Link from 'next/link'

//This page.js file is located inside the /about directory, so its URL path becomes 'example.com/about'

export default function Home1() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div> 
        BSc Digital Arts Computing at Goldsmiths University is a degree programme situated within a dynamic community of computational artist practitioners. Central to the learning environment is both critical engagement with artistic material, and experimental practice with emergent digital technology. 
      </div>
    </main>
  )
}
