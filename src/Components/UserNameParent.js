// import '../styles/login.css';
import { Link } from "react-router-dom";
import React, { useState, createContext } from "react";
import axios from "axios";
import Liberarian from "./librarian/Liberarian";

export const UserNameContext = createContext();

function UserNameParent() {
  const [userName, setUserName] = useState("");

  return (
    <UserNameContext.Provider value={userName}>
      <Login setUserName={setUserName} />
      <Liberarian />
    </UserNameContext.Provider>
  );
}

function Login({ setUserName }) {
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiurl = "http://localhost:8080/login";
    axios
      .post(apiurl, form)
      .then((res) => {
        console.log(res);
        setUserName(res.data.username); // Set the username directly from the form upon successful login
        setError(false);
      })
      .catch((err) => {
        console.error("Login failed:", err.response.data);
        setErrormsg(err.response.data);
        setError(true);
      });
  };

  const handleChange = (e) => {
    // Update form state with the new value entered in the input fields
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="main">
      <div className="form-container">
        <h2 className="title">Log in</h2>
        <form className="form" action="" required onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            required
            className="input"
            placeholder="username"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <button className="form-btn" type="submit">
            Log in
          </button>
          {error && <h6 className="err">{errormsg}</h6>}
        </form>
        <p className="sign-up-label">
          Don't have an account?
          <Link to={"/registere"} className="sign-up-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserNameParent;
