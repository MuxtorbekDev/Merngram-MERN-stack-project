import React, { useEffect, useState } from "react";

export default function Profile() {
  const [myPosts, setMyPosts] = useState([]);

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
          <h4>Muxtorbek.Ravshanov</h4>
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
