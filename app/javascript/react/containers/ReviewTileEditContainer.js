import React, { useState, useEffect } from 'react'
import _ from 'lodash'

const ReviewTileEditContainer = ({entree, review, fetchPickedReviews}) => {
  const [reviewRecord, setReviewRecord] = useState({
    rating: review.rating,
    comments: review.comments
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

  const onReviewEditSubmit = (event) => {
    event.preventDefault();
    if (validForSubmission()) {
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
        console.log(body)
        if (body.errors){
        // setErrors(parsedData.errors)
        } else {
          fetchPickedReviews()
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }
  };

  return (
    <div>
      <h4>Add a Review:</h4>
      <form className="new-review" onSubmit={onReviewEditSubmit}>
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
      </form>
    </div>
  )
}

export default ReviewTileEditContainer;
