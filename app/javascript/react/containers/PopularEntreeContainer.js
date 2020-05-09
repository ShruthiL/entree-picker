import React, { useState, useEffect } from "react";

import ReviewTileComponent from '../components/ReviewTileComponent';
import MapComponent from '../components/MapComponent'

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

  let reviewsTile;
  if(errors) {
    return <>Entrees not available</>
  } else if (Object.keys(entreeReviews).length <= 0) {
      return <>Loading</>
    } else {
      reviewsTile = entreeReviews.map(review => {
        return (
          <ReviewTileComponent key={review.id} review={review}/>
        )
      })
    }

  if(errors) {
    return <>Entrees not available</>
  } else if (Object.keys(popularEntree).length <= 0) {
      return <>Loading..</>
    } else {
      return (
        <div className="popular-entree">
          <p>Here is the most popular entree you can try:</p>
          <h4>Entree: {popularEntree.name}</h4>
          <h4>Restaurant: {popularEntree.restaurant.name}</h4>
          <div><MapComponent location={popularEntree.restaurant}/></div>
          <button className="button" onClick={handleEntree}>Not satisfied? Want to try a different entree</button>
          <button />
          {reviewsTile}
        </div>
      );
    }
};

export default PopularEntreeContainer;
