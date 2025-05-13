import { useParams } from "react-router-dom";
import { UseSingleProduct } from "../Hooks/useSingleProduct";
import { CenterBlock } from "../Components/CenterBlockWrapper";
import { Loader } from "../Components/Loader";
import { FormInputGroup } from "../Components/FormInputGroup";
import { handleAddToCart } from "../Components/CardComponentHome";
import { useContext } from "react";
import { LoggedinContext } from "../GlobalContexts/Contexts";
import medicineimage from '../assets/medicine.jpg'

export function ItemPage() {
  const { id } = useParams();
  const { data, loading } = UseSingleProduct(id);

  const { cart, setCart, setTotal } = useContext(LoggedinContext);

  return (
    <CenterBlock>
      {loading ? (
        <Loader />
      ) : (
        <div className="container ">
          <h3 className="mb-4 text-center text-primary font-weight-bold">
            Buy product: <span className="text-dark">{data.productName}</span>
          </h3>

          <div className="card shadow-sm border-0">
            <div className="row g-0">
              <div className="col-md-6">
                <img
                  className="img-fluid rounded"
                  src={medicineimage}
                  alt={data.productName}
                />
              </div>
              <div className="col-md-6 d-flex flex-column justify-content-center p-4">
                <h5 className="card-title mb-3 text-dark">{data.productName}</h5>
                <p className="card-text">
                  <strong>Price:</strong> {data.price} USD
                </p>
                <p className="card-text">
                  <strong>Amount:</strong> {data.price} USD
                </p>
                <p className="card-text">
                  <strong>Stock Available:</strong> {data.productQuantity}
                </p>

                <button
                  disabled={data.productQuantity <= 0}
                  className={`btn ${data.productQuantity > 0 ? 'btn-primary' : 'btn-secondary'} btn-sm mt-3`}
                  onClick={() => handleAddToCart(data, cart, setCart, setTotal)}
                >
                  {data.productQuantity > 0 ? 'Add To Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </CenterBlock>
  );
}
