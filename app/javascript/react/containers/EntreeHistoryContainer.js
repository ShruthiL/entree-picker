import React, { useState, useEffect } from "react";

import EntreeHistoryTileContainer from './EntreeHistoryTileContainer';

const EntreeHistoryContainer = (props) => {
  const [ entreeHistory, setEntreeHistory ] = useState([])

  useEffect(() => {
    fetchPickedReviews();
  },[])

  const fetchPickedReviews = () => {
    console.log('check');
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
        console.log('check output')
        setEntreeHistory(body);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  let historyTile

  if (Object.keys(entreeHistory) > 0) {
     historyTile = <>Loading</>
  } else {
    historyTile = entreeHistory.map(entree => {
      return (
        <EntreeHistoryTileContainer
          key={entree.id}
          entree={entree}
          fetchPickedReviews={fetchPickedReviews}/>
      )
    })
  }

  return (
    <div>
      {historyTile}
    </div>
  );
};

export default EntreeHistoryContainer;
