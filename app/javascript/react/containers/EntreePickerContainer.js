import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom'

import EntreePickerByOptionsFormContainer from './EntreePickerByOptionsFormContainer';

const EntreePickerContainer = (props) => {
  const [ location, setLocation ] = useState({})
  const [ showOptions, setShowOptions ] = useState(false)
  const [ shouldRedirect, setShouldRedirect ] = useState(false)

  useEffect(() => {
    let lat, lon;
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }

    navigator.geolocation.getCurrentPosition(function(position) {
     lat = position.coords.latitude;
     lon = position.coords.longitude;
     console.log('lat and lng', position.coords.latitude);
     console.log('lat and lng', position.coords.longitude);
     setLocation({
       lat: lat,
       lon: lon
     })
   });
  },[])

  const handlePickRandomEntree = event => {
    event.preventDefault()
    setShowOptions(false)
    setShouldRedirect(true)
  }

  const handlePickRandomMenuByOptions = event => {
    event.preventDefault()
    setShowOptions(true)
  }

  if (shouldRedirect) {
    return <Redirect
      to={{
        pathname: "/popular_entree",
        state: { location: location }
      }}
    />
  }

  return (
    <div className="entree-picker-container">
      <button className="button" onClick={handlePickRandomEntree}>Entree Picker By Location</button>
      <button className="button" onClick={handlePickRandomMenuByOptions}>Entree Picker By Options</button>
      {showOptions ? <EntreePickerByOptionsFormContainer /> : <></>}
    </div>
  );
};

export default EntreePickerContainer;
