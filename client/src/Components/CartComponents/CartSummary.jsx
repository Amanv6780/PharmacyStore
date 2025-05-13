import { useContext } from "react";
import { CardWrapper } from "../CardWrapper";
import { LoggedinContext } from "../../GlobalContexts/Contexts";
import { usePlaceOrder } from "../../Hooks/useOrders";
import { Loader } from "../Loader";
import { useNavigate } from "react-router-dom";
import { Base_Url } from "../../Configs/Constants";


export function CartSummary() {
  const { cart, total,setCart } = useContext(LoggedinContext);
  const { loading, postOrder, error  } = usePlaceOrder();



const shipping = 10;
const discount = 0.1*total;

  const navigate = useNavigate()

  async function handlePostOrder() {



    await postOrder(cart);
    //dangerous
    console.log(error);
  
    
     setCart([])

  
  }



 function handleHistory(){

    navigate('/orderhistory')
    
  }

  return (
    <div
      className="border rounded p-3 bg-white shadow-sm"
      style={{ position: "sticky", top: "70px" }}
    >
      <h4 className="mb-3">Order Summary</h4>
      <p className="mb-2">Subtotal: ₹{total.toFixed(2)}</p>
      
      <p className="mb-2">Shipping: ₹{shipping.toFixed(2)}</p>
      <p className="mb-2">Discount: ₹{discount.toFixed(2)}</p>
      <p className="font-weight-bold mb-4">
        Total: ₹{((total-discount) + shipping).toFixed(2)}
      </p>
      <button disabled={!cart.length} onClick={handlePostOrder} className={`btn btn-block ${!cart.length?'btn-outline-secondary': 'btn-primary'} `}>
        {loading ? <Loader /> : "Place Order"}
      </button>
      <button className="my-3 btn btn-primary w-100"  onClick={handleHistory} >Order History</button>
    </div>
  );
}
