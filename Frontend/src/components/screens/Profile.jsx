import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Loader from "./Loader";
import NoPosts from "./NoPosts";
import M from "materialize-css";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

export default function Profile() {
  const [myPosts, setMyPosts] = useState();
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [myName, setMyName] = useState("");

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Muxtor " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMyPosts(result.myPosts);
      });
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "MernGramMuxtorbek");
      data.append("cloud_name", "ddlhqjoih");
      fetch("https://api.cloudinary.com/v1_1/ddlhqjoih/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Muxtor " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, [image]);

  const uploadPhoto = (file) => {
    setImage(file);
  };

  const editProfile = () => {
    if (myName) {
      fetch("/editname", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Muxtor " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          myName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem(
            "user",
            JSON.stringify({ ...state, name: data.name })
          );
          dispatch({ type: "EDITPROFILE", payload: data.name });
          M.toast({
            html: "O'zgarishlar saqlandi!",
            classes: "#76ff03 light-green accent-3",
          });
        });
    }
    setIsEdit(false);
  };

  return (
    <>
      {myPosts ? (
        <div className="profile">
          <div className="profileMain">
            <div>
              <div className="containers">
                <img
                  src={state ? state.pic : "Loading..."}
                  alt="Avatar"
                  className="profileImg"
                />
                <div className="middles">
                  <div className="texts">
                    <label htmlFor="inputphoto" className="custom-file-upload">
                      <input
                        type="file"
                        id="inputphoto"
                        onChange={(e) => uploadPhoto(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                      <MdOutlineAddPhotoAlternate
                        fontSize={"2.2rem"}
                        color={"#fff"}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="profilename">
                <h4>{state ? state.name : "Loading"}</h4>
                <button
                  onClick={() => setIsEdit(true)}
                  className="btn #0d47a1 blue darken-4"
                  style={{ padding: "5px" }}
                >
                  <FaUserEdit fontSize={"2rem"} />
                </button>
              </div>
              <div className="infoProfile">
                <p>{myPosts.length} posts</p>
                <p>{state ? state.followers.length : "0"} followers</p>
                <p>{state ? state.following.length : "0"} following</p>
              </div>
              <div>
                <Link to="/myfollowerspost">
                  <button className="btnFollow">Show My Following Posts</button>
                </Link>
              </div>
            </div>
          </div>

          {isEdit ? (
            <div className="modalS" onClick={() => setIsEdit(false)}>
              <div
                className="modalS__content"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modalHeader">
                  <h4>Change Accaunt Profile</h4>
                  <i
                    style={{ cursor: "pointer", color: "#0d47a1" }}
                    onClick={() => setIsEdit(false)}
                    className="small material-icons "
                  >
                    close
                  </i>
                </div>
                <div className="modalContent">
                  <div className="file-field input-field">
                    <div className="btn #0d47a1 blue darken-4">
                      <span>
                        <i className="material-icons">add_a_photo</i>
                      </span>
                      <input
                        type="file"
                        onChange={(e) => uploadPhoto(e.target.files[0])}
                      />
                    </div>
                    <div className="file-path-wrapper">
                      <input
                        className="file-path validate"
                        type="text"
                        placeholder="You Photo"
                      />
                    </div>
                  </div>
                  <div className="input-field col s6">
                    <i
                      className="material-icons prefix"
                      style={{ color: "#0d47a1" }}
                    >
                      account_circle
                    </i>
                    <input
                      id="icon_prefix"
                      onChange={(e) => setMyName(e.target.value)}
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="icon_prefix">First Name</label>
                  </div>
                </div>
                <div className="modalFooter">
                  <button
                    className="btn #0d47a1 blue darken-4"
                    onClick={() => editProfile()}
                  >
                    Saqlash
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {myPosts.length ? (
            <div className="gallery">
              {myPosts.map((post) => (
                <div className="img-item" key={post._id}>
                  <img src={post.photo} alt={post.title} />
                </div>
              ))}
            </div>
          ) : (
            <NoPosts />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
