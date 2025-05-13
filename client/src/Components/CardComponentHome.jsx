import { useNavigate } from "react-router-dom";
import { CardWrapper } from "./CardWrapper";

export function handleAddToCart(item , cart,setCart,setTotal) {
  const existingItemIndex = cart.findIndex(
    (i) => i._id === item._id && i.storeId === item.storeId
  );
  if (existingItemIndex !== -1) {
    const updatedCart = [...cart];
    updatedCart[existingItemIndex].CartQuantity += 1;
    updatedCart[existingItemIndex].Amount += item.price;

    alert("Added to cart");

    return setCart(updatedCart);
  }

  // if item doesn't exist, add it to the cart 
  const newItem = {
    ...item,
    Amount: item.price,
    CartQuantity: 1,
  };

  setTotal((prev) => prev + newItem.price);

  alert("Added to cart");
  return setCart((prev) => [...prev, newItem]);
}


import { Loader } from "./Loader";
import { useContext } from "react";
import { LoggedinContext } from "../GlobalContexts/Contexts";

export function ItemCard({ item, image }) {
  const navigate = useNavigate();
  // const { loading, pushToCart } = useSetCart();
  const { cart, setCart,setTotal } = useContext(LoggedinContext);

 
  
  return (
    <CardWrapper>
      <div className="card  h-100">
        <img
          style={{ cursor: "pointer" }}
          src={image}
          className="card-img-top"
          onClick={() => navigate(`/item/${item._id}`)}
          alt={item.productName}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{item.productName}</h5>
          <p>
            <span className="font-weight-bold">Price: </span>
            {item.price}
          </p>
          <p>
            <span className="font-weight-bold">Stock : </span>
            {item.productQuantity}
          </p>
           <p>
            <span className="font-weight-bold">Sold by : </span>
            {item.storeId.username + " pharma"}
          </p>
          <div className="mt-auto">
            <button
            disabled={item.productQuantity <=0}
              className="btn btn-primary btn-sm btn-block mb-2"
              onClick={()=>handleAddToCart(item,cart,setCart,setTotal)}
            >
              Add To Cart
            </button>

            <button
              className="btn btn-success btn-sm btn-block"
              onClick={() => navigate(`/item/${item._id}`)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}
