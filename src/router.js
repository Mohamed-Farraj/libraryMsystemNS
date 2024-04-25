import { createBrowserRouter } from "react-router-dom";
import Welcome from "./Components/Welcome";
import Login from "./Components/login/Login";
import Signup from "./Components/login/Signup";
import BooksManage from "./Components/librarian/BooksManage";
import UsersManage from "./Components/librarian/UsersManage";
import Err from "./Components/Err";
import App from "./App";
import Liberarian from "./Components/librarian/Liberarian";
import UserNameParent from "./Components/UserNameParent";
import Mealify from "./Components/Mealify";
import Hero from "./Components/hero/Hero";
import Desctop from "./Components/Desctop";
import Shelf from "./Components/shelf/Shelf";
import Userhistory from "./Components/userhistory/Userhistory";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home/:uname",
        element: <Desctop />,
      },
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/welcome",
        element: <Welcome />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registere",
        element: <Signup />,
      },
      {
        path: "/liberarian/:uname",
        element: <Liberarian />,
        children: [
          {
            path: "bookmanager",
            element: <BooksManage />,
          },
          {
            path: "usermanager",
            element: <UsersManage />,
          },
        ],
      },
      {
        path: "/bookshelf/:uname",
        element: <Shelf />,
      },
      {
        path: "/history/:uname",
        element: <Userhistory />,
      },
      {
        path: "/u",
        element: <UserNameParent />,
      },
    ],
  },
  {
    path: "*",
    element: <Err />,
  },
]);
