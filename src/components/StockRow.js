import React from "react";
import { useFetch } from "./useFetch.js";
import { useState, useEffect } from "react";
import { iex } from "../services/Api/iex";
import * as d3 from "d3";

const TickerTable = ({ data, tickerSearch }) => {
  if (data) {
    const tickersArray = [];
    for (const keyTicker in data) {
      tickersArray.push(keyTicker);
    }
    console.log(tickersArray);
    //tickersArray.map((availscores) => availscores;
    return (
      <div>
        <input type="text" defaultValue="" placeholder="ticker" />
        <input
          onClick={() => tickerSearch("GOOG")}
          className="form-submit"
          type="submit"
          value="filter"
        />
      </div>
    );
  } else {
    return null;
  }
};

export default function StockRow() {
  const [table, setTable] = useState([]);
  const { data, loading } = useFetch(iex.base_url);
  // const options = {};
  // const { data: { dataFin } = { tickers: [] } } = useFetch(
  //   iex.base_url,
  //   options,
  //   []
  // );
  const { dataStats, loadingStats } = useFetch(
    "https://cloud.iexapis.com/stable/stock/goog/stats?token=pk_b62f2993a4ce4eb49d8d4ca929bac297"
  );

  const border = {
    borderColor: "grey",
    marginBottom: "20px",
  };

  function tickerSearch(input) {
    console.log(input);
    if (data) {
      let stockFiltered = Object.entries(data).filter(
        (key) => key[0] === input
      );
      console.log(stockFiltered);
      setTable(stockFiltered);
    }
  }

  useEffect(() => {
    console.log(data);
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
          {table ? console.log(table) : "noooo"}
          {table.map(([key, value]) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

//line 53(after click) i have this:
// [Array(2)]
// 0: (2) ["GOOG", {…}]=>inside second element has 5 {obj}
//=>{close: 1830.79, high: 1890, low: 1809, open: 1882.53, symbol: "GOOG", …}
// let infoData = ["GOOG",{close: 1830.79, high: 1890, low: 1809, open: 1882.53, symbol: "GOOG"}]
// {
//   data
//     ? Object.entries(data).map(([key, value]) => (
//         <tr style={border} key={key}>
//           <td>{key}</td>
//           <td>{value.chart[0].close}</td>
//           <td>{value.chart[0].marketChangeOverTime}</td>
//           <td>
//             {value.chart[0].week52high}lo{value.chart[0].week52low}
//           </td>
//           <td>{value.chart[0].date}</td>
//           <td>{value.chart[0].updated}</td>
//         </tr>
//       ))
//     : loading;
// }

//<tbody{DisplayInfo()<tbody/>

// const DisplayInfo = () => {
//   console.log(table);
//   if (data) {
//     console.log(data);
//     return table.map(([key, value]) => (
//       <tr style={border} key={key}>
//         <td>{key}</td>
//         <td>{value.chart[0].close}</td>
//         <td>{value.chart[0].marketChangeOverTime}</td>
//         <td>
//           {value.chart[0].week52high}lo{value.chart[0].week52low}
//         </td>
//         <td>{value.chart[0].date}</td>
//         <td>{value.chart[0].updated}</td>
//       </tr>
//     ));
//   } else {
//     return null;
//   }
// };
// const DisplayStats = () => {
//   if (dataStats) {
//     console.log("----");
//     console.log(dataStats);
//     return dataStats.map(([key, value]) => (
//       <tr style={border} key={key}>
//         <td>{key}</td>
//         <td>{value.week52high}</td>
//       </tr>
//     ));
//   } else {
//     return null;
//   }
// };
