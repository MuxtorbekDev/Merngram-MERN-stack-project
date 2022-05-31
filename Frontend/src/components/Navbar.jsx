import React, { useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

export const Navbar = () => {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);

  const renderNav = () => {
    if (state) {
      return [
        <>
          <li>
            <Link to="/createpost">Post Yaratish</Link>
          </li>
          <li>
            <Link to="/profile">Mening Profilim</Link>
          </li>
        </>,
      ];
    } else {
      return [
        <>
          <li>
            <Link to="/signin">Kirish</Link>
          </li>
        </>,
      ];
    }
  };

  return (
    <nav className="teal lighten-2">
      <div className="nav-wrapper  container ">
        <Link to={state ? "/" : "/signin"} className="brand-logo">
          MernGram
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderNav()}
        </ul>
      </div>
    </nav>
  );
};
