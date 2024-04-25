import { React, useState } from "react";
import axios from "axios";
import stylescard from "./card.module.css";
import styles from "./booksmanage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Card = (props) => {
  const [name, setName] = useState("");
  const [hide, setHide] = useState("hide");
  const [hideD, setHideD] = useState("hide");
  const [hideB, setHideB] = useState("hide");
  const [updateBookActive, setUpdateBookActive] = useState(false);
  const [deleteBookActive, setDeleteBookActive] = useState(false);
  const [borrowBookActive, setBorrowBookActive] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [form, setForm] = useState(props.obj);

  const handleUpdateBook = (e) => {
    // e.preventDefault();
    // Add your logic for updating a book
    console.log("Updating book:", form);
    setUpdateBookActive(true);
    setDeleteBookActive(false);
    setBorrowBookActive(false);
    setHide("");
  };
  const handleDeleteBook = (e) => {
    // e.preventDefault();
    // Add your logic for deleting a book
    console.log("Deleting book:", form);
    setUpdateBookActive(false);
    setBorrowBookActive(false);
    setDeleteBookActive(true);
    setHideD("");
  };

  const handleBorrowBook = (e) => {
    console.log("Borrowing book:", form);
    setUpdateBookActive(false);
    setBorrowBookActive(true);
    setDeleteBookActive(false);
    setHideB("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateBookActive) {
      const apiurl = "http://localhost:8080/updateBook/" + props.obj.bookID;
      axios
        .put(apiurl, form)
        .then((res) => {
          console.log(res);
          // setName(res.status);
          setSuccess(true);
          setError(false);
          props.refresh();
        })
        .catch((err) => {
          console.error("Updating failed:", err.response);
          setErrormsg(err.response);
          setError(true);
          setSuccess(false);
        });
    } else if (deleteBookActive) {
      const apiurl = "http://localhost:8080/deleteBook/" + props.obj.bookID;
      axios
        .delete(apiurl)
        .then((res) => {
          console.log(res);
          setName(res.status);
          setSuccess(true);
          setError(false);
          props.refresh();
        })
        .catch((err) => {
          console.error("Delete failed:", err.response.data);
          setErrormsg(err.response.data);
          setError(true);
          setSuccess(false);
        });
    } else if (borrowBookActive) {
      const apiurl = `http://localhost:8080/borrow-book?userId=${props.usid}&bookId=${props.obj.bookID}`;
      const requestData = {
        bookId: props.obj.bookID,
        userId: parseInt(props.usid),
      };
      console.log("here is request data for borrow:", requestData);
      axios
        .post(apiurl)
        .then((res) => {
          console.log(res);
          // setName(res.status);
          setSuccess(true);
          setError(false);
          // props.refresh();
        })
        .catch((err) => {
          console.error("faild borrow book:", err);
          setErrormsg(err.response.data);
          setError(true);
          setSuccess(false);
        });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log("here is form  state:", form);
  return (
    <>
      <div className={`${styles.adminform} ${styles[hide]}`}>
        <button
          className={styles.icon}
          onClick={() => {
            setHide("hide");
            setUpdateBookActive(false);
            setSuccess(false);
            setError(false);
          }}
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <div className={styles.formtitle}>
          <h3>Update this book</h3>
        </div>
        <form
          className={`${styles.managebooks}`}
          action=""
          onSubmit={handleSubmit}
        >
          <input
            className={styles.half}
            name="title"
            value={form.title}
            type="text"
            placeholder="Book title"
            onChange={handleChange}
          />
          <input
            className={styles.half}
            name="author"
            value={form.author}
            type="text"
            placeholder="Book Author"
            onChange={handleChange}
          />
          <input
            className={styles.full}
            name="isbn"
            value={form.isbn}
            type="text"
            placeholder="ISBN"
            onChange={handleChange}
          />
          <input
            className={styles.half}
            name="rackNumber"
            value={form.rackNumber}
            type="number"
            placeholder="Rack number"
            min={0}
            onChange={handleChange}
          />
          <input
            className={styles.half}
            name="availableCopies"
            value={form.availableCopies}
            type="number"
            placeholder="Avalible copies"
            min={0}
            onChange={handleChange}
          />
          <input
            className={styles.full}
            name="totalCopies"
            value={form.totalCopies}
            type="number"
            placeholder="total copies"
            min={0}
            onChange={handleChange}
          />
          <input
            className={styles.full}
            name="imageLink"
            value={form.imageLink}
            type="text"
            placeholder="book cover source link"
            onChange={handleChange}
          />
          <div className={styles.buttons}>
            <button className={styles.sub} type="submit">
              Submit
            </button>
          </div>
          {success && (
            <div className={styles.formtitle} style={{ color: "#008080" }}>
              <h3>Book Updated Successfully</h3>
            </div>
          )}
          {error && (
            <div className={styles.formtitle} style={{ color: "#F00" }}>
              <h3>{errormsg}</h3>
            </div>
          )}
        </form>
      </div>

      <div className={`${styles.adminform} ${styles[hideD]}`}>
        <button
          className={styles.icon}
          onClick={() => {
            setHideD("hide");
            setSuccess(false);
            setError(false);
            setDeleteBookActive(false);
          }}
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <div className={styles.formtitle}>
          <h3>this book will be deleted . Are you sure?</h3>
        </div>
        <form
          className={`${styles.managebooks}`}
          action=""
          onSubmit={handleSubmit}
        >
          <div className={styles.buttons}>
            <button
              style={{ backgroundColor: "#F00" }}
              className={styles.sub}
              type="submit"
              onClick={handleDeleteBook}
            >
              Yes, delete it!
            </button>
          </div>
          {success && (
            <div className={styles.formtitle} style={{ color: "#008080" }}>
              <h3>Book deleted Successfully</h3>
            </div>
          )}
          {error && (
            <div className={styles.formtitle} style={{ color: "#F00" }}>
              <h3>{errormsg}</h3>
            </div>
          )}
        </form>
      </div>

      <div className={`${styles.adminform} ${styles[hideB]}`}>
        <button
          className={styles.icon}
          onClick={() => {
            setHideB("hide");
            setSuccess(false);
            setError(false);
            setBorrowBookActive(false);
          }}
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <div className={styles.formtitle}>
          {localStorage.getItem('id') === "null" ? (
            <h3 style={{ color: "red" }}>Please Login First!</h3>
          ) : (
            <h3 style={{color:"black"}}>Sure for this Borrow Book Request?</h3>
          )}
        </div>
        <form
          className={`${styles.managebooks}`}
          action=""
          onSubmit={handleSubmit}
        >
          <div className={styles.buttons}>
            {localStorage.getItem('id') !== "null" && (
              <button
                className={styles.sub}
                type="submit"
                onClick={handleBorrowBook}
              >
                Yes, Borrow it!
              </button>
            )}
          </div>
          {success && (
            <div className={styles.formtitle} style={{ color: "#008080" }}>
              <h3>Book Borrowed Successfully</h3>
            </div>
          )}
          {error && (
            <div className={styles.formtitle} style={{ color: "#F00" }}>
              <h3>{errormsg}</h3>
            </div>
          )}
        </form>
      </div>

      <div className={stylescard.card}>
        <div className={stylescard.soc}>
          {props.usertype === "user" ? (
            <button onClick={handleBorrowBook}>Borrow</button>
          ) : (
            <>
              <button>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onClick={handleUpdateBook}
                />
              </button>
              <button>
                <FontAwesomeIcon icon={faTrash} onClick={handleDeleteBook} />
              </button>
            </>
          )}
        </div>
        <div className={stylescard.chefimg}>
          <img src={props.obj.imageLink} alt="book cover" />
        </div>
        <div className={stylescard.aboutchef}>
          <h2 className="philosopher">{props.obj.title}</h2>
          <span>Author: {props.obj.author}</span>
          <br />
          <br />
          <p>
            <span>isbn: {props.obj.isbn}</span>
            <br />
            <br />
            {props.usertype === "admin" && (
              <>
                <span>rackNumber: {props.obj.rackNumber}</span>
                <br />
                <br />
              </>
            )}
            {props.usertype === "admin" && (
              <>
                <span>avalibleCopies: {props.obj.availableCopies}</span>
                <br />
                <br />
              </>
            )}
            {props.usertype === "admin" && (
              <>
                <span>totalCopies: {props.obj.totalCopies}</span>
                <br />
                <br />
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
