import React, { useEffect } from "react";

const MapComponent = ({location}) => {
  useEffect(() => {
    const uluru = {lat: location.lat, lng: location.lon};
    const map = new google.maps.Map(document.getElementById('map'), {
         center: uluru,
         zoom: 8
    });
    const marker = new google.maps.Marker({position: uluru, map: map});
    google.maps.event.addListener(marker, 'click', function () {
      // window.open("https://www.google.com/maps/@442.3611,-71.0570");
      // window.open("https://www.google.com/maps?z=12&t=m&q=loc:42.1340298+-71.10118109999999");
      window.open(`https://www.google.com/maps?z=12&t=m&q=loc:${location.lat}+${location.lon}`);
   });
   marker.setMap( map );
  })
  return (
      <div id="map"></div>
  );
};

export default MapComponent;

function loadJS(src) {
  let ref = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}
