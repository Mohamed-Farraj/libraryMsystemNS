import { React, useState, useEffect } from "react";
import defimg from "../../media/books-cover/default.jpg"; //i want to add this
import styles from "./booksmanage.module.css";
import axios from "axios";
import UserCard from "../card/UserCard";

const UsersManage = () => {
  const [deleteBookActive, setDeleteBookActive] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [search, setSearch] = useState("");
  const [x, setX] = useState([]);

  const getAllUsers = () => {
    const apiurl = "http://localhost:8080/getAllUsers";
    axios
      .get(apiurl)
      .then((res) => {
        console.log(res);
        setX(res.data);
        setError(false);
      })
      .catch((err) => {
        console.error("Add failed:", err.response.data);
        setErrormsg(err.response.data);
        setError(true);
        setSuccess(false);
      });
  };

  useEffect(getAllUsers, []);

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //         const apiurl ="http://localhost:8080/addUser";
  //         axios.post(apiurl, form)
  //           .then(res => {
  //             console.log(res);
  //             setName(res.status);
  //             // setX([...x, res.data]);
  //             setSuccess(true);
  //             setError(false);
  //             getAllUsers();
  //           })
  //           .catch(err => {
  //             console.error('Add failed:', err.response.data);
  //             setErrormsg(err.response.data);
  //             setError(true);
  //             setSuccess(false);
  //           });
  //   }

  //   const handleChange = (e) => {
  //     setForm({...form , [e.target.name]: e.target.value});
  //   }
  //   const handleAddBook = (e) => {
  //     e.preventDefault();
  //     // Add your logic for adding a book

  //     console.log("Adding book:", form);
  //     setHide("");
  //     setAddBookActive(true);
  // };

  const displayUsers = (q) => {
    console.log("here is x:", x);
    if (q === "") {
      return x.map((user) => {
        return <UserCard key={user.userID} obj={user} refresh={getAllUsers} />;
      });
    } else {
      const filteredusers = x.filter((user) =>
        user.username.toLowerCase().includes(q.toLowerCase())
      );
      return filteredusers.map((user) => (
        <UserCard key={user.userID} obj={user} refresh={getAllUsers} />
      ));
    }
  };

  return (
    <>
  <div className={styles.homeb}>
    {/* <button className="act add"  onClick={handleAddBook}>Want to Add New book?</button> */}

    <input
      className={styles.searchBooks} // Use the CSS module class name
      type="text"
      placeholder="Search by User Name"
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    />

    {displayUsers(search)}

    {/* <div className={"adminform "+hide}>
    <button className="icon" onClick={()=>{setHide("hide");setSuccess(false)}}><FontAwesomeIcon icon={faCircleXmark} /></button>
    <div className='formtitle'><h3>add new book</h3></div>
        <form className={'managebooks '} action=""  onSubmit={handleSubmit}>
            <input className="half" name='title'  type="text" placeholder="Book title" onChange={handleChange}/>
            <input className="half" name='author'  type="text" placeholder="Book Author" onChange={handleChange}/>
            <input className="full" name='isbn'  type="text" placeholder="ISBN" onChange={handleChange}/>
            <input className="half" name='rackNumber'  type="number" placeholder="Rack number" min={0} onChange={handleChange}/> 
            <input className="half" name='availableCopies'  type="number" placeholder="Avalible copies" min={0} onChange={handleChange}/> 
            <input className="full" name='totalCopies'  type="number" placeholder="total copies" min={0} onChange={handleChange}/> 
            <input className="full" name='imageLink'  type="text" placeholder="book cover source link" onChange={handleChange}/>
            <div className="buttons">
            <button className='sub' type='submit'>Submit</button>
            { success && <div className='formtitle' style={{color: '#008080'}}><h3>Book Added Successfully</h3></div>}
            { error &&<div className='formtitle' style={{color: '#F00'}}><h3>{errormsg}</h3></div>}

            </div>
        </form>
    </div> */}
  </div>
</>
  );
};

export default UsersManage;
