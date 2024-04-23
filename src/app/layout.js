import '../styles/globals.css'
import NavBar from '../components/navBar';
// import Footer from '../components/footer';
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

export const metadata = {
  title: 'Digital Arts Computing - Fog Rot 2024',
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
         {/* Include the Footer component */}
       
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

