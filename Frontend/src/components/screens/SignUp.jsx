import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="myCard">
      <div className="card card__auth">
        <h3 className="mern-brend">MernGram</h3>
        <div className="input-field col s6">
          <i className="material-icons prefix">account_circle</i>
          <input id="name" type="text" className="validate" />
          <label htmlFor="name">Ismingiz?</label>
        </div>
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
          Ruyhatdan o'tish
          <i className="material-icons right">send</i>
        </button>
        <p className="text-sign">
          Agar ruyhatdan o'tgan bo'lsangiz <Link to="/signin">Kirish</Link>{" "}
          tugmasini bosing
        </p>
      </div>
    </div>
  );
}
