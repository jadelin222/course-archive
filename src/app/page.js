import Image from 'next/image'
import Link from 'next/link'

//The page.js file is the default 'page' of it's respective directory. This is the default 'home' page, so it's URL path will be 'example.com/'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div> 
        You are on the <Link href="/about">home page.</Link> 
      </div>
      <div>
        <video width="320px" height="320px" autoPlay loop>
          <source src="videos/byNateTownsend.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> 
      </div>
    </main>
  )
}
