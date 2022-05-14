import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import storeInstance from "./sagas";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
