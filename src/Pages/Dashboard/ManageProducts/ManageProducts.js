import React, { useEffect, useState } from "react";
import ManageSingleProduct from "./ManageSingleProduct";
import "./ManageProducts.css";

const ManageProducts = () => {
  const [products, setProducts] = useState();
  const [control, setControl] = useState(false);
  useEffect(() => {
    fetch("https://speako-server.vercel.app/products")
      .then((res) => res.json())
      .then((result) => setProducts(result));
  }, [control]);
  return (
    <div className="products-container">
      <h3 className="text-center position-relative">
        Manage Products
        <span className="total-products">
          {products?.length && `Total products: ${products.length}`}
        </span>
      </h3>
      <hr />
      <table>
        {products?.length ? (
          <div className="row row-cols-1 g-4">
            {products
              .slice(0)
              .reverse()
              .map((product) => (
                <ManageSingleProduct
                  key={product._id}
                  product={product}
                  setControl={setControl}
                  control={control}
                ></ManageSingleProduct>
              ))}
          </div>
        ) : (
          <div className="display-2 text-center no-booking">
            You have no products
          </div>
        )}
      </table>
    </div>
  );
};

export default ManageProducts;
