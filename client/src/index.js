import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import Main from './App.js';
import Loading from "./Loading.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/Store.js";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Loading />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
