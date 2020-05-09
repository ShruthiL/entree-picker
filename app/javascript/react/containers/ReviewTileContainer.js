import React, { useState, useEffect } from 'react';

import ReviewTileEditContainer from './ReviewTileEditContainer'

const ReviewTileContainer = ({entree, review, fetchPickedReviews, handleShowReviewForm}) => {
  const [ editReview, setEditReview] = useState(false)

  const handleEditReview = (val = true) => {
    val == false ? setEditReview(val) : setEditReview(val)
    // if (val == false) {
    //   setEditReview(val)
    // } else {
    //   setEditReview(val)
    // }
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
          handleShowReviewForm(false)
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
      {editReview ? <ReviewTileEditContainer handleEditReview={handleEditReview} editReview={editReview} entree={entree} review={review} fetchPickedReviews={fetchPickedReviews}/> : ""}
    </div>
  )
}

export default ReviewTileContainer;
