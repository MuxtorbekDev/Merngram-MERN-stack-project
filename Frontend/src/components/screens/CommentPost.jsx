import React from "react";
import { GrClose } from "react-icons/gr";
import { FaRegComment } from "react-icons/fa";

export default function CommentPost({ item }) {
  const [showComments, setShowComments] = React.useState(false);

  return (
    <>
      <div className="comment">
        <FaRegComment
          fontSize={"2rem"}
          onClick={() => setShowComments(!showComments)}
        />
        <span style={{ fontSize: "1.2rem" }}>
          {item.comments.length} Comments
        </span>
      </div>
      {showComments ? (
        <div className="comments">
          <div className="close">
            <GrClose
              fontSize={"2rem"}
              onClick={() => setShowComments(!showComments)}
            />
          </div>
          <div className="comment-boxs">
            {item.comments
              .map((c) => (
                <div className="comment-box" key={c._id}>
                  <div className="avatar">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"
                      alt="avatar"
                    />
                  </div>
                  <div className="text">
                    <b>{c.postedBy.name} </b>
                    <p>{c.text}</p>
                  </div>
                </div>
              ))
              .reverse()}
          </div>
        </div>
      ) : null}
    </>
  );
}
