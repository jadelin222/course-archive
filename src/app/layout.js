import '../styles/globals.css'
import { Inter } from 'next/font/google'
import NavBar from '../components/navBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Digital Arts Computing Archive',
  description: 'A repository...',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <div>
            <NavBar/>
          </div>
         {children}
        </body>
    </html>
  )
}

