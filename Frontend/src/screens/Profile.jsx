import React from "react";

export default function Profile() {
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
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="rasm"
          className="imgItem"
        />
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="rasm"
          className="imgItem"
        />
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="rasm"
          className="imgItem"
        />
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="rasm"
          className="imgItem"
        />
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="rasm"
          className="imgItem"
        />
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="rasm"
          className="imgItem"
        />
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="rasm"
          className="imgItem"
        />
      </div>
    </div>
  );
}
