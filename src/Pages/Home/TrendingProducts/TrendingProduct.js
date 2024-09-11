import React from "react";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import starFill from "../../../images/star-fill.png";
import starEmpty from "../../../images/star-empty.png";

const TrendingProduct = ({ product }) => {
    const { description, name, rating, price, imgURL, _id } = product;
    return (
        /*        <div className="col">
            <div className="card h-100">
                <div className="card-img-container">
                    <img src={imgURL} className="card-img-top product-img" alt="..." />
                </div>
                <div className="card-body">
                    <h5 className="card-title fs-4 short-heading">{name}</h5>

                    <div className="d-flex justify-content-between">
                        <Rating
                            className="review-rating"
                            readonly
                            initialRating={rating}
                            emptySymbol="far fa-star"
                            fullSymbol="fas fa-star"
                        />
                        <div className="fw-bold fs-4">${price}</div>
                    </div>
                    <p className="card-text short-text">{description}</p>
                    <Link className="btn btn-dark w-100" to={`/products/${_id}`}>
                        Product Details
                    </Link>
                </div>
            </div>
        </div> */
        <div className="col">
            <div className="single-product-card">
                <div className="product-img">
                    <img src={imgURL} alt="..." />
                </div>
                <h5 className="card-title short-heading">{name}</h5>
                <div className="product-footer">
                    <h5 className="product-price">${price}</h5>
                    <Rating
                        className="review-rating"
                        readonly
                        initialRating={rating}
                        emptySymbol={<img src={starEmpty} className="star-icon" />}
                        fullSymbol={<img src={starFill} className="star-icon" />}
                    />
                </div>
                <div className="product-hover-container">
                    <Link className="btn btn-dark w-100" to={`/products/${_id}`}>
                        Product Details
                    </Link>
                    <p className="card-text short-text">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default TrendingProduct;
