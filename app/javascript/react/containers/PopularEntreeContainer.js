import React, { useState, useEffect } from "react";

import ReviewTileComponent from '../components/ReviewTileComponent';
import MapComponent from '../components/MapComponent'
import EntreeImg from "../../../assets/images/entree-circle-icon.png";
import RestaurantImg from "../../../assets/images/restaurant.png";

const PopularEntreeContainer = ({location}) => {
  const [ popularEntree, setPopularEntree ] = useState({})
  const [ entreeReviews, setEntreeReviews ] = useState({})
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    fetchPopularEntree();
  },[])

  const fetchPopularEntree = () => {
    let requestBody;
    if (location.state.hasOwnProperty("location")) {
        requestBody = {
         location: location.state.location,
         prevPopularEntree: popularEntree
       }
    } else {
      requestBody = {
       selectedOptions: location.state.selectedOptions,
       prevPopularEntree: popularEntree
     }
    }
    fetch("/api/v1/menu_items", {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
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
        if (body.errors){
          setErrors(true)
          setPopularEntree({})
        } else {
          console.log(body)
          setPopularEntree(body)
          setEntreeReviews(body.reviews)
        }
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  const handleEntree = event => {
    event.preventDefault();
    fetchPopularEntree();
  }

  if(errors) {
    return <>Entrees not available</>
  } else if (Object.keys(popularEntree).length <= 0) {
      return <>Loading..</>
    } else {
      return (
        <div className="random-entree">
          <h5 className="satisfy">We picked this wonderful entrée today</h5>
          <h4 className="satisfy"><span><img className="entree-image" src={EntreeImg}></img></span> {popularEntree.name}</h4>
          <h4 className="satisfy"><span><img className="restaurant-image" src={RestaurantImg}></img></span> {popularEntree.restaurant.name}</h4>
          <div><MapComponent location={popularEntree.restaurant}/></div>
          <button className="button button-margin-top" onClick={handleEntree}>Not satisfied? Want to try a different entree</button>
          <button />
        </div>
      );
    }
};

export default PopularEntreeContainer;
