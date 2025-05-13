import { Loader } from "../Components/Loader";
import { ProtectedPage } from "../Components/ProtectedPage";
import { useGetOrderSummary, useUpdateOrderStatus } from "../Hooks/useOrders";
import { DataTable } from "../Components/StoreAdminComponents/DataTable";
import { useContext } from "react";
import { LoggedinContext } from "../GlobalContexts/Contexts";

export function OrderSummaryPage() {
  const { data, loading,callOrders } = useGetOrderSummary();
  const { downloading, setDownloading } = useContext(LoggedinContext);

  const columns = [
    "#",
    "Order Id",
    "Product Name",
    "Price",
    "Cart Quantity",
    "Total Amount",
    "Date",
    "Status",
  ];

const {loading2 , updateOrderStatus} = useUpdateOrderStatus()

  async function handleUpdateStatus(id){

await updateOrderStatus(id)
await callOrders()

  }



  const rows =
    data?.map((order) => [
        order._id,
      order.productName,
      `₹ ${order.price}`,
      order.CartQuantity,
      `₹ ${order.Amount}`,
      new Date(order.createdAt).toLocaleString(),
      
        order.orderStatus == "delivered" ? (
          <span className="text-success my-auto" >Delivered</span>
        ) : (
          <button className="btn btn-sm btn-primary"  onClick={()=>handleUpdateStatus(order._id)} >
            {loading2?<Loader/>:'Mark Delivered'}
          </button>
        )
      ,
    ]) || [];

  console.log(downloading);

  async function handleDownload() {
    await setDownloading(true);

    window.print();

    await setDownloading(false);
  }

  return (
    <ProtectedPage role="storeAdmin">
      <div className="container py-4">
        <h3 className="mb-4">Order Summary</h3>

        {loading ? (
          <Loader />
        ) : !data.length ? (
          <p className="bg-light p-4 rounded">No orders found.</p>
        ) : (
          <DataTable columns={columns} rows={rows} />
        )}

        <div className="mt-4 text-end">
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
