import React, { useState, useEffect } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
const mapbox_token = process.env.REACT_APP_MAPBOX

function Map({children, onMove, latitude = 0, longitude = 0, zoom = 1}) {
  useEffect(() => {
    setViewport((viewport) => ({
      ...viewport,
      latitude,
      longitude,
      zoom,
    }))
  }, [latitude, longitude, zoom]);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude,
    longitude,
    zoom,
  });

  const onViewportChange = (viewport) => {
    const mapBounds = mapRef?.getMap().getBounds()
    if (onMove) {
      onMove(
        {
          latitude: viewport.latitude,
          longitude: viewport.longitude,
          zoom: viewport.zoom,
        },
        mapBounds);
    } else {
      setViewport(viewport);
    }
  };

  let mapRef;
  return (
    <ReactMapGL
      ref={map => mapRef = map}
      mapboxApiAccessToken={mapbox_token}
      onViewportChange={onViewportChange}
      {...viewport}
    >
      {children}
      <div style={{position: 'absolute', right: 0}}>
        <NavigationControl />
      </div>
    </ReactMapGL>
  );
}

export default Map;
