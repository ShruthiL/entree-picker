import React, { useState, useEffect } from 'react'

const EntreeReviewFormContainer = () => {
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
          comments: reviewRecord.review,
          rating: reviewRecord.rating,
          user_id: props.user.id,
          podcast_id: props.id
        }
      };
      fetch(`/api/v1/podcasts/${props.id}/reviews`, {
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
          props.rerender(body.review)
          setReviewRecord({
            rating: "",
            review: ""
           })
        })
        .catch((error) => console.error(`Error in fetch: ${error.message}`));
    }
  };

  return (
    <div>
      <h4>Add a Review:</h4>
      <form className="new-review" onSubmit={onSubmit}>
        <label>
          Rating:
          <select id="rating" value={reviewRecord.rating} onChange={handleChange}>
            <option value=""></option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
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
      </form>
    </div>
  )
}

export default EntreeReviewFormContainer;
