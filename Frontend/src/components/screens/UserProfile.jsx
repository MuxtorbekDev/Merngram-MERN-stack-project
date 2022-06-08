import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

export default function UserProfile(props) {
  const [myPosts, setMyPosts] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const { userId } = useParams();

  console.log(userId);
  useEffect(() => {
    console.log("1");
    fetch(`/user/${userId}`, {
      headers: {
        Authorization: "Muxtor " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // setMyPosts(result.myPosts);
      });
  }, []);

  return (
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
          <h4>{state ? state.name : "Loading"} 1</h4>
          <div className="infoProfile">
            <p>99 posts</p>
            <p>99 followers</p>
            <p>99 following</p>
          </div>
        </div>
      </div>
      <div className="gallery">
        {myPosts.map((post) => (
          <div className="img-item">
            <img src={post.photo} alt={post.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
