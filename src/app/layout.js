import '../styles/globals.css'
import NavBar from '../components/navBar';

export const metadata = {
  title: 'Digital Arts Computing Archive',
  description: 'A repository...',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body>
          <div>
            <NavBar/>
          </div>
         {children}
        </body>
    </html>
  )
  
  
  // return (
    // <html lang="en">
    //     <body>
    //     {displayNavBar && <NavBar />}
    //     {children}
    //     </body>
    // </html>
  // )
  
  
}

