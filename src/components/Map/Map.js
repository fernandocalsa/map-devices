import React, { useState } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
const mapbox_token = process.env.REACT_APP_MAPBOX

function Map({children}) {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: 0,
    longitude: 0,
    zoom: 2
  });

  return (
    <ReactMapGL
      mapboxApiAccessToken={mapbox_token}
      {...viewport}
      onViewportChange={setViewport}
    >
      {children}
      <div style={{position: 'absolute', right: 0}}>
        <NavigationControl />
      </div>
    </ReactMapGL>
  );
}

export default Map;
