import React, { useContext } from "react";
import { Link, Outlet, Route, useParams } from "react-router-dom";
import styles from "./liberarian.module.css";
import books from "../../media/books.jpg";
import users from "../../media/users.jpg";
import { UserNameContext } from "../login/Login";
import BooksManage from "./BooksManage";
import UsersManage from "./UsersManage";

const Liberarian = () => {
  // const urlParams = new URLSearchParams(window.location.search);
  // const username = urlParams.get('userName');
  let name = useParams();

  const n = useContext(UserNameContext);

  return (
    <>
      <div className={styles.home}>
        <div className={styles.greet}>
          {/* <h2>Welcome,{name.uname}</h2> */}
        </div>

        <div className={styles.manage}>
          <img src={books} alt="book manage" />
          <Link to={"bookmanager"}>
            <div className={styles.layer}>
              <h3>Manage Books</h3>
            </div>
          </Link>
        </div>
        <div className={styles.manage}>
          <img src={users} alt="users manage" />
          <Link to={"usermanager"}>
            <div className={styles.layer}>
              <h3>Manage Users</h3>
            </div>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Liberarian;
