import React, { useState } from 'react'

import ErrorList from '../components/ErrorList'

const ReviewFormContainer = ({entree, fetchPickedReviews, handleShowReviewForm, siteReviewForm, fetchSiteReviews}) => {
  const [reviewRecord, setReviewRecord] = useState({
    rating: "",
    comments: ""
   });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setReviewRecord({
      ...reviewRecord,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const validFormSubmission = () => {
    let submitErrors = {};
    if (reviewRecord["rating"].trim() === "") {
      submitErrors = {
        ...submitErrors,
        ["rating"]: "Please select a rating"
      };
    }

    setErrors(submitErrors);
    return _.isEmpty(submitErrors);
  };

  const handleSiteReviewSubmit = () => {
    let formPayload = {
      review: {
        comments: reviewRecord.comments,
        rating: reviewRecord.rating
      }
    };
    fetch("/api/v1/site_reviews", {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(formPayload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        response.json().then((body) => setErrors(body.error));
        let errorMessage = `${response.status} (${response.statusText})`;
        let error = new Error(errorMessage);
        throw error;
      }
    })
    .then((response) => response.json())
    .then((body) => {
      console.log(body)
      if (body.errors){
        setErrors(body.errors)
      } else {
        fetchSiteReviews()
        setReviewRecord({
          rating: "",
          comments: ""
         })
      }
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  const handlePickedEntreeReviewSubmit = () => {
    let formPayload = {
      review: {
        comments: reviewRecord.comments,
        rating: reviewRecord.rating,
        menu_item_id: entree.menu_item.id
      }
    };
    fetch("/api/v1/reviews", {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(formPayload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        response.json().then((body) => setErrors(body.error));
        let errorMessage = `${response.status} (${response.statusText})`;
        let error = new Error(errorMessage);
        throw error;
      }
    })
    .then((response) => response.json())
    .then((body) => {
      console.log(body)
      if (body.errors){
        setErrors(body.errors)
      } else {
        fetchPickedReviews()
        setReviewRecord({
          rating: "",
          comments: ""
         })
      }
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (validFormSubmission()) {
      siteReviewForm ? handleSiteReviewSubmit() : handlePickedEntreeReviewSubmit()
    }
  };

  const handleCancelReviewForm = () => {
    handleShowReviewForm(false)
  }

  return (
    <div className="callout review-tile">
      <h5>Add a Review</h5>
      <form className="new-review" onSubmit={handleFormSubmit}>
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
          <input
            type="text"
            id="comments"
            onChange={handleChange}
            value={reviewRecord.comments}
          />
        </label>

        <button className="button" type="submit" value="Submit">Submit</button>
        <button className="button" onClick={handleCancelReviewForm} type="button" value="Cancel">Cancel</button>
      </form>
    </div>
  )
}

export default ReviewFormContainer;
