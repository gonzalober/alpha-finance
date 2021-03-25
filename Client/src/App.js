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
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/portfolio" component={StockRow} />
        <Route exact path="/portfolio" component={StockChart} />
        <Route exact path="/portfolio" component={PortPerformance} />
        <Route exact path="/portfolio" component={PortOptimization} />
      </Router>
    </Fragment>
  );
}

export default App;
