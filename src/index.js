import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/index.css";
import {router} from './router'
import App from "./App";
// import Welcome from "./Components/Welcome";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  <RouterProvider router = {router} />
  </>
);
