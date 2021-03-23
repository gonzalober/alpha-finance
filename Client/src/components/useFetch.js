import { useState, useEffect } from "react";

//+const url = `${iex.base_url}/stock/${this.props.ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`;
export const useFetch = (url) => {
  const [data, setData] = useState({ data: null, loading: true });
  useEffect(() => {
    async function fetchData() {
      setData((state) => ({ data: state.data, loading: true }));
      const x = await fetch(url);
      const y = await x.json();
      setData({ data: y, loading: false });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return data;
};

//"`${iex.base_url}/stock/${this.props.ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`"

// await fetch(url)
//       .then((x) => x.json())
//       .then((y) => {
//         setData({ data: y, loading: false });
//       });
