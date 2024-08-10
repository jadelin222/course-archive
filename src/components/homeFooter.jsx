import Link from 'next/link';
import Image from 'next/image';
import './homeFooter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import {faBookOpen} from '@fortawesome/free-solid-svg-icons';
// import { FaGithub, FaTwitter } from 'react-icons/fa';

// Define the Footer component
export default function HomeFooter() {
  return (
    <footer>
      {/* First section of the footer */}
      <div>
        <div className="flex-footer-top">
          <div className="footer-flex-item">
            <h3>Follow us</h3>
            <div>
             {/* <FontAwesomeIcon style={{ 'paddingRight': '6px' }} icon={faInstagram} /> */}
             <Link href="https://www.instagram.com/digital_arts_computing/?hl=en" target="_blank" rel="noopener noreferrer" className="item">
               Instagram
             </Link>
            </div>
            <div>
              <Link href="https://www.facebook.com/digitalartscomputingBSc/" target="_blank" rel="noopener noreferrer" className="item">
                Facebook
              </Link>
            </div>
            <div>
              <Link href="https://x.com/goldcomputing?s=21&t=l9bW_Oln9E9kwZ1K5b4fbQ" target="_blank" rel="noopener noreferrer" className="item">
                X
              </Link>
            </div>
          </div>
          <div className="footer-flex-item">
            <h3>Join Us</h3>
            <Link href="https://www.gold.ac.uk/ug/bsc-digital-arts-computing/" target="_blank" rel="noopener noreferrer" className="item">Application & Admission via Goldsmiths</Link>
            <Link href="https://www.youtube.com/watch?v=sKPYslKWkGE" target="_blank" rel="noopener noreferrer" className="item">Meet the Students</Link>
            {/* <p>- Turn off New Cross road and walk up St James</p>
            <p style={{ paddingBottom: '12px' }}>- The St James Hatcham Building is at the end of the road</p> */}
          </div>

          
        </div>

        {/* Display your name and the current year */}
        <hr style={{ padding: '10px' }}></hr>
        <p className="footer-note">Digital Arts Computing form Goldsmiths, University of London</p>
        <p className="footer-note">Website designed and developed by jade lin <a className="underline" href="https://strawberrycongee.itch.io/" target="_blank" rel="noopener noreferrer">@strawberrycongee</a></p>
        {/* <p>
          Goldsmiths Digital Arts Computing &copy; {new Date().getFullYear()}
        </p> */}
      </div>
      {/* Second section of the footer */}
      <div>
        {/* provide a link to your social profile */}
        {/* <FontAwesomeIcon style={{ 'paddingRight': '6px' }} icon={faInstagram} />
        <Link href="https://www.instagram.com/digital_arts_computing/?hl=en" target="_blank" rel="noopener noreferrer">
        digital_arts_computing
        </Link>
         */}
        {/* <br></br>
        <FontAwesomeIcon style={{ 'paddingRight': '6px' }} icon={faBookOpen} />
        <Link href="https://online.fliphtml5.com/tljyw/cccr/#p=1" target="_blank" rel="noopener noreferrer">
          Check out our zine
        </Link> */}
      </div>
    </footer>
  );
}
