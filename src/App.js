import React, { useState } from 'react';
import ReactMapGL, { Source, Layer, NavigationControl } from 'react-map-gl';
import 'normalize.css';
import devices from "./data/devices.json";
import Filter from './components/Filter';
import DeviceInfo from './components/DeviceInfo';
import layers from "./layers";
const mapbox_token = process.env.REACT_APP_MAPBOX

const devicesGeoJson = devices.map(({Geometry, ...properties}) => ({
  type: "Feature",
  geometry: {
    type: Geometry.Type,
    coordinates: Geometry.Coordinates,
  },
  properties,
}));


function App() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: 0,
    longitude: 0,
    zoom: 1,
  });

  const [deviceSelected, setDeviceSelected] = useState(null);

  const [devices, setDevices] = useState(devicesGeoJson);
  const geojson = {
    type: 'FeatureCollection',
    features: devices
  };

  const onMapClick = (event) => {
    const feature = event.features[0];
    if (!feature) {
      setDeviceSelected(null);
      return;
    }
    setDeviceSelected({
      properties: feature.properties,
      coordinates: feature.geometry.coordinates,
    });
  }

  return (
    <div>
      <ReactMapGL
        mapboxApiAccessToken={mapbox_token}
        onViewportChange={setViewport}
        interactiveLayerIds={["unclustered-points"]}
        onClick={onMapClick}
        {...viewport}
      >
        <Source
            type="geojson"
            data={geojson}
            cluster={true}
            clusterMaxZoom={2}
            clusterRadius={50}>
            <Layer {...layers.clusters} />
            <Layer {...layers.clustersCount} />
            <Layer {...layers.unclusteredPoints} />
          </Source>
          {
            deviceSelected && 
            <DeviceInfo 
              coordinates={deviceSelected.coordinates}
              onClose={() => setDeviceSelected(null)}
              device={deviceSelected.properties}
            />
          }
        <div style={{position: 'absolute', right: 0}}>
          <NavigationControl />
        </div>
        <div style={{position: 'absolute', left: 0}}>
          <Filter onUpdate={setDevices} devices={devicesGeoJson} />
        </div>
      </ReactMapGL>
    </div>
  );
}

export default App;
