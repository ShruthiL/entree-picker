import React, { useEffect } from 'react';
import Popup from "reactjs-popup";

import EntreeReviewFormContainer from '../containers/EntreeReviewFormContainer';
import ReviewTileContainer from "../containers/ReviewTileContainer"


const EntreeHistoryTileComponent = ({entree, handleVisited, fetchPickedReviews, editReview}) => {
  const handleClickVisited = event => {
    event.preventDefault()
    handleVisited()
  }

  useEffect(() => {
  })

  let usersInputOrRating;
  if (entree.visited) {
    usersInputOrRating = <div>its rating</div>
  } else {
    // <button className="button" data-open="exampleModal1">Visited? Then please provide your rating</button>
    usersInputOrRating =
    <div>
      <button className="button" data-open="exampleModal1">Visited? Then please provide your rating</button>
      <button className="button">Not interested anymore</button>
    </div>
  }

  return (
    <div className="callout">
      <p>{entree.menu_item.name}</p>
      <p>{entree.restaurant.name}</p>
        {usersInputOrRating}
      <div>{entree.reviews ? <ReviewTileContainer
          entree={entree}
          review={entree.reviews}
          fetchPickedReviews={fetchPickedReviews}
          editReview={editReview}/> : <EntreeReviewFormContainer />}</div>
    </div>
  )
}

export default EntreeHistoryTileComponent;
