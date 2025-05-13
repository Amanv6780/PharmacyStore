
import { ProtectedPage } from "../Components/ProtectedPage";
import { CardComponent } from "../Components/StoreAdminComponents/CardComponent";

export function MainAdminDashboard() {
  return (
    <ProtectedPage role={"mainAdmin"}>
      <div className="container mt-5">
        <h2 className="mb-4 text-start">Admin Dashboard</h2>
        <div className="row ">
       

          <CardComponent
            title="View Stores"
            description="View all the register stores on this website."
            buttonText="Go to View Stores"
            path="/viewstores"
            />
          <CardComponent
            title="View Users"
            description="View all the register users on this website."
            buttonText="Go to View Users"
            path="/viewusers"
            />

            
        </div>
      </div>
     </ProtectedPage>
  );
}
