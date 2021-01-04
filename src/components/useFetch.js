import { useState, useEffect } from "react";
import { iex } from "../config/iex.js";

//const url = `${iex.base_url}/stock/${this.props.ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`;
export const useFetch = (url) => {
  const [data, setData] = useState({ data: null, loading: true });
  useEffect(() => {
    setData({ data: null, loading: true });
    fetch(url)
      .then((x) => x.json())
      .then((y) => {
        setData({ data: y, loading: false });
      });
  }, [url]);
  return data;
};

//"`${iex.base_url}/stock/${this.props.ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`"
