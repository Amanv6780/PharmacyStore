import { useNavigate } from "react-router-dom";
import { ProtectedPage } from "../Components/ProtectedPage";
import { CardComponent } from "../Components/StoreAdminComponents/CardComponent";

export function StoreAdminDashboard() {

const navigate = useNavigate()

  return (
    <ProtectedPage role={"storeAdmin"}>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center" >

        <h2 className="mb-4 text-start">Store Admin Dashboard</h2>
        <button className="btn btn-sm btn-outline-primary" onClick={()=>navigate("/profile")} >Edit Profile</button>
        </div>
        <div className="row ">
          
            <CardComponent
              title="Add Product"
              description="Create a new product and add it to your store's inventory."
              buttonText="Go to Add Product"
              path="/addproducts"
            />
     

       
            <CardComponent
              title="View Products"
              description="Manage and edit existing products in your inventory."
              buttonText="Go to View Products"
              path="/editproductpage"
            />
          

         
            <CardComponent
              title="Order Summary"
              description="Track customer orders and manage fulfillment."
              buttonText="Go to Order Summary"
              path="/ordersummary"
            />
        

          <CardComponent
            title="Profile Page"
            description="View or change your details."
            buttonText="Go Profile Page"
            path="/profile"
          />
        </div>
      </div>
    </ProtectedPage>
  );
}
