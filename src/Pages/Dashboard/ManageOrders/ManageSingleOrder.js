import React from "react";
import { BiTrash } from "react-icons/bi";

const ManageSingleOrder = ({ order, setControl, index }) => {
  const {
    full_name,
    _id,
    status,
    quantity,
    price,
    time,
    total,
    paymentStatus,
    deliveryStatus,
  } = order;
  console.log(order);
  const handleUpdateBooking = (id, value) => {
    order.deliveryStatus = value;
    fetch(`https://speako-server.vercel.app/orders/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setControl(true);
        } else {
          setControl(false);
        }
      });
  };

  const handleDeleteOrder = () => {
    const confirmMessage = "Are you sure, you want to cancel the order?";
    if (window.confirm(confirmMessage)) {
      //eslint-disable-line
      fetch(`https://speako-server.vercel.app/orders/${_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            setControl(true);
          } else {
            setControl(false);
          }
        });
    }
  };
  console.log(order);
  return (
    <tr>
      <td>
        <div>{index + 1}</div>
      </td>
      <td>
        <div>{_id}</div>
      </td>
      <td>
        <div>{time.split(",")[0]}</div>
      </td>
      <td>
        <div>{full_name}</div>
      </td>
      <td>
        <div>${price}</div>
      </td>
      <td>
        <div>{quantity}</div>
      </td>
      <td>
        <div>${total}</div>
      </td>
      <td>
        <div>{paymentStatus}</div>
      </td>
      {/* <td>
        {status ? (
          <div className="booking-status d-inline-block text-success">
            shipping
          </div>
        ) : (
          <button
            className="btn btn-dark w-100"
            onClick={() => handleUpdateBooking(_id)}
          >
            <i className="far fa-check-circle"></i> Ship Product
          </button>
        )}
      </td> */}
      <td>
        <div className="mange-orders-options">
          <select
            onChange={(e) => handleUpdateBooking(_id, e.target.value)}
            defaultValue={deliveryStatus}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="On delivery">On delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancel">Cancel</option>s
          </select>
          <button onClick={() => handleDeleteOrder(_id)}>
            <BiTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ManageSingleOrder;
