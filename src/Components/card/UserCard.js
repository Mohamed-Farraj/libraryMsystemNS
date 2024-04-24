import {React,useState} from 'react';
import axios from 'axios';
import styles from "./booksmanage.module.css";
import stylescard from "./card.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';



const UserCard = (props) => {

  const [name, setName] = useState("");
  const [hide, setHide] = useState("hide");
  const [hideD, setHideD] = useState("hide");
  const [updateBookActive, setUpdateBookActive] = useState(false);
  const [deleteBookActive, setDeleteBookActive] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [form, setForm] = useState(props.obj);

  

//   const handleUpdateBook = (e) => {
//     // e.preventDefault();
//     // Add your logic for updating a book
//     console.log("Updating book:", form);
//     setUpdateBookActive(true);
//     setDeleteBookActive(false);
//     setHide("")

// };
const handleDeleteBook = (e) => {
    // e.preventDefault();
    // Add your logic for deleting a book
    console.log("Deleting book:", form);
    setUpdateBookActive(false);
    setDeleteBookActive(true);
    setHideD("");
};


const handleSubmit = (e) => {
  e.preventDefault();
//    if(updateBookActive){
//       const apiurl ="http://localhost:8080/updateBook/"+props.obj.bookID;
//       axios.put(apiurl, form)
//         .then(res => {
//           console.log(res);
//           // setName(res.status);
//           setSuccess(true);
//           setError(false);
//           props.refresh();
//         })
//         .catch(err => {
//           console.error('Updating failed:', err.response);
//           setErrormsg(err.response);
//           setError(true);
//           setSuccess(false);
//         });
//   }

      const apiurl ="http://localhost:8080/deleteUser";
      axios.delete(apiurl , {params:{id:props.obj.userID}})
        .then(res => {
          console.log(res);
          setName(res.status);
          setSuccess(true);
          setError(false);
          props.refresh();
        })
        .catch(err => {
          console.error('Delete failed:', err.response.data);
          setErrormsg(err.response.data);
          setError(true);
          setSuccess(false);
        });
}

// const handleChange = (e) => {
//   setForm({...form , [e.target.name]: e.target.value});
// }

    console.log("here is form  state:",form);
    return(
    <>
    <div className={`${styles.adminform} ${styles[hideD]}`}>
      <button className={styles.icon} onClick={() => {setHideD("hide"); setSuccess(false); setError(false); setDeleteBookActive(false);}}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </button>
      <div className={styles.formtitle}><h3>this book will be deleted . Are you sure?</h3></div>
      <form className={`${styles.managebooks} `} action="" onSubmit={handleSubmit}>
        <div className={styles.buttons}>
          <button style={{ backgroundColor: '#F00' }} className={styles.sub} type='submit' onClick={handleDeleteBook}>
            Yes, delete it!
          </button>
        </div>
        {success && <div className={styles.formtitle} style={{ color: '#008080' }}><h3>Book deleted Successfully</h3></div>}
        {error && <div className={styles.formtitle} style={{ color: '#F00' }}><h3>{errormsg}</h3></div>}
      </form>
    </div>

    <div className={stylescard.card} style={{ height: 'auto'}}>
      <div className={stylescard.soc} style={{ backgroundColor: 'transparent', height: 'auto', width: 'auto', top: '75%', right: '8px' }}>
        {/* <button><FontAwesomeIcon icon={faPenToSquare} onClick={handleUpdateBook}/></button> */}
        <button style={{ color: '#F00' }}><FontAwesomeIcon icon={faTrash} onClick={handleDeleteBook} /></button>
      </div>
      <div className={stylescard.aboutchef} style={{ padding: '1rem', wordWrap: 'break-word' }}>
        <h3 className="philosopher">{props.obj.username}</h3><br/>
        <p>
          <span>email : {props.obj.email}</span><br/><br/>
          <span>phone : {props.obj.phoneNumber}</span><br/><br/>
          <span>user type : {props.obj.userType}</span>
        </p>
      </div>
    </div>
  </>
    );
}

export default UserCard;
