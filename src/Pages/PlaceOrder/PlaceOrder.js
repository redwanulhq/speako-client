import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import Footer from "../../Shared/Footer/Footer";
import Header from "../../Shared/Header/Header";
import "./PlaceOrder.css";
import { countryList } from "../../data";

const PlaceOrder = () => {
  const { id, quantity } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch(`https://speako-server.vercel.app/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);
  const { name, imgURL, price, rating, description, _id } = product;
  const history = useHistory();
  const { user } = useAuth();
  const { displayName, email } = user;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.productName = name;
    data.productImg = imgURL;
    data.price = parseInt(price) + 20;
    data.quantity = quantity;
    data.total = parseInt(price) * quantity + 20;
    data.paymentStatus = "Not Paid";
    data.deliveryStatus = "Pending";
    const time = new Date().toLocaleString();
    data.time = time;
    console.log(data);
    fetch("https://speako-server.vercel.app/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });

    console.log(data);
    alert("Order placed successfully");
    history.push("/products");
  };
  console.log(errors);
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="row">
            <div className="col-md-7 px-4 py-5 chekout-left">
              <form
                className="place-order-form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  className="w-100"
                  type="text"
                  readOnly
                  value={displayName}
                  {...register("full_name", { required: true, maxLength: 80 })}
                />
                <input
                  className="w-100"
                  type="text"
                  readOnly
                  value={email}
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                <input
                  className="w-100"
                  type="tel"
                  placeholder="Phone Number"
                  {...register("number", { required: true, maxLength: 12 })}
                />
                <input
                  className="w-100"
                  type="text"
                  placeholder="Address"
                  {...register("address", {})}
                />
                <input
                  className="w-100"
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  {...register("apartment", {})}
                />
                <input
                  className="w-100"
                  type="text"
                  placeholder="City"
                  {...register("city", {})}
                />
                <div className="checkout-country-container">
                  <select
                    defaultValue={1}
                    {...register("country", { required: true })}
                  >
                    <option value={1} disabled>
                      Country
                    </option>
                    {countryList.map((c) => (
                      <option value={c}>{c}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="State"
                    {...register("state", {})}
                  />
                  <input
                    type="number"
                    placeholder="Postal Code"
                    {...register("postal_code", {})}
                  />
                </div>
                <input
                  className="me-2"
                  type="checkbox"
                  placeholder="save_info"
                  {...register("save_info", {})}
                />
                Save this information for next time
                <input
                  value="Place Order"
                  className="w-100 btn-dark btn"
                  type="submit"
                />
              </form>
            </div>
            <div className="col-md-5 px-4 py-5 checkout-right">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <img
                    style={{
                      width: "60px",
                      backgroundColor: "#ddd",
                      borderRadius: "5px",
                      marginRight: "10px",
                    }}
                    src={imgURL}
                    alt=""
                  />{" "}
                  <span>{name}</span>
                  <span className="product-quantity-badge">{quantity}</span>
                </div>
                <span>${price}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <span>Subtotal:</span>
                <span>{`$${parseInt(price)} X ${quantity} = $${
                  parseInt(price) * quantity
                }`}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span>Shipping:</span>
                <span>$20</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <span>Total</span>
                <span>${parseInt(price) * quantity + 20}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PlaceOrder;
