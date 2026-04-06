import '../../styles/globals.css';
import NavBarWCC from '../../components/physarum-polycephalumNav';
// import Footer from '../components/footer';
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

export const metadata = {
  title: 'Digital Arts Computing - Degree Show 2025',
  description: '2025 DAC Degree Show Exhibition Page - physarum-polycephalum',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body>
          <div>
            <NavBarWCC/>
          </div>
         {children}
         {/* Include the Footer component */}
       
        </body>
    </html>
  )
  
  
  
  
  
}

