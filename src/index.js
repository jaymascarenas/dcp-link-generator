import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateDCP from "./CreateDCP";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <CreateDCP />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
