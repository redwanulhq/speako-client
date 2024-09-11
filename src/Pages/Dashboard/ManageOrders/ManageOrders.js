import React, { useEffect, useState } from "react";
import ManageSingleOrder from "./ManageSingleOrder";
import "./ManageOrders.css";

const ManageOrders = () => {
  const [orders, setOrders] = useState();
  const [control, setControl] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    console.log(loading);
    fetch("https://speako-server.vercel.app/orders")
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setOrders(result);
      })
      .catch((err) => setLoading(false));
  }, [control]);
  return (
    <div className="orders-container">
      <h3 className="text-center position-relative">
        Manage Orders
        <span className="total-products">
          {orders?.length && `Total orders: ${orders.length}`}
        </span>
      </h3>
      <hr />
      {orders?.length ? (
        <table className="manage-order-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Order Code</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Payment Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .slice(0)
              .reverse()
              .map((order, index) => (
                <ManageSingleOrder
                  key={order._id}
                  order={order}
                  setControl={setControl}
                  control={control}
                  index={index}
                ></ManageSingleOrder>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="display-2 text-center no-booking">
          You have no Orders
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
