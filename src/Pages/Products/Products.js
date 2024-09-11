import React, { useEffect, useState } from "react";
import Footer from "../../Shared/Footer/Footer";
import Header from "../../Shared/Header/Header";
import TrendingProduct from "../Home/TrendingProducts/TrendingProduct";
import ReactLoading from "react-loading";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch("https://speako-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Header></Header>
      <main>
        <div className="container my-4">
          <h2 class="text-center pb-4">ALL SPEAKERS</h2>

          {loading ? (
            <div className="loading-container all-product">
              <ReactLoading type="bubbles" color="black" width="120px" />
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-4 g-3">
              {products.map((product) => (
                <TrendingProduct
                  key={product._id}
                  product={product}
                ></TrendingProduct>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Products;
