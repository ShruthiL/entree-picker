import React, { useState, useEffect } from "react";

import EntreeHistoryTileComponent from '../components/EntreeHistoryTileComponent';

const PopularEntreeHistoryContainer = (props) => {
  const [ entreeHistory, setEntreeHistory ] = useState([])
  const [ editReview, setEditReview ] = useState(false)

  useEffect(() => {
    fetchPickedReviews();
  },[])

  const fetchPickedReviews = () => {
    console.log('check');
    fetch(`/api/v1/menu_items`)
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
        setEntreeHistory(body);
        setEditReview(false)
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  const handleVisited = () => {

  }

  let historyTile

  if (Object.keys(entreeHistory) > 0) {
     historyTile = <>Loading</>
  } else {
    historyTile = entreeHistory.map(entree => {
      return (
        <EntreeHistoryTileComponent
          key={entree.id}
          entree={entree}
          handleVisited={handleVisited}
          fetchPickedReviews={fetchPickedReviews}
          editReview={editReview}/>
      )
    })
  }

  return (
    <div>
      {historyTile}
    </div>
  );
};

export default PopularEntreeHistoryContainer;
