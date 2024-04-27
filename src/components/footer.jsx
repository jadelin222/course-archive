// app/footer.tsx

// Import necessary modules
import Link from 'next/link';
import Image from 'next/image';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import {faBookOpen} from '@fortawesome/free-solid-svg-icons';
// import { FaGithub, FaTwitter } from 'react-icons/fa';

// Define the Footer component
export default function Footer() {
  return (
    <footer>
      {/* First section of the footer */}
      <div>
        <div className="flex-footer-top">
          <div className="footer-flex-item">
            <h3>Opening Time</h3>
            <div style={{ paddingBottom: '12px' }}>
              <p>[25 April, 2024]</p>
              <p>6PM - 10PM</p>
            </div>
            <div style={{ paddingBottom: '12px' }}>
              <p>[26-27 April, 2024]</p>
              <p>10AM - 8PM</p>
            </div>
            <div style={{ paddingBottom: '12px' }}>
              <p>[28 April, 2024]</p>
              <p>10AM - 5PM</p>
            </div>
          </div>
          <div className="footer-flex-item">
            <h3>Getting Here</h3>
            <Link href="https://www.gold.ac.uk/campus-map/st-james-hatcham-building/#map-view" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/StjamesHatchamresized.jpg"
                width={150}
                height={80}
                alt="Picture of the St. James Hatcham Building"
                style={{ marginBottom: '0.4rem' }}
              />
               <h5 style={{ fontWeight:'bold', marginBottom: '0.6rem'}}>St. James Hatcham Building (AKA The Church)</h5>
            </Link>
            <p>- Turn off New Cross road and walk up St James</p>
            <p style={{ paddingBottom: '12px' }}>- The St James Hatcham Building is at the end of the road</p>
          </div>

          
        </div>

        {/* Display your name and the current year */}
        <hr style={{ padding: '10px' }}></hr>
        <p>
          Goldsmiths Digital Arts Computing &copy; {new Date().getFullYear()}
        </p>
      </div>
      {/* Second section of the footer */}
      <div>
        {/* provide a link to your social profile */}
        <FontAwesomeIcon style={{ 'paddingRight': '6px' }} icon={faInstagram} />
        <Link href="https://www.instagram.com/digital_arts_computing/?hl=en" target="_blank" rel="noopener noreferrer">
        digital_arts_computing
        </Link>
        
        <br></br>
        <FontAwesomeIcon style={{ 'paddingRight': '6px' }} icon={faBookOpen} />
        <Link href="https://online.fliphtml5.com/tljyw/cccr/#p=1" target="_blank" rel="noopener noreferrer">
          Check out our zine
        </Link>
      </div>
    </footer>
  );
}
