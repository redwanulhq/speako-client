import React, { useEffect, useState } from "react";
import TrendingProduct from "./TrendingProduct";
import ReactLoading from "react-loading";
import "./TrendingProducts.css";

const TrendingProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch("https://speako-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, 4));
        setLoading(false);
      });
  }, []);
  return (
    <section>
      <div className="container my-5">
        <h2 className="text-center pt-4 ">TRENDING SPEAKERS</h2>
        <p className="section-sub-title">
          Check our best seller product right now!
        </p>
        {loading ? (
          <div className="loading-container product">
            <ReactLoading type="bubbles" color="black" width="120px" />
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {products.map((product) => (
              <TrendingProduct
                key={product._id}
                product={product}
              ></TrendingProduct>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
