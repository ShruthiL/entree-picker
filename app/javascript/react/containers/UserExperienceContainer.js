import React, { useState, useEffect } from "react";

import ReviewTileContainer from './ReviewTileContainer'
import ReviewFormContainer from './ReviewFormContainer'

const UserExperienceContainer = (props) => {
  const [ siteReviews, setSiteReviews ] = useState({})
  const [ siteReviewForm, setSiteReviewForm ] = useState(true)
  // const [ showAddReviewForm, setShowAddReviewForm ] = useState(false)
  const [showReviewForm, setShowReviewForm ] = useState(false)

  // const handleShowReviewForm = (val = true) => {
  //   setShowReviewForm(val)
  // }

  useEffect(() => {
    fetchSiteReviews();
  },[])

  const fetchSiteReviews = () => {
    console.log('check');
    fetch(`/api/v1/site_reviews`)
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`;
          let error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
        console.log('check site reviews', body.current_user_review)
        setSiteReviews(body.current_user_review);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  const handleShowReviewForm = (val = true) => {
    setShowReviewForm(val)
  }

  let siteReviewTile;

  if ( siteReviews.length > 0 ) {
    siteReviewTile = <ReviewTileContainer review={siteReviews[0]} siteReviewForm={siteReviewForm} fetchSiteReviews={fetchSiteReviews}/>
  } else if(!showReviewForm) {
    siteReviewTile = <button onClick={handleShowReviewForm} className="button">Add Review</button>
    //
  } else {
    siteReviewTile = <ReviewFormContainer handleShowReviewForm={handleShowReviewForm} siteReviewForm={siteReviewForm} fetchSiteReviews={fetchSiteReviews}/>
  }


  return (
    <div className="user-experience">
      <h4>We would love to know your experience with the site: </h4>
      {siteReviewTile}
    </div>
  );
};

export default UserExperienceContainer;
