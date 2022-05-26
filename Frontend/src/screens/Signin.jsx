import React from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="myCard">
      <div className="card card__auth">
        <h3 className="mern-brend">MernGram</h3>
        <div className="input-field ">
          <i className="material-icons prefix">email</i>
          <input id="email" type="email" className="validate" />
          <label htmlFor="email">Emailnigiz? </label>
        </div>
        <div className="input-field">
          <i className="material-icons prefix">password</i>
          <input id="password" type="password" className="validate" />
          <label htmlFor="password">Parolingiz? </label>
        </div>
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Kirish
          <i className="material-icons right">send</i>
        </button>
        <p className="text-sign">
          Agar ruyhatdan o'tmagan bo'lsangiz{" "}
          <Link to="/signup">Ro'yhatdan o'tish</Link>
          tugmasini bosing
        </p>
      </div>
    </div>
  );
}
