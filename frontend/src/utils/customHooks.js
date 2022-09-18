import { useState, useEffect } from "react";
// import { fetchData } from './utils';
import axios from "axios";

function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const result = await axios.get(`${url}`);
      // return result.data.products;
      setData(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      return error.message;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data };
}

export default useApi
