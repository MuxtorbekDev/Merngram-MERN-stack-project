import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import NoPosts from "./NoPosts";

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: {
        Authorization: "Muxtor " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserProfile(result);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {userProfile ? (
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
              <h4>{userProfile.user.name}</h4>
              <div className="infoProfile">
                <p>{userProfile.posts.length} posts </p>
                <p>99 followers</p>
                <p>99 following</p>
              </div>
            </div>
          </div>
          {userProfile.posts.length ? (
            <div className="gallery">
              {userProfile.posts.map((post) => (
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
