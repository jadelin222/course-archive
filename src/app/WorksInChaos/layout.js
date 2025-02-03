import '../../styles/globals.css'
import NavBarWIC from '../../components/worksInChaosNav';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

export const metadata = {
  title: 'Digital Arts Computing - Works In Chaos',
  description: '2025 DAC Pop Up Show Exhibition Page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body>
          <div>
            <NavBarWIC/>
          </div>
         {children}
         {/* Include the Footer component */}
       
        </body>
    </html>
  )
  }