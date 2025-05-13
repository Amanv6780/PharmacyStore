/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Base_Url } from "../Configs/Constants";
import axios from "axios";

export function useOrders() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  ///add filters and stuff by using array .reduce

  useEffect(() => {
    getOrdersById();
  }, []);

  async function getOrdersById() {
    setLoading(true);
    try {
      const response = await axios.get(`${Base_Url}/orders/getorders`, {
        headers: {
          authorization: localStorage.getItem("access_token"),
        },
      });

      // temorary logic -- update if you figure out something better

      // const cProducts = new Map();

      // response.data.map((i) => {
      //   console.log(i.productId);
      //   let curr = cProducts.get(i.productId);
      //   if (!curr) {
      //     cProducts.set(i.productId, {
      //       ...i,
      //       CartQuantity: 1,
      //       Amount : i.price
      //     });
      //   } else {
      //     cProducts.set(i.productId, {
      //       ...curr,
      //       CartQuantity: curr.CartQuantity + 1,
      //       Amount : curr.Amount + i.price
      //     });
      //   }
      // });

      // console.log(cProducts);

      // const newArr = Array.from(cProducts.values());

      setOrders(response.data);
    } catch (e) {
      setError(e);
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { orders, getOrdersById, loading, error };
}

// delete this
export function useSetCart() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function pushToCart(id) {
    setLoading(true);
    try {
      const response = await axios.post(
        `${Base_Url}/orders/createorder`,
        {
          productid: id,
        },
        {
          headers: {
            authorization: localStorage.getItem("access_token"),
          },
        }
      );

      if (response.data) {
        alert("Added to cart");
      }
    } catch (e) {
      setError(e);
      alert("Failed to add to cart");
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, pushToCart, error };
}
// delete this too
export function useDeleteFromCart() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${Base_Url}/order/deleteone${id}`, {
        authorization: localStorage.getItem("acces_token"),
      });

      if (response) {
        return alert("deleted successfully");
      } else {
        return alert("delete not successfull");
      }
    } catch (e) {
      alert("not deleted");
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }

    return { handleDelete, loading, error };
  };
}

export function usePlaceOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  async function postOrder(orders) {
    setLoading(true);
    setError(false);
    try {
      const { data } = await axios.post(
        `${Base_Url}/orders/createorder`,
        orders,
        {
          headers: {
            authorization: localStorage.getItem("access_token"),
          },
        }
      );
      if (data) {
        alert("Order sent successfully!");
        console.log("Order added");
      }
    } catch (e) {
      setError(true);
      alert("Either the product is not available or not in stock.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  return { loading, postOrder, error };
}


export function useGetOrderSummary() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function callOrders() {
    setLoading(true);
    try {
      const response = await axios.get(`${Base_Url}/orders/getorderbystore`, {
        headers: {
          authorization: localStorage.getItem("access_token"),
        },
      });

      if (response.data) {
        setData(response.data);

        console.log(response.data[0]);
      } else {
        alert("problem in fetching data");
      }
    } catch (e) {
      console.log(e.message);
      alert("error occured fetching order summary");
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    callOrders();
  }, []);

  return { loading, data, error, callOrders };
}

export function useUpdateOrderStatus() {
  const [loading2, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function updateOrderStatus(id) {
    setLoading(true);
    try {
      console.log(id);
      const resp = await axios.put(
        `${Base_Url}/orders/updatestatus/${id}`,
        {},
        {
          headers: {
            authorization: localStorage.getItem("access_token"),
          },
        }
      );

      if (!resp.data) {
        console.log("error in use update order status");
      } else {
        console.log("updated");
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { updateOrderStatus, loading2, error };
}

export function useOrderHistory() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchOrderHistory() {
    setLoading(true);
    setError(null); 

    try {
      const response = await axios.get(`${Base_Url}/orders/getorders`, {
        headers: {
          authorization: localStorage.getItem("access_token"),
        },
      });

      if (response.data ) {
        setData(response.data);
      } else {
        console.log("You haven't placed any orders yet.");
      }
    } catch (e) {
      console.error("Fetch error:", e);
      setError(e.message);
      alert(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchOrderHistory()
  },[])

 

  return { fetchOrderHistory, data, loading, error };
}

export function useCancelOrder() {
  const [error, setError] = useState(null);
  const [loading2, setLoading] = useState(false);

  async function cancelOrder(id) {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        `${Base_Url}/orders/deleteone/${id}`,
        {
          headers: {
            authorization: localStorage.getItem("access_token"),
          },
        }
      );
      console.log("Cancelled");
    } catch (e) {
      console.error("Fetch error:", e);
      setError(e.message);
      alert(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  return { cancelOrder, loading2, error };
}
