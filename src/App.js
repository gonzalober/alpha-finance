import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import StockRow from "./components/StockRow.js";

function App() {
  return (
    <div className="App">
      <div className="container">
        <table className="table nt-5">
          <tbody>
            <StockRow />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
