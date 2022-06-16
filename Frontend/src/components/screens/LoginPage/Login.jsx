import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import M from "materialize-css";

export default function Login(props) {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const nav = useNavigate();
  const {
    logEmail,
    logPassword,
    setLogEmail,
    setLogPassword,
    clicked,
    setClicked,
  } = props;
  const LogData = () => {
    if (
      // eslint-disable-next-line
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        logEmail
      )
    ) {
      M.toast({
        html: "Email manzilingizni tog'ri kiriting",
        classes: "#ff1744 red accent-3",
      });
      return;
    }

    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: logPassword,
        email: logEmail,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#ff1744 red accent-3" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log(data);
          dispatch({ type: "USER", payload: data.user });
          M.toast({
            html: "Siz muvaffaqiyatli kirish qildingiz",
            classes: "#2e7d32 green darken-3",
          });
          // history.push("/");
          nav("/");
        }
      });
  };
  return (
    <div className="form">
      <h2>Kirish</h2>
      <input
        type="email"
        placeholder="Email manzilingiz"
        value={logEmail}
        onChange={(e) => setLogEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Parolingiz"
        value={logPassword}
        onChange={(e) => setLogPassword(e.target.value)}
      />
      <button className="btn" onClick={() => LogData()}>
        Profilga kirish
      </button>
      <p className="signup">
        Akauntingiz yo'qmi? {" " /* eslint-disable-next-line */}
        <span onClick={() => setClicked(!clicked)}>Ro'yhatdan o'tish</span>
      </p>
    </div>
  );
}
