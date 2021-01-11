import React from "react";
import { useFetch } from "./useFetch.js";
import { useState, useEffect } from "react";

export default function StockRow() {
  const { data, loading } = useFetch(
    "https://cloud.iexapis.com/stable/stock/market/batch?symbols=goog,amzn,fb&types=chart&range=1m&last=5&token=pk_b4e7d7d3cfb1485cb2fc5dbc6f3f9f23"
  );
  const [table, setTable] = useState([]);
  //  "https://cloud.iexapis.com/stable/stock/FB/chart/date/20201111?token=pk_32c3cc0e5efd4e45847b33e0369afb60"
  console.log(data);

  function ticker(input) {
    console.log(input);
    let stockFiltered = data.filter((tickersymbol) => tickersymbol === input);
    setTable(stockFiltered.sort((a, b) => (a.updated < b.updated ? -1 : 1)));
  }
  const border = {
    borderColor: "grey",
    marginBottom: "20px",
  };
  const DisplaInfo = () => {
    if (data) {
      console.log(data);
      return Object.entries(data).map(([key, value]) => (
        <tr style={border} key={key}>
          <td>{key}</td>
          <td>{value.chart[0].close}</td>
          <td>{value.chart[0].date}</td>
          <td>{value.chart[0].updated}</td>
        </tr>
      ));
    } else {
      return null;
    }
  };

  return (
    <div>
      <h1>Alpha-Finance</h1>
      <p>Enter the ticker: </p>
      <input type="text" defaultValue="" />
      <input
        onClick={() => ticker()}
        className="form-submit"
        type="submit"
        value="ticker"
      />
      <table className="table nt-5">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Price</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{DisplaInfo()}</tbody>
      </table>
    </div>
  );
}
