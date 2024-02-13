//Custom Navigation Item class using Next.js' Link class. 
//We are dropping in text (str), hyperlink reference (str) and active status (bool) as properties, or 'props'. 

//The behaviour below switches the html class reference based upon whether the item is active or not. 

import Link from "next/link";
const NavItem = ({text, href, active}) => {
    return(
        <Link href={href}>
            <a className={`nav__item ${active ? "active" : ""}`}>
            {text}
            </a>
        </Link>
    );
}

export default NavItem;