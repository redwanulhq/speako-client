import React from "react";
import Rating from "react-rating";

const SingleReview = ({ reviewCard }) => {
    const { photoURL, name, review, rating } = reviewCard;
    return (
        <div className="col">
            <div className="card h-100 p-2">
                <div className="card-body">
                    <p className="card-text short-review">{review}</p>
                    <Rating
                        className="text-center review-rating"
                        readonly
                        initialRating={rating}
                        emptySymbol="far fa-star"
                        fullSymbol="fas fa-star"
                    />
                    <div className="d-flex align-items-center">
                        <img
                            style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }}
                            src={photoURL}
                            className="card-img-top me-3"
                            alt="..."
                        />
                        <h5 style={{ margin: "0" }}>{name}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleReview;
