import { Loader } from "../Components/Loader";
import { ProtectedPage } from "../Components/ProtectedPage";
import { useCancelOrder, useOrderHistory } from "../Hooks/useOrders";
import { DataTable } from "../Components/StoreAdminComponents/DataTable";
import { useContext } from "react";
import { LoggedinContext } from "../GlobalContexts/Contexts";

export function OrderHistory() {
  const { data, loading,fetchOrderHistory } = useOrderHistory(); // Make sure this returns orders for the logged-in user
  const { downloading, setDownloading } = useContext(LoggedinContext);
  
  const columns = [
    "#",
    "Product Name",
    "Price",
    "Quantity",
    "Total",
    "Date",
    "Status",
  ];
  const { cancelOrder, loading2 } = useCancelOrder();

  async function handleCancel(id) {
  await cancelOrder(id);
  await fetchOrderHistory();
  
    // window.location.reload();
  }

  async function handleDownload() {
    await setDownloading(true);

    window.print();

    await setDownloading(false);
  }

  const rows =
    data.map((order) => [
      order.productName,
      `₹ ${order.price}`,
      order.CartQuantity,
      `₹ ${order.Amount}`,
      new Date(order.createdAt).toLocaleString(),
      order.orderStatus === "delivered" ? (
        <span className="text-success">Delivered</span>
      ) : loading ? (
        <Loader />
      ) : (
        downloading?<p className="text-danger" >Not Delivered yet</p>:
        <button
          className="btn btn-sm btn-warning"
          onClick={() => handleCancel(order._id)}
        >
          {}Cancel
        </button>
      ),
    ]) || [];

  return (
    <ProtectedPage role="user">
      <div className="container py-4">
        <h3 className="mb-4">My Order History</h3>

        {loading2 ? (
          <Loader />
        ) : !data.length ? (
          <p className="bg-light p-4 rounded">You have no orders yet.</p>
        ) : (
          <DataTable columns={columns} rows={rows} />
        )}
        <div className="mt-4 text-end ">
          <button
            className={`btn btn-primary ${downloading ? "d-none" : null}  `}
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </div>
    </ProtectedPage>
  );
}
