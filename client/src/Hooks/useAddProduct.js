import { useState } from "react";
import { Base_Url } from "../Configs/Constants";
import axios from "axios";

export default function useAddProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState(null);

  const addProducts = async (productDetails) => {
    setLoading(true);
    try {
      const resp = await axios.post(
        `${Base_Url}/products/add`,
        productDetails,
        {
          headers: {
            Authorization: localStorage.getItem("access_token"),
          },
        }
      );

      return resp.data;
    } catch (e) {
      setErr(e.response?.data?.message || e.message || "Something went wrong");
      alert("product not added")
    } finally {
      setLoading(false);
    }
  };

  return { addProducts, loading, error };
}
