import { useState } from "react";
import { Base_Url } from "../Configs/Constants";
import axios from "axios";

export default function useEditProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState(null);

  const updateProduct = async ( id,productDetails) => {
    setLoading(true);
    try {

        console.log(id)

      const resp = await axios.put(
        `${Base_Url}/products/updateproduct/${id}`,
        productDetails,
        {
          headers: {
            authorization: localStorage.getItem("access_token"),
          },
        }
      );

      return resp.data;
    } catch (e) {
      setErr(e.message );
      console.log(e.message)
    } finally {
      setLoading(false);
    }
  };

  return { updateProduct, loading, error };
}


export function useDeleteProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState(null);

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      console.log(id);

      const resp = await axios.delete(
        `${Base_Url}/products/deleteproduct/${id}`,
        {
          headers: {
            authorization: localStorage.getItem("access_token"),
          },
        }
      );

      return resp.data;
    } catch (e) {
      setErr(e.message);
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, loading, error };
}