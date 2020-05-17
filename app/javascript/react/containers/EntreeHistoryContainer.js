import React, { useState, useEffect } from "react";

import EntreeHistoryTileContainer from './EntreeHistoryTileContainer';

const EntreeHistoryContainer = (props) => {
  const [ entreeHistory, setEntreeHistory ] = useState([])

  useEffect(() => {
    fetchPickedReviews();
  },[])

  const fetchPickedReviews = () => {
    fetch(`/api/v1/picked_entrees`)
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
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  let historyTile

  if (entreeHistory.length === 0) {
     historyTile = <div className="no-data">No Searches yet</div>
  } else {
    historyTile = entreeHistory.map(entree => {
      return (
        <div className="cell small-12 medium-6" key={entree.id}>
        <EntreeHistoryTileContainer
          entree={entree}
          fetchPickedReviews={fetchPickedReviews}/>
        </div>
      )
    })
  }

  return (
    <div className="entree-history grid-x grid-margin-x">
      {historyTile}
    </div>
  );
};

export default EntreeHistoryContainer;
