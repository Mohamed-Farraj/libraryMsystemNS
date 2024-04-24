import { Outlet, Link ,useNavigate} from "react-router-dom";
import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import Liberarian from "../librarian/Liberarian";
import log from "./login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
export const UserNameContext = createContext();

function Login() {
  const [name, setName] = useState();
  const [result, setResult] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [re, setre] = useState();
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });
  let  navigate = useNavigate();
  // console.log("here si form", form);

  // const handleSubmit = (e) => {
  // e.preventDefault();

  async function loginsubmit(values) {
    const apiurl = "http://localhost:8080/login";
    console.log("this values",values);
    await axios
      .post(apiurl, values)
      .then((res) => {
        setName(res.data.userID);
        localStorage.setItem('id', res.data.userID);
        localStorage.setItem('name', res.data.username);
        console.log(res, name);
        setResult(res);
        setSuccess(true);
        setError(false);
        // setForm({ userName: "", password: "" });
        // <UserNameContext.Provider value={name}>
        //   <Liberarian />
        // </UserNameContext.Provider>;
      })
      .catch((err) => {
        console.error("Registration failed:", err.response.data);
        setErrormsg(err.response.data);
        setError(true);
        setSuccess(false);
      });
  }

  let initial = {
    userName: "",
    password: "",
  };

  let logformik = useFormik({
    initialValues: initial,
    onSubmit: loginsubmit,
  });

  // };

  // const handleChange = (e) => {
  //   // Update form state with the new value entered in the input fields
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  if (error === false && result.data.userType === "normal") {
    navigate(`/home/${name}`)
    // window.location.href = "/home/" + name;
    // <Link to={"/home/" + name}></Link>
  } else if (error === false && result.data.userType === "admin") {
    console.log("here is form", form);
    navigate(`/liberarian/${name}`)

    // <Link to={`/liberarian/ + ${name}`}></Link>

    // window.location.href = "/liberarian/" + name;
    // return<Liberarian />;
    // setre(true)
  }

  return (
    <div className={`${log.main}`}>
      <div className={`${log["form-container"]}`}>
        <h2 className={`${log.title}`}>Log in</h2>
        <form
          className={`${log.form}`}
          action=""
          required
          onSubmit={logformik.handleSubmit}
        >
          <input
            type="text"
            name="userName"
            required
            // value={form.userName}
            className={`${log.input}`}
            placeholder="username"
            onChange={logformik.handleChange}
            onBlur={logformik.handleBlur}
          />
          <input
            type="password"
            name="password"
            className={`${log.input}`}
            placeholder="Password"
            required
            onChange={logformik.handleChange}
            onBlur={logformik.handleBlur}

          />
          <button className={`${log["form-btn"]}`} type="submit">
            Log in
          </button>

          {error === true && <h6 className={`${log.err}`}>{errormsg}</h6>}
          {/* {name} */}
        </form>
        <p className={`${log["sign-up-label"]}`}>
          Don't have an account?
          <Link to={"/registere"} className={`${log["sign-up-link"]}`}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
