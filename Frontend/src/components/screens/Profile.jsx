import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Loader from "./Loader";
import NoPosts from "./NoPosts";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function Profile() {
  const [myPosts, setMyPosts] = useState();
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");

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
              console.log(result);
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
              <h4>{state ? state.name : "Loading"}</h4>
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
