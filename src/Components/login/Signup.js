import styles from "./login.module.css";
import {Outlet , Link } from 'react-router-dom';
import React, { useState , useEffect} from "react";
import axios from "axios";


 function Signup() {
   
   // useEffect(()=>{
   //               axios.post("https://reqres.in/api/users",form)
   //               .then(res =>{console.log(res);})
   //               .catch(err=>{console.log(err)});
   // },[]);


  const [name, setName] = useState("");
  const [repassword, setRepassword] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [form, setForm] = useState({
    username: "",
    email:"",
    phoneNumber:"",
    password: "",
    userType: "normal"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiurl ="http://localhost:8080/register";
    axios.post(apiurl, form)
      .then(res => {
        console.log(res);
        setName(res.status);
        setSuccess(true);
        setError(false);
        
      })
      .catch(err => {
        console.error('Registration failed:', err.response.data);
        setErrormsg(err.response.data);
        setError(true);
        setSuccess(false);


        
      });
  }

  const handleChange = (e) => {
    // Update form state with the new value entered in the input fields
    setForm({...form , [e.target.name]: e.target.value});

  }


  return (
    
    <div className={styles.main}>
  <div className={`${styles['form-container']} ${styles.reg}`}>
    <h2 className={styles.title}>Registeration</h2>
    <form className={styles.form} action="" onSubmit={handleSubmit}>
      <input type="text" name="username" className={styles.input} placeholder="username" required onChange={handleChange} />
      
      {/* <h6>your name is {name}</h6> */}
      <h6 className={styles.avalible} style={{display:'none'}}>this username is avalible</h6>
      <h6 className={styles.err} style={{display:'none'}}>this username is already used</h6>
      
      <input type="email" name="email" className={styles.input} placeholder="email" required onChange={handleChange}/>
      <input type="tel" name="phoneNumber" className={styles.input} placeholder="enter your phone number" required onChange={handleChange}/>
      <input type="password" name="password" className={styles.input} placeholder="Password" required onChange={handleChange}/>
      <input type="password" name="repassword" className={styles.input} required placeholder="Password confirmation" onChange={ (e)=> setRepassword(e.target.value)}/>
      
      {form.password !== repassword && repassword &&(<h6 className={styles.err}>the password is not match</h6>)}
      {(form.password !==repassword && repassword) ? <button className={styles['form-btn']} type='submit' disabled style={{backgroundColor:'gray'}} >send</button> : <button className={styles['form-btn']} type='submit'>send</button>}
      
    </form>
    <p className={styles['sign-up-label']}>
      already have account?<Link to={"/login"} className={styles['sign-up-link']}>log in</Link>
    </p>

    <div className={ success ? `${styles.block} ${styles.success}` : styles.none }>
      <p> your account created successfully</p>
    </div>
    <div className={ error ? `${styles.block} ${styles.fail}` : styles.none}>
      <p>{errormsg}</p>
    </div>
  </div>
</div>
  );
}

export default Signup;