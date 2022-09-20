import React from "react";
import Rating from '@mui/material/Rating';

export default function RatingComponent({ rating, numReviews }) {
  return (
    <div className="rating">
         <Rating name="half-rating-read size-small" defaultValue={rating} value={rating} precision={0.5} readOnly />
         <span>{numReviews} reviews</span>
    </div>
  );
}
