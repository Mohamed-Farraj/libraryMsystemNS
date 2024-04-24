import { React, useState, useEffect } from "react";
import h from "./userhistory.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Userhistory = () => {
  let uid = useParams();
  const [x, setX] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [display, setdisplay] = useState("none");
  const [useid, setuid] = useState(0);
  const [bid, setbid] = useState(0);

  const getBorrowedBooks = () => {
    const apiurl = "http://localhost:8080/getBorrowedBooks";
    axios
      .get(apiurl)
      .then((res) => {
        console.log(" res", res.data);
        setX(res.data);
        console.log("x hold res", x.data);
        setError(false);
      })
      .catch((err) => {
        console.error("Add failed:", err.response.data);
        setErrormsg(err.response.data);
        setError(true);
        setSuccess(false);
      });
  };

  useEffect(getBorrowedBooks, []);

  function handleBorrow(bid,uid) {
      setdisplay("flex");
      setbid(bid);
      setuid(uid);
   
  }

  const returnHandler = () => {
    const apiurl = `http://localhost:8080/returnBorrowedBook/${useid}/${bid}`;
  
    axios
      .put(apiurl)
      .then((res) => {
        console.log("Book returned successfully:", res.data);
        setSuccess(true);
        getBorrowedBooks();
        // Handle success, e.g., show a success message or update UI
      })
      .catch((err) => {
        console.error("Failed to return book:", err.response.data);
        setError(true);
        setErrormsg(err.response.data);

        // Handle error, e.g., show an error message or handle the error condition
      });
  };
  

  return (
    <>
      <div className={`${h.history}`}>
        <h1 style={{ marginTop: "100px"}}>
          books you've borrowed {localStorage.getItem('name')}
        </h1>
        {console.log("x in jsx", x)}
        {x
  .filter((borrow) => borrow.user.userID === parseInt(uid.uname))
  .map((borrow, index) => (
    <div key={index} className={`${h.return}`}>
      <p>book id: {borrow.book.bookID}</p>
      <p>Title: {borrow.book.title}</p>
      <p>Author: {borrow.book.author}</p>
      <p>Status: {borrow.status}</p>
      <p>User ID: {borrow.user.userID}</p>
      {/* Move the event handler to a function with the correct parameters */}
      {/* <button onClick={() => handleBorrow(borrow.book.bookID, borrow.user.userID)}>Return Book</button> */}
      {borrow.status === "returned"?<button disabled style={{backgroundColor:'gray'}}>Book is returned</button>  : <button onClick={() => handleBorrow(borrow.book.bookID, borrow.user.userID)}>Return Book</button>}
      <div className={`${h.handlereturn}`} style={{ display: display }}>
        <button onClick={() =>{setdisplay("none");setErrormsg(""); setError(false);setSuccess(false);} }>Exit</button>

        <h3 className={h.philosopher}>
          return this book : {bid}
        </h3>
        <form onSubmit={(e) => { e.preventDefault(); returnHandler(); }}>
          {borrow.status === "returned"? <button disabled style={{backgroundColor:'gray'}}>Return It</button> : <button>Return It</button>}
          
        </form>
        {success === true && <h2 style={{ color: '#00ff00' }}>book returned  successfully!</h2>}
        {/* {borrow.status === "returned" && <h2 style={{ color: 'teal' }}>book already returned!</h2>} */}
        {error === true && <h2 style={{ color: '#ff0000' }}>{errormsg}</h2>}
      </div>

    </div>
  ))}

        
      </div>
    </>
  );
};

export default Userhistory;
