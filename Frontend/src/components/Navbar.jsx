import React, { useContext } from "react";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import "./screens/css/navbar.css";
import {
  MdOutlinePostAdd,
  MdOutlineLogout,
  MdOutlineHome,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { VscSignIn } from "react-icons/vsc";

export const Navbar = () => {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const renderNav = () => {
    if (state) {
      return [
        <>
          <li>
            <Link to="/">
              <MdOutlineHome fontSize={"2.2rem"} />
            </Link>
          </li>
          <li>
            <Link to="/createpost">
              <MdOutlinePostAdd fontSize={"2.2rem"} />
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <CgProfile fontSize={"2.2rem"} />
            </Link>
          </li>
          <li
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              navigate("/signin");
            }}
          >
            <MdOutlineLogout fontSize={"2.2rem"} />
          </li>
        </>,
      ];
    } else {
      return [
        <>
          <li>
            <Link to="/signin">
              <VscSignIn fontSize={"2.2rem"} />
            </Link>
          </li>
        </>,
      ];
    }
  };

  return (
    <div className="navbar">
      <div className="  container ">
        <Link to={state ? "/" : "/signin"} className="brand-logo">
          <h2 className="brand-logo">MernGram</h2>
        </Link>
        <ul>{renderNav()}</ul>
      </div>
    </div>
  );
};
