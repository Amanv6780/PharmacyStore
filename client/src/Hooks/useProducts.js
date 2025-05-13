import { useEffect, useState } from "react";
import { Base_Url } from "../Configs/Constants";
import axios from "axios";

export default function useProducts() {
  const [data, setData] = useState([]); 
  const [originalData, setOriginalData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState(null);

  const getProducts = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(`${Base_Url}/products/getall`, {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      });
      setData(resp.data.currProducts);
      setOriginalData(resp.data.currProducts); 
    } catch (e) {
      setErr(e.response?.data?.message || e.message || "Something went wrong");
      
    } finally {
      setLoading(false);
    }
  };


  function handleSearch(query) {
    if (query.trim() === "") {

      setData(originalData);
    } else {
      
      const newData = originalData.filter((i) => {
        return i.productName.toLowerCase().includes(query.toLowerCase());
      });
      setData(newData);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return { data, loading, error, handleSearch };
}
