import React, { useState, useEffect } from 'react';

import ReviewTileEditContainer from './ReviewTileEditContainer'

const ReviewTileContainer = ({entree, review, fetchPickedReviews, handleShowReviewForm, siteReviewForm, fetchSiteReviews}) => {
  const [ editReview, setEditReview] = useState(false)

  const handleEditReview = (val = true) => {
    val == false ? setEditReview(val) : setEditReview(val)
  }

  const handleSiteReviewDelete = () => {
    fetch(`/api/v1/site_reviews/${review.id}`, {
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
      if (body.errors){
        setErrors(parsedData.errors)
      } else {
        fetchSiteReviews()
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const handlePickedEntreeReviewDelete = () => {
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
      if (body.errors){
        setErrors(parsedData.errors)
      } else {
        handleShowReviewForm(false)
        fetchPickedReviews()
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const handleDeleteReview = () => {
    siteReviewForm ? handleSiteReviewDelete() : handlePickedEntreeReviewDelete();
  }

  return (
    <div className="review-tile">
      <h5>Your Review</h5>
      <p>{review.rating}</p>
      <p>{review.comments}</p>
      {review.rating ? <button className="button" onClick={handleEditReview}>Edit</button> : ""}
      {review.rating ? <button className="button" onClick={handleDeleteReview}>Delete</button> : ""}
      {editReview ?
        <ReviewTileEditContainer
          handleEditReview={handleEditReview}
          editReview={editReview}
          entree={entree}
          review={review}
          fetchPickedReviews={fetchPickedReviews}
          siteReviewForm={siteReviewForm}
          fetchSiteReviews={fetchSiteReviews}
        /> : ""}
    </div>
  )
}

export default ReviewTileContainer;
