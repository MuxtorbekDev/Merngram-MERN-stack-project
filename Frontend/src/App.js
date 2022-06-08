import React, { createContext, useReducer, useEffect, useContext } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import "../node_modules/materialize-css/dist/css/materialize.min.css";
import "./App.css";
import SignIn from "./components/screens/LoginPage/SignIn";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import CreatePost from "./components/screens/CreatePost";
import { reducer, initialState } from "./reducers/userReducer";
import UserProfile from "./components/screens/UserProfile";

export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      navigate("/signin");
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="profile" index element={<Profile />}>
          {/* <Route path="/:userId" element={<UserProfile />} /> */}
        </Route>
        <Route path="/userprofile/:userId" element={<UserProfile />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </div>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
