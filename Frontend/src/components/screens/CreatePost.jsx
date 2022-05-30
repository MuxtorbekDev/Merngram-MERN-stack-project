import React from "react";

function CreatePost() {
  return (
    <div className="card input-field postCard">
      <h4>Post Yaratish</h4>
      <div>
        <div className="input-field col s6">
          <i class="material-icons prefix">title</i>
          <input id="title" type="text" className="validate" />
          <label htmlFor="title">Sarlavha</label>
        </div>
        <div className="input-field col s6">
          <i class="material-icons prefix">description</i>
          <textarea
            id="textarea1"
            className="materialize-textarea"
            defaultValue={""}
            rows="4"
          />
          <label htmlFor="textarea1">Maqola matni</label>
        </div>
      </div>

      <div className="file-field input-field">
        <div className="btn">
          <span>File</span>
          <input type="file" multiple />
        </div>
        <div className="file-path-wrapper">
          <input
            className="file-path validate"
            type="text"
            placeholder="Upload one or more files"
          />
        </div>
      </div>

      <button className="btn waves-effect waves-light" type="submit">
        Joylash
        <i className="material-icons right">send</i>
      </button>
    </div>
  );
}

export default CreatePost;
