import React, { useState, useEffect } from "react";
import style from "./shelf.module.css";
import axios from "axios";
import Card from "../card/Card";
import { useParams } from "react-router-dom";
const Shelf = () => {
  const [search, setSearch] = useState("");
  const [x, setX] = useState([]);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [selects, setSelects] = useState("");
  const [hide, setHide] = useState("hide");
  const [success, setSuccess] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  let id =useParams();

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

  const displayBooks = (q) => {
    console.log("here is x:", x);
    const uid = id.uname;
    console.log("uid", uid);

    if (q.trim() === "") {
      const uniqueBookIDs = new Set(x.map((book) => book.bookID));
      const uniqueFilteredBooks = x.filter((book) =>
        uniqueBookIDs.has(book.bookID)
      );
      // Reverse the array and map over the unique filtered books
      console.log("no filter ufb:", uniqueFilteredBooks);
      if (selects === "Oldest") {
        return uniqueFilteredBooks.map((book) => (
          <Card
            key={book.bookID}
            obj={book}
            refresh={getAllBooks}
            usertype="user"
            usid= {localStorage.getItem('id')}
          />
        ));
      }
      return uniqueFilteredBooks
        .reverse()
        .map((book) => (
          <Card
            key={book.bookID}
            obj={book}
            refresh={getAllBooks}
            usertype="user"
            usid={localStorage.getItem('id')}
          />
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
        ...filteredBooksracknumber,
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
      if (selects === "Oldest") {
        return uniqueFilteredBooks.reverse().map((book) => (
          <Card
            key={book.bookID}
            obj={book}
            refresh={getAllBooks}
            usertype="user"
            usid={localStorage.getItem('id')}

          />
        ));
      }
      return uniqueFilteredBooks
        // .reverse()
        .map((book) => (
          <Card
            key={book.bookID}
            obj={book}
            refresh={getAllBooks}
            usertype="user"
            usid={localStorage.getItem('id')}
          />
        ));
      // return filteredBooks.toReversed().map((book) => (
      //   <Card key={book.bookID} obj={book} refresh={getAllBooks} usertype="admin"/>
      // ));
    }
  };

  return (
    <>
      <div className={`${style.shelf}`}>
        <div className={`${style.filters}`}>
          <input
            className={style.searchBooks}
            type="text"
            placeholder="Search by Book Title , Author Name ,ISBN"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <label htmlFor="select">Sort by: {localStorage.getItem('id')}</label>
          <select
            id="select"
            value={selects}
            onChange={(e) => {
              setSelects(e.target.value);
            }}
          >
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
        <div className={`${style.books}`}>
          <h1>{displayBooks(search).length}{} Books Avalible</h1>
          {displayBooks(search)}
        </div>
      </div>
    </>
  );
};

export default Shelf;
