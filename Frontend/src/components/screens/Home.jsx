import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { FcLike } from "react-icons/fc";
import { RiHeart3Line } from "react-icons/ri";
import { TbSend } from "react-icons/tb";
import "./css/home.css";
import CommentPost from "./CommentPost";

export default function Home() {
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Muxtor " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Muxtor " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const unLikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Muxtor " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const commentsPost = (text, postId) => {
    fetch("/comments", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Muxtor " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="home" className="home">
      <div className="homePage">
        <div className="allPost">
          {data
            .map((item) => {
              return (
                <div className="" key={item._id}>
                  <div className="card">
                    <div className="username">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"
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
                      <div className="likeComment">
                        <div className="like">
                          {!item.likes.includes(state._id) ? (
                            <RiHeart3Line
                              onClick={() => likePost(item._id)}
                              fontSize={"2rem"}
                            />
                          ) : (
                            <FcLike
                              onClick={() => unLikePost(item._id)}
                              fontSize={"2rem"}
                            />
                          )}
                          <span style={{ fontSize: "1.2rem" }}>
                            {item.likes.length} Likes
                          </span>
                        </div>
                        <CommentPost item={item} />
                      </div>

                      <div>
                        <b>{item.title}</b>
                        <p>{item.body}</p>
                      </div>
                    </div>

                    <div className="commentInput">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          commentsPost(e.target[0].value, item._id);
                          e.target[0].value = "";
                        }}
                      >
                        <input type="text" placeholder="Add a comment…" />
                        <button type="submit" className="sendComment">
                          {" "}
                          <TbSend fontSize={"2rem"} />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              );
            })
            .reverse()}
        </div>
        <div className="homePage2">
          <h1>Postlarim </h1>
        </div>
      </div>
    </div>
  );
}
