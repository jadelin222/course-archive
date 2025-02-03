import '../../styles/globals.css'
import NavBar from '../../components/navBar';
// import Footer from '../components/footer';
// import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

export const metadata = {
  title: 'Digital Arts Computing - Fog Rot',
  description: '2024 DAC degree show exhibition page',
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
  }