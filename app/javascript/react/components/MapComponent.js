import React, { useEffect } from "react";

const MapComponent = ({location}) => {
  useEffect(() => {
    const uluru = {lat: location.lat, lng: location.lon};
    const map = new google.maps.Map(document.getElementById('map'), {
         center: uluru,
         zoom: 12
    });
    const marker = new google.maps.Marker({position: uluru, map: map});
    google.maps.event.addListener(marker, 'click', function () {
      window.open(`https://www.google.com/maps?z=12&t=m&q=loc:${location.lat}+${location.lon}`);
   });
   marker.setMap( map );
  })
  return (
      <div id="map"></div>
  );
};

export default MapComponent;
