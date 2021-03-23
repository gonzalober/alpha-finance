import React from "react";
//import { useFetch } from "./useFetch.js";
import { useState, useEffect, useRef } from "react";
import { iex } from "../services/Api/iex";

const TickerTable = ({ tickers, tickerSearch }) => {
  const tickerEl = useRef(null);
  if (tickers) {
    const tickersArray = [];
    for (const keyTicker in tickers) {
      tickersArray.push(keyTicker);
    }
    //console.log(tickersArray);
    return (
      <form>
        <div>
          <input
            ref={tickerEl}
            type="text"
            defaultValue=""
            placeholder="ticker"
          />
          <button
            onClick={(ev) => {
              ev.preventDefault();
              tickerSearch(tickerEl.current.value);
            }}
          >
            Filter
          </button>
        </div>
      </form>
    );
  } else {
    return null;
  }
};

export default function StockRow() {
  const [table, setTable] = useState();
  const data = iex.base_url;

  const border = {
    borderColor: "grey",
    marginBottom: "20px",
  };

  function tickerSearch(input) {
    console.log(input);
    if (data) {
      let stockFiltered = {};
      stockFiltered[input] = data[input];
      setTable(stockFiltered);
      console.log(stockFiltered);
    }
    return false;
  }

  useEffect(() => {
    setTable(data);
  }, [data]);

  return (
    <div>
      <h1>Alpha-Finance</h1>
      <h6>Enter the ticker: </h6>
      <TickerTable tickers={data} tickerSearch={tickerSearch} />
      <table className="table nt-5">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Price</th>
            <th>% Change</th>
            <th>52 weeks range</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {table
            ? Object.entries(table).map(([key, value]) => (
                <tr style={border} key={value.chart}>
                  <td>{key}</td>

                  <td>{JSON.stringify(value.chart.map((x) => x.close)[0])}</td>
                  <td>
                    {(JSON.stringify(value.chart.map((x) => x.close)[0]) /
                      JSON.stringify(value.chart.map((x) => x.close)[1]) -
                      1) *
                      100}
                  </td>
                </tr>
              ))
            : "loading..."}
        </tbody>
      </table>
    </div>
  );
}
