import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom'
import LoaderComponent from '../components/LoaderComponent'

import EntreePickerByOptionsFormContainer from './EntreePickerByOptionsFormContainer';

const EntreePickerContainer = (props) => {
  const [ location, setLocation ] = useState({})
  const [ showOptions, setShowOptions ] = useState(false)
  const [ shouldRedirect, setShouldRedirect ] = useState(false)
  const [ locationPermission, setLocationPermission] = useState(true)
  const [ locationAvailabe, setLocationAvailable ] = useState(true)

  useEffect(() => {
    let lat, lon;
    if ("geolocation" in navigator) {
      setLocationAvailable(true)
    } else {
      setLocationAvailable(false)
    }

    navigator.geolocation.watchPosition(function(position) {
      setLocationPermission(true)
    },
    function(error) {
      if (error.code == error.PERMISSION_DENIED)
        setLocationPermission(false)
    });

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

  if (shouldRedirect && locationAvailabe && locationPermission) {
    if (Object.keys(location).length === 0 ) {
      return <><LoaderComponent /></>
    } else {
      return <Redirect
        to={{
          pathname: "/picked_entree",
          state: { location: location }
        }}
      />
    }
  }

  return (
    <div className="entree-picker-container">
      { locationAvailabe ? <></> : <div>Your browswer doesn't support location, please pick entrée by options</div> }
      { locationPermission ? <></> : <div>Please allow access to you location to search by location.</div> }
      <button disabled={!locationPermission || !locationAvailabe} className="button" onClick={handlePickRandomEntree}>Entrée Picker By Your Location</button>
      <button className="button" onClick={handlePickRandomMenuByOptions}>Entrée Picker By Options</button>
      {showOptions ? <EntreePickerByOptionsFormContainer /> : <></>}
    </div>
  );
};

export default EntreePickerContainer;
