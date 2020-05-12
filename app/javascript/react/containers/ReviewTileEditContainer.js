import React, { useState } from 'react'
import _ from 'lodash'

import ErrorList from '../components/ErrorList'

const ReviewTileEditContainer = ({entree, review, fetchPickedReviews, editReview, handleEditReview, siteReviewForm, fetchSiteReviews}) => {
  const [reviewRecord, setReviewRecord] = useState({
    rating: review.rating,
    comments: review.comments
   });
  const [ errors, setErrors ] = useState({})

  const handleChange = (event) => {
    setReviewRecord({
      ...reviewRecord,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const validForSubmission = () => {
    let submitErrors = {};
    if (reviewRecord["rating"].trim() === "" || reviewRecord["rating"].trim() < 0 || reviewRecord["rating"].trim() > 6 ) {
      submitErrors = {
        ...submitErrors,
        ["rating"]: "Please provide a rating between 0 to 5"
      };
    }

    setErrors(submitErrors);
    return _.isEmpty(submitErrors);
  };

  const handleSiteReviewEdit = () => {
    let formPayload = {
      review: {
        comments: reviewRecord.comments,
        rating: reviewRecord.rating,
        user_id: review.user_id,
      }
    };
    fetch(`/api/v1/site_reviews/${review.id}`, {
      credentials: "same-origin",
      method: "PATCH",
      body: JSON.stringify(formPayload),
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
        // setErrors(body.errors)
      } else {
        handleEditReview(false)
        fetchSiteReviews()
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const handlePickedReviewEdit = () => {
    let formPayload = {
      review: {
        comments: reviewRecord.comments,
        rating: reviewRecord.rating,
        user_id: review.user_id,
        menu_item_id: entree.menu_item.id
      }
    };
    fetch(`/api/v1/reviews/${review.id}`, {
      credentials: "same-origin",
      method: "PATCH",
      body: JSON.stringify(formPayload),
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
        // setErrors(body.errors)
      } else {
        handleEditReview(false)
        fetchPickedReviews()
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const onReviewEditSubmit = (event) => {
    event.preventDefault();
    if (validForSubmission()) {
      siteReviewForm ? handleSiteReviewEdit() : handlePickedReviewEdit()
    }
  };

  const handleEditReviewForm = () => {
    handleEditReview(false)
  }

  return (
    <div>
      <h5>Edit your Review</h5>
      <form className="new-review" onSubmit={onReviewEditSubmit}>
        <ErrorList errors={errors}/>
        <label>
          Rating:
          <input
            type="text"
            id="rating"
            onChange={handleChange}
            value={reviewRecord.rating}
          />
        </label>

        <label>
          Comments:
          <textarea
            type="text"
            id="comments"
            onChange={handleChange}
            value={reviewRecord.comments}
          />
        </label>

        <button className="button" type="submit" value="Submit">Submit</button>
        <button className="button" onClick={handleEditReviewForm} type="button" value="Cancel">Cancel</button>
      </form>
    </div>
  )
}

export default ReviewTileEditContainer;
