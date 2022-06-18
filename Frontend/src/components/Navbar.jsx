import React, { useContext, useRef, useState, useEffect } from "react";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import "./screens/css/navbar.css";
import M from "materialize-css";
import {
  MdOutlinePostAdd,
  MdOutlineLogout,
  MdOutlineHome,
  MdSearch,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { VscSignIn } from "react-icons/vsc";
import { IoIosAlbums } from "react-icons/io";

export const Navbar = () => {
  const searchPanel = useRef(null);
  const [search, setSearch] = useState("");
  const [userFinded, setUserFinded] = useState([]);
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    M.Modal.init(searchPanel.current);
  }, []);

  const renderNav = () => {
    if (state) {
      return [
        <div>
          <li
            data-target="modal1"
            style={{ cursor: "pointer" }}
            className="modal-trigger"
            key="1"
          >
            <MdSearch fontSize={"2.2rem"} />
          </li>
          <li key="2">
            <Link to="/">
              <MdOutlineHome fontSize={"2.2rem"} />
            </Link>
          </li>
          <li key="3">
            <Link to="/myfollowerspost">
              <IoIosAlbums fontSize={"2.2rem"} />
            </Link>
          </li>
          <li key="4">
            <Link to="/createpost">
              <MdOutlinePostAdd fontSize={"2.2rem"} />
            </Link>
          </li>
          <li key="5">
            <Link to="/profile">
              <CgProfile fontSize={"2.2rem"} />
            </Link>
          </li>
          <li
            key="6"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              navigate("/signin");
            }}
          >
            <MdOutlineLogout fontSize={"2.2rem"} />
          </li>
        </div>,
      ];
    } else {
      return [
        <>
          <li key="0">
            <Link to="/signin">
              <VscSignIn fontSize={"2.2rem"} />
            </Link>
          </li>
        </>,
      ];
    }
  };

  const searchUser = (query) => {
    setSearch(query);

    fetch("/searchuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((result) => setUserFinded(result.user))
      .catch((err) => console.log(err));
  };

  return (
    <div className="navbar">
      <div className="  container ">
        <Link to={state ? "/" : "/signin"} className="brand-logo">
          <h2 className="brand-logo">MernGram</h2>
        </Link>
        <ul>{renderNav()}</ul>
      </div>

      {/* Modal Structure */}
      <div id="modal1" className="modal" ref={searchPanel}>
        <div className="modal-content" style={{ color: "#333" }}>
          <div className="input-field col s6">
            <i className="material-icons prefix">
              <MdSearch fontSize={"2rem"} />
            </i>
            <input
              id="icon_prefix"
              value={search}
              onChange={(e) => searchUser(e.target.value)}
              type="text"
              className="validate"
            />
            <label htmlFor="icon_prefix">Search...</label>
          </div>
          <br />
          <ul className="collection">
            {userFinded.map((user) => (
              <Link
                to={
                  user._id !== state._id ? `/profile/${user._id}` : "/profile"
                }
                key={user._id}
              >
                {" "}
                <li
                  onClick={() =>
                    M.Modal.getInstance(searchPanel.current).close()
                  }
                  className="collection-item avatar"
                  style={{ display: "block" }}
                >
                  <img src={user.pic} alt={user.email} className="circle" />
                  <span className="title">
                    {" "}
                    {user.name} <br /> {user.email}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="modal-footer">
          <button className="modal-close btn #0d47a1 blue darken-4">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
