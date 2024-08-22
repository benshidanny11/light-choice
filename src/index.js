import React from "react";
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import './assets/css/style.css';
import "./assets/cssadmin/lightBox.css";
import "./assets/cssadmin/reset.css";
import "./assets/cssadmin/style.css";
import "./assets/js/main.js";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


reportWebVitals();
