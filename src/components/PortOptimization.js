import React from "react";
import Plot from "react-plotly.js";
import { useFetch } from "./useFetch.js";
import { useState, useEffect } from "react";
import { iex } from "../services/Api/iex";

const TickerTable = ({ tickers, tickerSearch }) => {
  if (tickers) {
    const tickersArray = [];
    for (const keyTicker in tickers) {
      tickersArray.push(keyTicker);
    }

    return (
      <div>
        <label>{tickersArray}</label>
      </div>
    );
  } else {
    return null;
  }
};

export default function StockRow() {
  const [table, setTable] = useState([]);
  const [stockChartXvalues, setStockChartXvalues] = useState([]);
  const [stockChartYvalues, setStockChartYvalues] = useState([]);
  const { data, loading } = useFetch(iex.base_url);
  let stockSymbol = "GOOG";
  const { bla, blablable } = useFetch(
    `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${stockSymbol}&types=chart&range=1m&last=5&token=pk_b4e7d7d3cfb1485cb2fc5dbc6f3f9f23`
  );
  const { dataStats, loadingStats } = useFetch(
    "https://cloud.iexapis.com/stable/stock/goog/stats?token=pk_b4e7d7d3cfb1485cb2fc5dbc6f3f9f23"
  );

  const border = {
    borderColor: "grey",
    marginBottom: "20px",
  };

  const DisplayStats = () => {
    if (dataStats) {
      console.log("----");
      console.log(dataStats);
      return dataStats.map(([key, value]) => (
        <tr style={border} key={key}>
          <td>{key}</td>
          <td>{value.week52high}</td>
        </tr>
      ));
    } else {
      return null;
    }
  };

  const DisplayInfo = () => {
    console.log(table);
    if (data) {
      console.log(data);
      return table.map(([key, value]) => (
        <tr style={border} key={key}>
          <td>{key}</td>
          <td>{value.chart[0].close}</td>
          <td>{value.chart[0].marketChangeOverTime}</td>
          <td>
            {value.chart[0].week52high}lo{value.chart[0].week52low}
          </td>
          <td>{value.chart[0].date}</td>
          <td>{value.chart[0].updated}</td>
        </tr>
      ));
    } else {
      return null;
    }
  };

  function tickerSearch(input) {
    console.log(input);
    if (data) {
      console.log(data);
      let stockFiltered = Object.entries(data).filter((key) => key === input);

      console.log(stockFiltered);
      setTable(stockFiltered);
    }
  }

  return (
    <div>
      <h4>Portfolio Optimization</h4>
      <h5>
        For practical purposes the optimization is based in two scenarios: 1 -
        Minimun Var Port. 2 - Max Return
      </h5>
      <h5>1- Portfolio allocation for minimun risk target </h5>
      <TickerTable tickers={data} tickerSearch={tickerSearch} />
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
          { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
      />
    </div>
  );
}
