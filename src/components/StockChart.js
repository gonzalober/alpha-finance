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
    console.log(tickersArray);
    return (
      <div>
        <label>
          <input type="text" defaultValue="" />
          <input
            onClick={() => tickerSearch(tickersArray)}
            className="form-submit"
            type="submit"
            value="ticker"
          />
        </label>
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
  const { bla, blablable } = useFetch();
  //`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${stockSymbol}&types=chart&range=1m&last=5&token=pk_b62f2993a4ce4eb49d8d4ca929bac297`
  const { dataStats, loadingStats } = useFetch();
  // "https://cloud.iexapis.com/stable/stock/goog/stats?token=pk_b62f2993a4ce4eb49d8d4ca929bac297"

  // function setup() {
  //   loadJSON(iex.base_url, gotData);
  // }
  // let sotckTicker;
  // function gotData(data) {
  //   sotckTicker = data;
  // }

  const border = {
    borderColor: "grey",
    marginBottom: "20px",
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
      <h2>Charts</h2>
      <p>Enter the ticker: </p>
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
        ]}
        layout={{ width: 320, height: 240, title: "Stock Prices" }}
      />
    </div>
  );
}
