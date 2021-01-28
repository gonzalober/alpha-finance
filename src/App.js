import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import StockRow from "./components/StockRow.js";
import StockChart from "./components/StockChart.js";
import PortPerformance from "./components/PortPerfor.js";
import PortOptimization from "./components/PortOptimization.js";

function App() {
  return (
    <div className="App">
      <div className="container">
        <StockRow />
        <StockChart />
        <PortPerformance />
        <PortOptimization />
      </div>
    </div>
  );
}

export default App;
