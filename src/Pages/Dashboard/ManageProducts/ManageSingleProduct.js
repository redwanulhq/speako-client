import React from "react";
import Rating from "react-rating";

const ManageSingleProduct = ({ product, setControl }) => {
  const { name, price, rating, imgURL, _id, description } = product;

  const handleDeleteProduct = () => {
    const confirmMessage = "Are you sure, you want to delete the product?";
    if (window.confirm(confirmMessage)) {
      //eslint-disable-line
      fetch(`https://speako-server.vercel.app/products/${_id}`, {
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
  return (
    <tr>
      <td style={{ width: "100px" }}>
        <img
          style={{ width: "100px", height: "70px", objectFit: "cover" }}
          src={imgURL}
          alt=""
        />
      </td>
      <td style={{ width: "150px" }}>{name}</td>
      <td style={{ width: "50px" }}>${price}</td>
      <td style={{ width: "150px" }}>
        <Rating
          className="text-center review-rating"
          readonly
          initialRating={rating}
          emptySymbol="far fa-star"
          fullSymbol="fas fa-star"
        />
      </td>
      <td style={{ width: "400px" }}>
        <div>{description}</div>
      </td>
      <td style={{ width: "150px" }}>
        <button
          onClick={() => handleDeleteProduct(_id)}
          className="btn btn-danger w-100"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ManageSingleProduct;
