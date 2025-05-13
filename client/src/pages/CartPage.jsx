import { ProtectedPage } from "../Components/ProtectedPage";
import { CartItem } from "../Components/CartComponents/CartItem";
import { CartList } from "../Components/CartComponents/CartList";
import { CartSummary } from "../Components/CartComponents/CartSummary";
import { Loader } from "../Components/Loader";
import { LoggedinContext } from "../GlobalContexts/Contexts";
import { useContext } from "react";

export function CartPage() {
  // const { orders, loading } = useOrders();
  const { cart } = useContext(LoggedinContext);
  //console.log(orders);

  return (
    <ProtectedPage role="user">
      <div className="container">
        <h2 className="mt-4">Your Shopping Cart</h2>
        <div>
          <div className=" mt-5">
            <div className="row ">
              <div className="col-md-6 ">
                <CartList item={cart} />
              </div>
              <div className="col-md-6">
                <CartSummary />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
