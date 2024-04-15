// app/footer.tsx

// Import necessary modules
import Link from 'next/link';
import './footer.css';
// import { FaGithub, FaTwitter } from 'react-icons/fa';

// Define the Footer component
export default function Footer() {
  return (
    <footer>
      {/* First section of the footer */}
      <div>
        <div>
          <p>25 April - 28 April, 2024</p>
          <p>time</p>
          <p>st james hatcham</p>
          <p>location location</p>
        </div>
       
        {/* Display your name and the current year */}
        <p>Goldsmiths Digital Arts Computing &copy; {new Date().getFullYear()}</p>
      </div>
      {/* Second section of the footer */}
      <div>
        {/* Provide a link to your Twitter profile */}
        <a href="https://www.instagram.com/digital_arts_computing/?hl=en">
          Find us on Instagram
        </a>
      </div>
    </footer>
  );
}
