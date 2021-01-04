import React, { Component } from "react";
import { iex } from "../config/iex.js";

class StockRowOld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    //query api????
    const url = `${iex.base_url}/stock/${this.props.ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("--HERE-----");
        console.log(data);
        this.setState({
          data: data[data.length - 1],
        });
      });
  }

  render() {
    return (
      <tr>
        <td>{this.props.ticker}</td>
        <td>{console.log(this.state.data)}</td>
        <td>{this.state.data.low}</td>
        <td>{this.state.data.date}</td>
        <td>{this.state.data.label}</td>
      </tr>
    );
  }
}

export default StockRowOld;
