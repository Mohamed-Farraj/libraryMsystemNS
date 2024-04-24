import React from "react";
import style from "./footer.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import { faLifeRing } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";



const Foooter = () => {
  return (
    <>
      <footer>
        <div className={`${style.container}`}>
        <div className={`${style.content}`}>
          <div className={`${style.bookInfo}`}>
            
          <h3><FontAwesomeIcon icon={faInbox} /> Book Information?</h3>
          <p>Please send us an email at support@gmail.com</p>
          </div>
          <div className={`${style.needHelp}`}>
            
          <h3><FontAwesomeIcon icon={faLifeRing} /> Need Help?</h3>
          <p>Please call us at 0123456789</p>
          </div>  
          </div> 
          <div className={`${style.book} ${style.philosopherbold}`}><Link to={"#"}>WordWise</Link></div>

        </div>
        
        

      </footer>
    </>
  );
};

export default Foooter;
