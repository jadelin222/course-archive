//Custom Navigation Item class using Next.js' Link class. 
//We are dropping in text (str), hyperlink reference (str) and active status (bool) as properties, or 'props'. 

//The behaviour below switches the html class reference based upon whether the item is active or not. 

import Link from "next/link";
import './navItemStyle.css';

const NavItem = ({ children, href, active, newTab = false }) => {
    if (newTab) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={`nav__item ${active ? "active" : ""}`}>
                {children}
            </a>
        );
    } else {
        return (
            <Link href={href} className={`nav__item ${active ? "active" : ""}`}>
                {children}
            </Link>
        );
    }
}

export default NavItem;