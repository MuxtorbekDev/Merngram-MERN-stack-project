import React, { useContext } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="teal lighten-2">
      <div className="nav-wrapper  container ">
        <Link to="/" className="brand-logo">
          MernGram
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/signin">Kirish</Link>
          </li>
          <li>
            <Link to="/profile">Mening Profilim</Link>
          </li>
          <li>
            <Link to="/createpost">Post Yaratish</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
