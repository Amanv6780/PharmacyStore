import React, { useEffect, useState } from "react";
import { FormControl } from "../Components/AddProductComponents/FormCotrol.jsx";
import { CenterBlock } from "../Components/CenterBlockWrapper.jsx";
import useAddProduct from "../Hooks/useAddProduct.js";
import { Loader } from "../Components/Loader.jsx";
import { ProtectedPage } from "../Components/ProtectedPage.jsx";

export const AddProducts = () => {
  const { addProducts, loading } = useAddProduct();
  const [validate, setValidate] = useState(true);
  
  const sampleProduct = {
      productName: "",
      price: "",
      productQuantity: "",
    };
    const [product, setProduct] = useState(sampleProduct);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validate){
        alert("error in your inputs")
        return 
    }else {

        
        const resp = await addProducts(product);
        
        if (resp) {
            console.log(resp);
            alert("product added successfully");
        } else {
            alert("product not added");
        }
        setProduct(sampleProduct);
        console.log("Product submitted:", product);
    }
  };



useEffect(()=>{
      function ValidateInputs() {
        if (
          !product.productName.trim() ||
          !product.price ||
          !product.productQuantity
        ) {
          setValidate(false);
        } else {
          setValidate(true);
        }
      }
    ValidateInputs()
},[product])




  return (
    <ProtectedPage role='storeAdmin' >

    <CenterBlock>
      <div className="container  p-4 border rounded bg-light shadow-sm">
      <h3 className="text-Start mb-4">Add New Medicines</h3>
        {
          
        !validate&& <p className="alert alert-warning">Fields cannot be left empty</p>
      }
        <form onSubmit={handleSubmit}>
          <FormControl
            type="text"
            label="Product Name"
            name="name"
            value={product.productName}
            onChange={(e) =>
              setProduct({
                ...product,
                productName: e.target.value,
              })
            }
          />

          <FormControl
            type="number"
            label="Product Price"
            name="price"
            value={product.price}
            min={0}
            onChange={(e) =>
              setProduct({
                ...product,
                price: e.target.value,
              })
            }
          />

          <FormControl
            type="number"
            label="Quantity"
            name="quantity"
            value={product.productQuantity}
            min = {1}
            onChange={(e) => {
              setProduct({
                ...product,
                productQuantity: e.target.value,
              });
            }}
          />

          <div className="text-center mt-4">
            <button
              type="submit"
              className={`btn btn-primary px-5`}
              disabled={loading}
              >
              {loading ? <Loader /> : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </CenterBlock>
              </ProtectedPage>
  );
};
