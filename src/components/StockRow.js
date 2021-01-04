import React, { useState, useEffect } from "react";
import { iex } from "../config/iex.js";
import { useFetch } from "./useFetch.js";

export default function StockRow() {
  const { data, loading } = useFetch(
    "https://cloud.iexapis.com/stable/stock/FB/chart/date/20201111?token=pk_32c3cc0e5efd4e45847b33e0369afb60"
  );

  return (
    <div>
      <div>{loading ? "loading..." : data}</div>
      {/* <tr>
        <td>{this.props.ticker}</td>
        <td>{console.log(this.state.data)}</td>
        <td>{this.state.data.low}</td>
        <td>{this.state.data.date}</td>
        <td>{this.state.data.label}</td>
      </tr> */}
    </div>
  );
}
