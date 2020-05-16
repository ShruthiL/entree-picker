import React, { useState, useEffect } from "react";

import ReviewTileContainer from './ReviewTileContainer'
import ReviewFormContainer from './ReviewFormContainer'
import ChartsContainer from './ChartsContainer'

const UserExperienceContainer = (props) => {
  const [ siteReviews, setSiteReviews ] = useState({})
  const [ siteReviewForm, setSiteReviewForm ] = useState(true)
  const [ showReviewForm, setShowReviewForm ] = useState(false)
  const [ chartsData, setChartsData ] = useState([])

  useEffect(() => {
    fetchSiteReviews();
    fetchAllPickedEntrees();
  },[])

  const fetchAllPickedEntrees = () => {
    fetch(`/api/v1/current_user_picked_entrees`)
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
        handleChartsData(body)
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  const handleChartsData = (data) => {
    let allPickedEntrees = data
    let color = null
    let responseData = {}
    const keys = Object.keys(allPickedEntrees);

    for (let i = 0; i < keys.length; i++) {
      if (i === 0) {
        responseData[keys[i]] = allPickedEntrees[keys[i]]
      } else {
        responseData[keys[i]] = allPickedEntrees[keys[i]] + responseData[keys[i - 1]]
      }
    }

    let cumulativeData = [["dates", "data"]]
      for(const ele in responseData) {
        cumulativeData.push([ele.substring(5, 10).replace('-', '/'), responseData[ele]])
    }

    setChartsData(cumulativeData)
  }

  const fetchSiteReviews = () => {
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
      setSiteReviews(body);
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
  } else {
    siteReviewTile = <ReviewFormContainer handleShowReviewForm={handleShowReviewForm} siteReviewForm={siteReviewForm} fetchSiteReviews={fetchSiteReviews}/>
  }

  let chartsTile;
  if (Object.keys(chartsData).length > 0) {
    chartsTile = <ChartsContainer chartsData={chartsData} homePage={false}/>
  } else {
    chartsTile = <></>
  }

  return (
    <div className="user-experience background-color">
      <h4>We would love to know your experience with the Entrée Picker</h4>
        {siteReviewTile}
        {chartsTile}
    </div>
  );
};

export default UserExperienceContainer;
