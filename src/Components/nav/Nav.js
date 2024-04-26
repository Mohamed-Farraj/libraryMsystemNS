import React, { useState,useEffect } from "react";
import styles from "./nav.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faWonSign } from '@fortawesome/free-solid-svg-icons';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import { Link ,useParams} from "react-router-dom";
const Nav = (props) => {
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      // Toggle rerender state every 5 seconds
      setRerender(prevState => !prevState);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <>
      <nav>
        <div className={`${styles.container}`}>
          <div className={`${styles.logo} ${styles.philosopher}`}>
           <Link to={"/home"}><h2>Word<span>Wise.</span></h2></Link> 
          </div>
          <ul className={`${styles.links}`}>
           <Link to={"/home"}><li>Home</li></Link> 
           <Link to={"/bookshelf"}><li>Book Shelf</li></Link>
           {/* <Link to={"/history"}><li>History</li></Link> */}
          {localStorage.getItem('name') === "" && <Link to={"/login"}><li>Login</li></Link>}  
           <li><FontAwesomeIcon icon={faUser} /> {localStorage.getItem('name')}</li> 
          </ul>
          <div className={`${styles.cart}`}>
            <span></span>
            {/* <button><FontAwesomeIcon icon={faBookOpen} /></button>   */}
            <button> <FontAwesomeIcon icon={faWonSign} /></button>  
          </div>
        </div>
        
      </nav>
    </>
  );
};

export default Nav;
