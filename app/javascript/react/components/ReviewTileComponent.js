import React from 'react';

const ReviewTileComponent = ({review}) => {
  return (
    <div>
      <p>{review.rating}</p>
      <p>{review.comments}</p>
    </div>
  )
}

export default ReviewTileComponent;
