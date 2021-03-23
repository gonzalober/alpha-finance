import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import StockRow from "./components/StockRow.js";
import StockChart from "./components/StockChart.js";
import PortPerformance from "./components/PortPerfor.js";
import PortOptimization from "./components/PortOptimization.js";

function App() {
  return (
    <Fragment>
      <Router>
        <Route exact path="/" component={SignUp} />
        <Route exact path="/login" component={Login} />
      </Router>
      <StockRow />
      <StockChart />
      <PortPerformance />
      <PortOptimization />
    </Fragment>
  );
}

export default App;
