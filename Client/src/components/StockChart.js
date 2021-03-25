import React, { useState, useEffect, useRef } from "react";
//import { file } from "./aapl.csv";
const d3 = require("d3");
//import * as _ from "lodash";

export default function StockRow() {
  //const data = Object.entries(iex.base_url).map(([key, value]) => value.chart.map((x) => x.close)[0] );
  const [data, setData] = useState([
    {
      date: "24/02/2016",
      value: 10,
    },
    {
      date: "26/02/2016",
      value: 22,
    },
    {
      date: "20/03/2016",
      value: 15,
    },
  ]);
  const svgRef = useRef();

  useEffect(() => {
    let margin = { top: 20, right: 30, bottom: 30, left: 40 };
    let height = 500;
    let width = 150;

    let line = d3
      .line()
      .defined((d) => !isNaN(d.value))
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    let x = d3
      .scaleUtc()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);
    let y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    let xAxis = (g) =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );

    let yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .select(".tick:last-of-type text")
            .clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data.y)
        );

    const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

    svg.append("g").call(xAxis);

    svg.append("g").call(yAxis);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

    return svg.node();
  }, [data]);

  return (
    <div>
      <h2>Charts</h2>
      <p>Enter the ticker: </p>
      <svg ref={svgRef}></svg>
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update Ticker
      </button>
    </div>
  );
}
