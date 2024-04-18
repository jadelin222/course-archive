// app/footer.tsx

// Import necessary modules
import Link from 'next/link';
import Image from 'next/image';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
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
            <a href="https://www.gold.ac.uk/campus-map/st-james-hatcham-building/#map-view">
              St. James Hatcham Building (AKA The Church)
              <Image
                src="/images/StjamesHatchamresized.jpg"
                width={150}
                height={80}
                alt="Picture of the St. James Hatcham Building"
              />
            </a>
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
        <a href="https://www.instagram.com/digital_arts_computing/?hl=en">
          Find us on Instagram
        </a>
        <FontAwesomeIcon style={{ 'margin-left': '6px' }} icon={faInstagram} />
        <br></br>
        <a href="https://www.instagram.com/digital_arts_computing/?hl=en">
          Check out our zine
        </a>
      </div>
    </footer>
  );
}
