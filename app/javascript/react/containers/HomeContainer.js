import React, { useState, useEffect } from "react";
import LoaderComponent from '../components/LoaderComponent'

import Usericon1 from "../../../assets/images/user-icon3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const HomeContainer = (props) => {
  const [ siteReviews, setSiteReviews ] = useState([])

  useEffect(() => {
    fetchSiteReviews();
  },[])

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
    // <div className="site-reviews cell medium-6" key={review.id}>
    //   <div className="callout">
    //     <div class="media-object">
    //       <div class="media-object-section">
    //         <div class="thumbnail">
    //           <span className="user-icon"><FontAwesomeIcon icon={faUser} /></span>
    //         </div>
    //       </div>
    //       <div class="media-object-section">
    //         <div class="dialogbox">
    //           <div class="body">
    //             <span class="tip tip-left"></span>
    //             <div class="message">
    //               {review.comments} - {review.rating}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    reviews = siteReviews.map(review => {
      return (
        <div className="site-reviews cell medium-6" key={review.id}>
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
        <h4>Hi, Welcome to the Entrée Picker</h4><br />
        <h5>Are you not able to decide what to eat for lunch or dinner? You have come to the right place.
          We will pick an entree for you, so you don't have to think and search what to eat.</h5>
      </div>
      <br />
      <div className="user-reviews-text"><h5>What our users think about Entrée Picker</h5></div>
      <div className="grid-x grid-margin-x">
        {reviews}
      </div>
    </div>
  );
};

export default HomeContainer;
