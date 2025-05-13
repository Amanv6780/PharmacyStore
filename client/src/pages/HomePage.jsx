import React from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedPage } from "../Components/ProtectedPage";
import useProducts from "../Hooks/useProducts";
import { Loader } from "../Components/Loader";
import { ItemCard } from "../Components/CardComponentHome";
import { AdvertCarousal } from "../Components/AdvertsCarousal";
import { useGetUserDetails } from "../Hooks/useViewUser";
import medicineimage from "../assets/medicine.jpg"


export function HomePage() {
  const { data, loading, handleSearch } = useProducts();
  const {user1 } = useGetUserDetails()
  const navigate = useNavigate();
console.log(user1);


  return (
    <ProtectedPage role="user">
      {loading ? (
        <div className="min-vh-100 bg-light backdrop d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      ) : (
        <div className="container mt-4">
       
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Welcome, {user1.username || "User"}!</h4>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/profile")}
            >
              View Profile
            </button>
          </div>

          <AdvertCarousal />
          <div className="my-3 form-group justify-content-end d-flex  " >
            <input type="text" className="form-control w-50 "  placeholder="Search" onChange={(e)=>handleSearch(e.target.value)}/>
          </div>
          <div className="row mt-4">
            {data.map((item, k) => (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={k}>
                <ItemCard
                  image={medicineimage}
                  id={item._id}
                  stock={item.productQuantity}
                  title={item.productName}
                  price={item.price}
                  item={item}
                  onAddToCart={() =>
                    console.log("Added to cart:", item.productName)
                  }
                  onBuyNow={() => console.log("Buying now:", item.productName)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </ProtectedPage>
  );
}

