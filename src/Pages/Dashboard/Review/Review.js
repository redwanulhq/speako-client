import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Rating from "react-rating";
import useAuth from "../../../hooks/useAuth";
import "./Review.css";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const handleRating = (value) => {
    setRating(value);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.photoURL = user.photoURL;
    if (rating) {
      data.rating = rating;
      setError("");
      setRating(0);
    } else {
      setError("Please select the rating you prefer");
      return;
    }

    fetch("https://speako-server.vercel.app/reviews", {
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

    alert("Review submited successfully");
    reset();
  };
  console.log(errors);
  return (
    <div>
      <div className="form-container review-form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            readOnly
            defaultValue={user.displayName}
            placeholder="First name"
            {...register("name", { required: true, maxLength: 80 })}
          />
          <input
            type="text"
            readOnly
            defaultValue={user.email}
            placeholder="Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          <Rating
            className="review-rating"
            onClick={handleRating}
            emptySymbol="far fa-star"
            fullSymbol="fas fa-star"
          />
          <textarea
            placeholder="Write your comments here"
            {...register("review", { required: true })}
          />
          <p className="text-danger">{error}</p>
          <input value="Submit Review" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Review;
