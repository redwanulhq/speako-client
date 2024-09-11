import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import useAuth from "../../../hooks/useAuth";
import Myorder from "./Myorder";
import ReactLoading from "react-loading";

const Myorders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [control, setControl] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`https://speako-server.vercel.app/orders/${user.email}`)
      .then((res) => res.json())
      .then((result) => {
        setMyOrders(result);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  }, [control]);

  return (
    <div>
      {!loading ? (
        <div className="my-orders-page">
          {myOrders.length ? (
            <table className="my-orders-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Item Name</th>
                  <th>Order Code</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Payment Status</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {myOrders
                  .slice(0)
                  .reverse()
                  .map((order) => (
                    <Myorder
                      key={order._id}
                      order={order}
                      setControl={setControl}
                      control={control}
                    ></Myorder>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="no-orders-found">
              <h3>You haven't placed any orders yet!</h3>
            </div>
          )}
        </div>
      ) : (
        <div className="my-order-loading-cotainer">
          <ReactLoading type="bubbles" color="black" width="120px" />
        </div>
      )}
    </div>
  );
};

export default Myorders;
