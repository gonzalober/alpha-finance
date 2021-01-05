import React from "react";
import { useFetch } from "./useFetch.js";
import { useState, useEffect } from "react";

export default function StockRow() {
  const { data, loading } = useFetch(
    "https://cloud.iexapis.com/stable/stock/market/batch?symbols=goog,fb&types=chart&range=1m&last=5&token=pk_32c3cc0e5efd4e45847b33e0369afb60"
  );
  const [table, setTable] = useState([]);
  //  "https://cloud.iexapis.com/stable/stock/FB/chart/date/20201111?token=pk_32c3cc0e5efd4e45847b33e0369afb60"
  console.log(data);

  function ticker(input) {
    console.log(input);
    let stockFiltered = data.filter((tickersymbol) => tickersymbol === input);
    setTable(ditanceFiltered.sort((a, b) => (a.time < b.time ? -1 : 1)));
  }
  const border = {
    borderColor: "grey",
    marginBottom: "20px",
  };
  const DisplaInfo = () => {
    if (data) {
      for (let key in data) {
        let value = data[key];
        // for (const [stock, value] of Object.entries(data)) {
        //   console.log(stock, value);
        return (
          <tr style={border}>
            <td>{key}</td>
            <td>{console.log(key)}</td>
            <td>{console.log(value)}</td>
            <td>{console.log(value.chart)}</td>
            <td>{value.chart.close}</td>
            <td>{value.date}</td>
            <td>{value.label}</td>
          </tr>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <div>
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
