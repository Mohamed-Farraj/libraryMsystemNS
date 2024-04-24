import { React, useState, useEffect } from "react";
import defimg from "../../media/books-cover/default.jpg"; //i want to add this
import Card from "../card/Card";
import styles from "./booksmanage.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const BooksManage = () => {
  const [name, setName] = useState("");
  const [hide, setHide] = useState("hide");
  const [addBookActive, setAddBookActive] = useState(false);
  const [updateBookActive, setUpdateBookActive] = useState(false);
  const [deleteBookActive, setDeleteBookActive] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    rackNumber: 0,
    availableCopies: 0,
    totalCopies: 0,
    imageLink: defimg,
  });
  const [x, setX] = useState([]);

  const getAllBooks = () => {
    const apiurl = "http://localhost:8080/getAllBooks";
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

  useEffect(getAllBooks, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiurl = "http://localhost:8080/addBook";
    axios
      .post(apiurl, form)
      .then((res) => {
        console.log(res);
        setName(res.status);
        // setX([...x, res.data]);
        setSuccess(true);
        setError(false);
        getAllBooks();
      })
      .catch((err) => {
        console.error("Add failed:", err.response.data);
        setErrormsg(err.response.data);
        setError(true);
        setSuccess(false);
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleAddBook = (e) => {
    e.preventDefault();
    // Add your logic for adding a book

    console.log("Adding book:", form);
    setHide("");
    setAddBookActive(true);
  };

  const displayBooks = (q) => {
    console.log("here is x:", x);
    if (q.trim() === "") {
      const uniqueBookIDs = new Set(x.map((book) => book.bookID))
      const uniqueFilteredBooks = x.filter((book) =>
      uniqueBookIDs.has(book.bookID)
);
// Reverse the array and map over the unique filtered books
console.log("no filter ufb:",uniqueFilteredBooks);
return uniqueFilteredBooks.reverse().map((book) => (
  <Card key={book.bookID} obj={book} refresh={getAllBooks} usertype="admin"/>
));

      // return x.toReversed().map((book) => {
      //   return <Card key={book.bookID} obj={book} refresh={getAllBooks} usertype="admin"/>;
      // });


    } else {
      const filteredBookstitle = x.filter((book) =>
        book.title.toLowerCase().includes(q.toLowerCase())
      );
      const filteredBooksauthor = x.filter((book) =>
        book.author.toLowerCase().includes(q.toLowerCase())
      );
      const filteredBooksisbn = x.filter((book) =>
        book.isbn.toLowerCase().includes(q.toLowerCase())
      );
      const filteredBooksracknumber = x.filter((book) => {
        const rackNumberString = book.rackNumber.toString();
        console.log("rackNumber:", rackNumberString); // Log the rackNumber value
        return rackNumberString.includes(q);
      });
      
      const filteredBooks = [
        ...filteredBookstitle,
        ...filteredBooksauthor,
        ...filteredBooksisbn,
        ...filteredBooksracknumber 
      ];

      const uniqueBooksMap = new Map();

// Iterate over filteredBooks to add unique books to uniqueBooksMap
filteredBooks.forEach((book) => {
  // Check if the bookID already exists in the map
  if (!uniqueBooksMap.has(book.bookID)) {
    // If not, add the book to the map
    uniqueBooksMap.set(book.bookID, book);
  }
});

// Convert the map values (unique books) to an array
const uniqueFilteredBooks = Array.from(uniqueBooksMap.values());

// Reverse the array and map over the unique filtered books
console.log("this is ufb", uniqueFilteredBooks);
return uniqueFilteredBooks.reverse().map((book) => (
  <Card key={book.bookID} obj={book} refresh={getAllBooks} usertype="admin" />
));
      // return filteredBooks.toReversed().map((book) => (
      //   <Card key={book.bookID} obj={book} refresh={getAllBooks} usertype="admin"/>
      // ));
    }
  };

  return (
    <>
  <div className={styles.homeb}>
    <button className={`${styles.act} ${styles.add}`} onClick={handleAddBook}>
      Want to Add New book?
    </button>

    <input
      className={styles.searchBooks}
      type="text"
      placeholder="Search by Book Title , Author Name ,ISBN ,rack Number"
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    />

    {displayBooks(search)}

    <div className={`${styles.adminform} ${styles[hide]}`}>
      <button
        className={styles.icon}
        onClick={() => {
          setHide("hide");
          setSuccess(false);
        }}
      >
        <FontAwesomeIcon icon={faCircleXmark} />
      </button>
      <div className={styles.formtitle}>
        <h3>add new book</h3>
      </div>
      <form className={`${styles.managebooks}`} action="" onSubmit={handleSubmit}>
        <input
          className={styles.half}
          name="title"
          type="text"
          placeholder="Book title"
          onChange={handleChange}
        />
        <input
          className={styles.half}
          name="author"
          type="text"
          placeholder="Book Author"
          onChange={handleChange}
        />
        <input
          className={styles.full}
          name="isbn"
          type="text"
          placeholder="ISBN"
          onChange={handleChange}
        />
        <input
          className={styles.half}
          name="rackNumber"
          type="number"
          placeholder="Rack number"
          min={0}
          onChange={handleChange}
        />
        <input
          className={styles.half}
          name="availableCopies"
          type="number"
          placeholder="Avalible copies"
          min={0}
          onChange={handleChange}
        />
        <input
          className={styles.full}
          name="totalCopies"
          type="number"
          placeholder="total copies"
          min={0}
          onChange={handleChange}
        />
        <input
          className={styles.full}
          name="imageLink"
          type="text"
          placeholder="book cover source link"
          onChange={handleChange}
        />
        <div className={styles.buttons}>
          <button className={styles.sub} type="submit">
            Submit
          </button>
          {success && (
            <div className={styles.formtitle} style={{ color: "#008080" }}>
              <h3>Book Added Successfully</h3>
            </div>
          )}
          {error && (
            <div className={styles.formtitle} style={{ color: "#F00" }}>
              <h3>{errormsg}</h3>
            </div>
          )}
        </div>
      </form>
    </div>
  </div>
</>

  );
};

export default BooksManage;
