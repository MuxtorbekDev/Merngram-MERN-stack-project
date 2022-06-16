import { useState, useEffect } from "react";
import "../css/style.css";
import M from "materialize-css";
import Login from "./Login";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function SignIn() {
  const [regName, setRegName] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [image, setImage] = useState(undefined);
  const [url, setUrl] = useState("");

  const uploadPicture = () => {
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
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ourFields = () => {
    if (
      // eslint-disable-next-line
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        regEmail
      )
    ) {
      M.toast({
        html: "Email manzilingizni tog'ri kiriting",
        classes: "#ff1744 red accent-3",
      });
      return;
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: regName,
        password: regPassword,
        email: regEmail,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#ff1744 red accent-3" });
        } else {
          M.toast({ html: data.msg, classes: "#2e7d32 green darken-3" });
          setClicked(!clicked);
        }
      });
  };

  const postData = () => {
    if (image) {
      uploadPicture();
    } else {
      ourFields();
    }
  };

  useEffect(() => {
    if (url) {
      ourFields();
    }
  }, [url]);

  return (
    <>
      <section className="sign">
        <div className={clicked ? "container active" : "container"}>
          <div className="user signinBx">
            <div className="imgBx">
              <img
                src="https://images.unsplash.com/photo-1576859958081-27de5c70262a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                alt="sign"
              />
            </div>
            <div className="formBx">
              <Login
                logEmail={logEmail}
                logPassword={logPassword}
                setLogEmail={setLogEmail}
                setLogPassword={setLogPassword}
                clicked={clicked}
                setClicked={setClicked}
              />
            </div>
          </div>
          <div className="user signupBx">
            <div className="formBx">
              <div className="form">
                <h2>Ro'yhatdan o'tish</h2>
                <div className="containers">
                  <img
                    src="https://res.cloudinary.com/ddlhqjoih/image/upload/v1655353222/samples/usernophoto_bcagpc.png"
                    alt="Avatar"
                    className="images"
                  />
                  <div className="middles">
                    <div className="texts">
                      <label
                        htmlFor="inputphoto"
                        className="custom-file-upload"
                      >
                        <input
                          type="file"
                          id="inputphoto"
                          onChange={(e) => setImage(e.target.files[0])}
                          style={{ display: "none" }}
                        />
                        <MdOutlineAddPhotoAlternate
                          fontSize={"2.2rem"}
                          color={"#fff"}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Ismingiz"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email Manzilingiz"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Parolingiz"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
                <button className="btn" onClick={() => postData()}>
                  Ro'yhatdan o'tish
                </button>
                <p className="signup">
                  Akauntingiz bormi?{" " /* eslint-disable-next-line */}
                  <span onClick={() => setClicked(!clicked)}>
                    Akauntga kirish
                  </span>
                </p>
              </div>
            </div>
            <div className="imgBx">
              <img
                alt="sign"
                src="https://images.unsplash.com/photo-1526925539332-aa3b66e35444?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmxhY2slMjBjb2Rpbmd8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
