import React, { useState } from 'react'

import ErrorList from '../components/ErrorList'

const ReviewFormContainer = ({entree, fetchPickedReviews, handleShowReviewForm}) => {
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

  const validForSubmission = () => {
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

  const onSubmit = (event) => {
    event.preventDefault();
    if (validForSubmission()) {
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
        // setErrors(parsedData.errors)
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
  };

  const handleCancelReviewForm = () => {
    handleShowReviewForm(false)
  }

  return (
    <div>
      <h4>Add a Review:</h4>
      <form className="new-review" onSubmit={onSubmit}>
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

        <input className="button" type="submit" value="Submit" />
        <input className="button" onClick={handleCancelReviewForm} type="button" value="Cancel" />
      </form>
    </div>
  )
}

export default ReviewFormContainer;
