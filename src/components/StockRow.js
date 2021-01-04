import React from "react";
import { useFetch } from "./useFetch.js";

export default function StockRow() {
  const { data, loading } = useFetch(
    "https://cloud.iexapis.com/stable/stock/FB/chart/date/20201111?token=pk_32c3cc0e5efd4e45847b33e0369afb60"
  );

  const border = {
    borderColor: "grey",
    marginBottom: "20px",
  };

  return (
    <div>
      <table className="table nt-5">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Price</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {console.log(data)}
          {loading
            ? "loading..."
            : data.map((stock) => (
                <tr style={border} key={stock.id}>
                  <td>{"FB"}</td>
                  <td>{stock.close}</td>
                  <td>{stock.date}</td>
                  <td>{stock.label}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
