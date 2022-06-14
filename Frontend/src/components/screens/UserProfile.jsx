import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Loader from "./Loader";
import NoPosts from "./NoPosts";

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const { userId } = useParams();
  const { state, dispatch } = useContext(UserContext);
  const [showFollow, setShowFollow] = useState(
    state ? !state.following.includes(userId) : true
  );

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

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Muxtor " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: {
            following: data.following,
            followers: data.followers,
          },
        });
        localStorage.setItem("user", JSON.stringify(data));
        console.log(data);
        setUserProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
            // following: [...prevState.user.following, data._id],
          };
        });
      });

    setShowFollow(!showFollow);
  };

  const unFollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Muxtor " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: {
            following: data.following,
            followers: data.followers,
          },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setUserProfile((prevState) => {
          const newFollowers = prevState.user.followers.filter(
            (s) => s != data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollowers,
            },
          };
        });
      });
    setShowFollow(!showFollow);
  };
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
                <p>{userProfile.user.followers.length} followers</p>
                <p>{userProfile.user.following.length} following</p>
              </div>
              <div>
                {showFollow ? (
                  <button className="btnFollow" onClick={() => followUser()}>
                    Follow
                  </button>
                ) : (
                  <button className="btnFollow" onClick={() => unFollowUser()}>
                    Un Follow
                  </button>
                )}
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
