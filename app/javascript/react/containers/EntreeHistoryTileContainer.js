import React, { useState } from 'react';

import ReviewFormContainer from '../containers/ReviewFormContainer';
import ReviewTileContainer from "../containers/ReviewTileContainer"
import EntreeImg from "../../../assets/images/entree-circle-icon.png";
import RestaurantImg from "../../../assets/images/restaurant.png";


const EntreeHistoryTileContainer = ({entree, fetchPickedReviews}) => {
  const [showReviewForm, setShowReviewForm ] = useState(false)

  const handleClickVisited = event => {
    event.preventDefault()
    let formPayload = {
      entree: {
        entree: entree,
        visited: true
      }
    };
    fetch(`/api/v1/picked_entrees/${entree.id}`, {
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
      // setErrors(parsedData.errors)
      } else {
        fetchPickedReviews()
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const handleClickNotInterested = event => {
    event.preventDefault()
    fetch(`/api/v1/picked_entrees/${entree.id}`, {
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
        // setErrors(parsedData.errors)
        } else {
          fetchPickedReviews()

          // props.getGamePageInfo()
        }
      })

      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const handleShowReviewForm = (val = true) => {
    setShowReviewForm(val)
  }

  const reviewTile = <ReviewTileContainer
    entree={entree}
    review={entree.reviews}
    fetchPickedReviews={fetchPickedReviews} handleShowReviewForm={handleShowReviewForm}/>


  let usersInputOrRating;
  if (entree.visited) {
      if (entree.reviews === "") {
        usersInputOrRating =
          <div>
            {showReviewForm ?
              <ReviewFormContainer entree={entree} fetchPickedReviews={fetchPickedReviews} handleShowReviewForm={handleShowReviewForm} /> :
              <button className="button" onClick={handleShowReviewForm}>Add Review</button>}
          </div>
      }else {
        usersInputOrRating =
          <div>
            {reviewTile}
          </div>
      }
      // <div>{entree.reviews === "" ?
      //   <ReviewFormContainer entree={entree} fetchPickedReviews={fetchPickedReviews}/>  : reviewTile}
      // </div>
      // <ReviewFormContainer entree={entree} fetchPickedReviews={fetchPickedReviews}/> : reviewTile}
// <button className="button" onClick={handleAddReview}>Add Review</button>
    // usersInputOrRating = <div>{entree.reviews === "" ? <ReviewFormContainer entree={entree} fetchPickedReviews={fetchPickedReviews}/> : ""}</div>
  } else {
    usersInputOrRating =
    <div>
      {entree.reviews === "" ?
      <div><button className="button" onClick={handleClickVisited}>Visited? Please provide your rating</button>
          <button className="button" onClick={handleClickNotInterested}>Not interested anymore</button>
      </div> :
      reviewTile}
    </div>
  }
  // <div>{entree.reviews ? <ReviewTileContainer
  //     entree={entree}
  //     review={entree.reviews}
  //     fetchPickedReviews={fetchPickedReviews}/> : ""}
  // </div>

  return (
    <div className="callout">
      <h4><span><img className="entree-image" src={EntreeImg}></img></span>{entree.menu_item.name}</h4>
      <h4><span><img className="restaurant-image" src={RestaurantImg}></img></span>{entree.restaurant.name}</h4>
      <div>{usersInputOrRating}</div>
    </div>
  )
}

export default EntreeHistoryTileContainer;
