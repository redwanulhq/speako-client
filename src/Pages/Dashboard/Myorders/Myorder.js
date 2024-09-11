import React from "react";
import { BiTrash } from "react-icons/bi";
import { MdPayment } from "react-icons/md";

const Myorder = ({ order, setControl }) => {
  const { productName, _id, time, status, productImg, price, total, quantity } =
    order;

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
        <img src={productImg} alt="" className="my-order-table-img" />
      </td>
      <td>{productName}</td>
      <td>{_id}</td>
      <td>{time.split(",")[0]}</td>
      <td>${price}</td>
      <td>{quantity}</td>
      <td>${total}</td>
      <td>{status}</td>
      <td>
        <div className="order-table-options">
          <div className="oto-btn-cancel" onClick={handleDeleteOrder}>
            <BiTrash />
          </div>
          <div className="oto-pay-btn">
            <span>Pay </span>
            <MdPayment />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Myorder;
