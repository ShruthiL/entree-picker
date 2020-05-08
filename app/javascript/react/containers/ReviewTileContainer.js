import React, { useState, useEffect } from 'react';

import ReviewTileEditContainer from './ReviewTileEditContainer'

const ReviewTileContainer = ({entree, review, fetchPickedReviews, editReview}) => {
  const [ editReviewState, setEditReviewState ] = useState(editReview)
  
  const handleEditReview = () => {
    setEditReviewState(true)
  }

  const handleDeleteReview = () => {
    fetch(`/api/v1/reviews/${review.id}`, {
        credentials: "same-origin",
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        if(response.ok) {
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
          throw error
        }
      })
      .then(response => response.json())
      .then(body => {
        console.log(body)
        if (body.errors){
        // setErrors(parsedData.errors)
        } else {
          fetchPickedReviews()

          // props.getGamePageInfo()
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }
  return (
    <div>
      <p>{review.rating}</p>
      <p>{review.comments}</p>
      {review.rating ? <button className="button" onClick={handleEditReview}>Edit</button> : ""}
      {review.rating ? <button className="button" onClick={handleDeleteReview}>Delete</button> : ""}
      {editReviewState ? <ReviewTileEditContainer entree={entree} review={review} fetchPickedReviews={fetchPickedReviews}/> : ""}
    </div>
  )
}

export default ReviewTileContainer;
