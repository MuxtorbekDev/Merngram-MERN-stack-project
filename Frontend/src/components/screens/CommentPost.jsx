import React, { useContext } from "react";
import { GrClose } from "react-icons/gr";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

export default function CommentPost({ item }) {
  const [showComments, setShowComments] = React.useState(false);
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);

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
                    <Link
                      to={
                        c.postedBy._id !== state._id
                          ? `/profile/${c.postedBy._id}`
                          : "/profile"
                      }
                    >
                      <img src={c.postedBy.pic} alt="avatar" />
                    </Link>
                  </div>
                  <div className="text">
                    <Link
                      to={
                        c.postedBy._id !== state._id
                          ? `/profile/${c.postedBy._id}`
                          : "/profile"
                      }
                    >
                      <b>{c.postedBy.name} </b>
                      <p>{c.text}</p>
                    </Link>
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
