import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import Loader from "./Loader";
import NoPosts from "./NoPosts";

export default function Profile() {
  const [myPosts, setMyPosts] = useState();
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);

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

  return (
    <>
      {myPosts ? (
        <div className="profile">
          <div className="profileMain">
            <div>
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="Avatar"
                className="profileImg"
              />
            </div>
            <div>
              <h4>{state ? state.name : "Loading"}</h4>
              <div className="infoProfile">
                <p>{myPosts.length} posts</p>
                <p>99 followers</p>
                <p>99 following</p>
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
