import React, { useState } from "react";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "MernGramMuxtorbek");
    data.append("cloud_name", "ddlhqjoih");
    fetch("https://api.cloudinary.com/v1_1/ddlhqjoih/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("/createpost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#ff1744 red accent-3" });
        } else {
          M.toast({ html: data.msg, classes: "#2e7d32 green darken-3" });
          navigate("/");
        }
      });
  };

  return (
    <div className="card input-field postCard">
      <h4>Post Yaratish</h4>
      <div>
        <div className="input-field col s6">
          <i className="material-icons prefix">title</i>
          <input
            id="title"
            type="text"
            className="validate"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="title">Sarlavha</label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">description</i>
          <textarea
            id="textarea1"
            className="materialize-textarea"
            defaultValue={body}
            onChange={(e) => setBody(e.target.value)}
            rows="4"
          ></textarea>
          <label htmlFor="textarea1">Maqola matni</label>
        </div>
      </div>

      <div className="file-field input-field">
        <div className="btn">
          <span>File</span>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            // multiple
          />
        </div>
        <div className="file-path-wrapper">
          <input
            className="file-path validate"
            type="text"
            placeholder="Upload one or more files"
          />
        </div>
      </div>

      <button
        className="btn waves-effect waves-light"
        onClick={() => postDetails()}
      >
        Joylash
        <i className="material-icons right">send</i>
      </button>
    </div>
  );
}

export default CreatePost;
