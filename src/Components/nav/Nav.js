import React, { useState,useEffect } from "react";
import styles from "./nav.module.css";
import g from "../gallery/gallery.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faWonSign } from '@fortawesome/free-solid-svg-icons';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import { Link ,useParams,Navigate} from "react-router-dom";
const Nav = (props) => {
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      // Toggle rerender state every 5 seconds
      setRerender(prevState => !prevState);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handlelogout =() =>
  {
    localStorage.setItem('name', "");
    localStorage.setItem('id',null);
    localStorage.setItem('log',false);
  }
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
           <li><FontAwesomeIcon icon={faUser} /> {localStorage.getItem('name')}</li> 
          {localStorage.getItem('name') === "" ? <Link to={"/login"}><li>Login</li></Link>:<button className={`${g.button}`} onClick={handlelogout}><li><Link to={"/login"}>log out</Link></li></button>}  
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
