
import { useNavigate } from "react-router-dom";

export function ProductTable({ products, onDelete }) {
  const navigate = useNavigate();

  function handleEdit(productId) {
    navigate(`/editproducts/${productId}`);
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover table-striped mb-0">
        <thead>
          <tr className="table-primary">
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.productName}</td>
              <td>₹ {product.price}</td>
              <td>{product.productQuantity}</td>

              <td>
              <div className="d-flex ">
  <button
    className="btn btn-sm btn-primary w-100 mr-2 mb-1"
    onClick={() => handleEdit(product._id)}
  >
    Edit
  </button>
  <button
    className="btn btn-sm btn-danger w-100 mb-1"
    onClick={() => onDelete(product._id)}
  >
    Delete
  </button>
</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
