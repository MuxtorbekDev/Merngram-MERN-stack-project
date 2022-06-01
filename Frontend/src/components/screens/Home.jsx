import React, { useState, useEffect } from "react";
import "./css/home.css";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Muxtor " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div id="home" className="home">
      <div className="row">
        {data
          .map((item) => {
            return (
              <div className="col s8" key={item._id}>
                <div className="card">
                  <div className="username">
                    <img
                      src="https://picsum.photos/id/237/200/300"
                      alt="user"
                    />
                    <p>{item.postedBy.name}</p>
                  </div>
                  <img
                    className="postImage"
                    src={item.photo}
                    alt={item.title}
                  />
                  <div className="status">
                    <div className="like">
                      <i class="material-icons">favorite</i>
                      <i class="material-icons">message</i>
                    </div>

                    <div>
                      <b>{item.title}</b>
                      <p>{item.body}</p>
                    </div>
                    <div className="comment">
                      <b>johndoe</b> So stunning
                    </div>
                  </div>
                  <div className="commentInput">
                    <textarea placeholder="Add a comment…"></textarea>
                  </div>
                </div>
              </div>
            );
          })
          .reverse()}

        <div className="col s3">
          <h1>Postlarim </h1>
        </div>
      </div>
    </div>
  );
}
