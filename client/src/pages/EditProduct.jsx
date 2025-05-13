import React, { useEffect, useState } from "react";
import { FormControl } from "../Components/AddProductComponents/FormCotrol.jsx";
import { CenterBlock } from "../Components/CenterBlockWrapper.jsx";
import { Loader } from "../Components/Loader.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { UseSingleProduct } from "../Hooks/useSingleProduct";
import useEditProduct from "../Hooks/useEditProduct.js";

export const EditProduct = () => {
    const { updateProduct, loading } = useEditProduct();
    const [validate, setValidate] = useState(true);
    const { id } = useParams();
    const { data, CallProduct } = UseSingleProduct(id);
    const navigate = useNavigate()

    const sampleProduct = {
        productName: "",
        price: "",
        productQuantity: "",
    };

    const [product, setProduct] = useState(sampleProduct);

    // Set default values from data once it is fetched
    useEffect(() => {
        if (data) {
            setProduct({
                productName: data.productName || "",
                price: data.price || "",
                productQuantity: data.productQuantity || "",
            });
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate) {
            alert("error in your inputs");
            return;
        } else {

          const trimmedProduct = {
            ...product,
            productName : product.productName.trim()
          }

            const resp = await updateProduct(id, trimmedProduct);

            if (resp) {
                console.log(resp);
                alert("product added successfully");
                CallProduct(id);
                navigate('/editproductpage')
            } else {
                alert("product not added");
            }
            setProduct(sampleProduct);
            console.log("Product submitted:", product);
        }
    };

    useEffect(() => {
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
        ValidateInputs();
    }, [product]);

    return (
        <CenterBlock>
            <div className="container p-4 border rounded bg-light shadow-sm">
                <h3 className="text-start mb-4">
                    Edit <span className="text-muted">{data.productName}</span>
                </h3>
                {!validate && (
                    <p className="alert alert-warning">Fields cannot be left empty</p>
                )}
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
                        min={1}
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
    );
};
