import React, { useState } from 'react';
import ReactMapGL, { Source, Layer, NavigationControl } from 'react-map-gl';
import 'normalize.css';
import devices from "./data/devices.json";
import Filter from './components/Filter';
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

  const [devices, setDevices] = useState(devicesGeoJson);
  const geojson = {
    type: 'FeatureCollection',
    features: devices
  };

  return (
    <div>
      <ReactMapGL
        mapboxApiAccessToken={mapbox_token}
        onViewportChange={setViewport}
        interactiveLayerIds={["clusters"]}
        {...viewport}
      >
        <Source
            type="geojson"
            data={geojson}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}>
            <Layer
              id="clusters"
              type="circle"
              filter={['has', 'point_count']}
              paint={{
                'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 10, '#f1f075', 25, '#f28cb1'],
                'circle-radius': ['step', ['get', 'point_count'], 15, 20, 20, 30, 30]
              }} />
            <Layer
              id="clusters-count"
              type="symbol"
              filter={['has', 'point_count']}
              layout={{
                "text-field": "{point_count}",
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                "text-size": 12,
              }} />
            <Layer
              id="unclustered-points"
              type="circle"
              filter={['!', ['has', 'point_count']]}
              paint={{
                'circle-radius': 10,
                'circle-color': '#007cbf'
              }} />
          </Source>
        <div style={{position: 'absolute', right: 0}}>
          <NavigationControl />
        </div>
        <div style={{position: 'absolute', left: 0, zIndex: 9999}}>
          <Filter devices={devicesGeoJson} onUpdate={setDevices} />
        </div>
      </ReactMapGL>
    </div>
  );
}

export default App;
