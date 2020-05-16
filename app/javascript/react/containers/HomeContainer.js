import React, { useState, useEffect } from "react";
import LoaderComponent from '../components/LoaderComponent'

import Usericon1 from "../../../assets/images/user-icon3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import ChartsContainer from "./ChartsContainer"

const HomeContainer = (props) => {
  const [ siteReviews, setSiteReviews ] = useState([])
  const [ chartsData, setChartsData ] = useState([])

  useEffect(() => {
    fetchSiteReviews();
    fetchAllPickedEntrees()
  },[])

  const fetchAllPickedEntrees = () => {
    fetch(`/api/v1/all_users_picked_entrees`)
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

  const handleChartsData = (allPickedEntrees) => {
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
      setSiteReviews(body.site_reviews);
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  let reviews;
  if (siteReviews.length == 0) {
    reviews = <></>
  } else {
    reviews = siteReviews.map(review => {
      return (
        <div className="site-reviews cell" key={review.id}>
          <div className="callout">
            <div className="display-flex">
              <div><p><span className="user-icon"><FontAwesomeIcon icon={faUser} /></span></p></div>
              <div className="dialogbox">
                <div className="body">
                  <span className="tip tip-left"></span>
                  <div className="message">
                    {review.comments} - {review.rating}
                    <p><span className="user">-{review.user.user_name}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="entree-home">
      <div className="about-site">
        <h2>Hi, Welcome to the Entrée Picker</h2>
        <h5>Are you not able to decide what to eat for lunch or dinner? You have come to the right place.
          We will pick an entree for you, so you don't have to think and search what to eat.</h5>
      </div>
      <br />
      <div className="user-reviews-text">
        <h5>What our users think about Entrée Picker</h5>
        <div className="grid-x">
          <div className="site-reviews cell medium-6">
            <p className="negative-margin">Entrée Search Trend</p>
            <div><ChartsContainer chartsData={chartsData} homePage={true}/></div>
          </div>
          <div className="site-reviews cell medium-6">
            <div className="grid-x margin-right">
              {reviews}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
