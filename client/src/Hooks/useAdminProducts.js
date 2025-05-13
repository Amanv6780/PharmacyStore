import { useEffect, useState } from "react";

import { Base_Url } from "../Configs/Constants";
import axios from "axios";

export function useGetProductsByStore() {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  async function handleDataFetch() {
    setLoading(true);
    try {
      const response = await axios.get(`${Base_Url}/products/getbystore`, {
        headers: {
          authorization: localStorage.getItem("access_token"),
        },
      });

      if (response.data) {
        setData(response.data.currentProducts);
      } else {
        console.log("error fetching data");
      }
    } catch (e) {
      console.log(e.message);
      alert("something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleDataFetch();
  }, []);

  return { loading, data, error, handleDataFetch };
}
