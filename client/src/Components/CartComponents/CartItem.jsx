import { useContext } from "react";
import { CardWrapper } from "../CardWrapper";
import { LoggedinContext } from "../../GlobalContexts/Contexts";

export function CartItem({ item }) {
  const { cart, setCart } = useContext(LoggedinContext);

  function handleAddToCart() {
    const existingItemIndex = cart.findIndex((i) => i._id === item._id);
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].CartQuantity += 1;
      updatedCart[existingItemIndex].Amount += item.price; 
    
      return setCart(updatedCart);
  }


  function handleRemoveFromCart() {
    const existingItemIndex = cart.findIndex((i) => i._id === item._id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      
      if (updatedCart[existingItemIndex].CartQuantity > 1) {
        updatedCart[existingItemIndex].CartQuantity -= 1;
        updatedCart[existingItemIndex].Amount -= item.price; 
       
        
      } else {
      

        // we need to remove the item if quantity is 1 (no need to show 0 in cart)
      
        updatedCart.splice(existingItemIndex, 1);
        console.log(item.price);
      }

      return setCart(updatedCart);
    }
  }



  return (
    <CardWrapper>
      <div className="card mb-3">
        <div className="row p-4 ">
          <div className="col-md-6 d-flex justify-content-center  ">
            <img
              src="https://placehold.co/600x400"
              className="img-fluid rounded "
              alt="Product"
            />
          </div>
          <div className="col-md-6">
            <div className="my-3">
              <h5 className="card-title text-truncate">{item.productName} </h5>

              <ul className="list-unstyled mb-3">
                <ListItemHelper details={item.price} spcl="₹" title="Price" />
                <ListItemHelper
                  details={item.Amount.toFixed(2)}
                  spcl="₹"
                  title="Amount"
                />
                <li className="d-flex align-items-center my-3  ">
                  <button className="btn btn-sm btn-primary my-auto mx-2 " onClick={handleRemoveFromCart} >
                    -
                  </button>
                  <span className="mx-2 fw-bold">{item.CartQuantity}</span>
                  <button
                    className="btn btn-sm btn-success my-auto mx-2"
                    onClick={handleAddToCart}
                  >
                    +
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}

function ListItemHelper({ details, title, spcl = "" }) {
  return (
    <li>
      <span className="text-muted">{title}</span>{" "}
      <strong>
        {spcl}
        {details}
      </strong>
    </li>
  );
}
