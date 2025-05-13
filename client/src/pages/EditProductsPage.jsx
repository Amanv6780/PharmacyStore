import { Loader } from "../Components/Loader";
import { ProtectedPage } from "../Components/ProtectedPage";
import { ProductTable } from "../Components/StoreAdminComponents/ProductTableComponent.jsx";
import { useGetProductsByStore } from "../Hooks/useAdminProducts.js";
import { useDeleteProduct } from "../Hooks/useEditProduct.js";


export function EditProductPage() {
  const { data, loading,handleDataFetch } = useGetProductsByStore();
  console.log(data)
  const { deleteProduct } = useDeleteProduct()

  async function handleDelete(productId) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId)
      await handleDataFetch()
      
    }
  }

  return (
    <ProtectedPage role="storeAdmin">
      <div className="container py-4">
        <h3 className="mb-4">Manage Store Products</h3>

        {loading ? (
          <Loader />
        ) : (!data.length) ? (
          
          <p className="bg-light p-4 rounded" >No products found.</p>
        ) : (
          <ProductTable products={data} onDelete={handleDelete} />
        )}
      </div>
    </ProtectedPage>
  );
}
