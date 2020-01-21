import React, { useState, useEffect } from 'react';
import kmeans from 'node-kmeans';
import Map from './components/Map';
import Cluster from './components/Cluster';
import 'normalize.css';
import devices from "./data/devices.json";

function App() {
  const [mapPosition, setMapPosition] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 4,
  });
  const [clusters, setClusters] = useState([]);
  useEffect(() => {
    const devicesCoordinates = devices.map(device => ([
      device.Geometry.Coordinates[0],
      device.Geometry.Coordinates[1],
    ]));
    let numOfClusters = Math.floor(devicesCoordinates.length/50);
    numOfClusters = numOfClusters > 10 ? 10 : numOfClusters;
    kmeans.clusterize(devicesCoordinates, {k: numOfClusters}, (err,res) => {
      if (err) console.error(err);
      else setClusters(res);
    });
  }, []);

  const onMapMove = (viewport, mapBounds) => {
    setMapPosition((mapPosition) => ({
      ...mapPosition,
      ...viewport,
    }));
  }

  const onClusterClick = (centroid) => {
    setMapPosition(mapPosition => ({
      ...mapPosition,
      latitude: centroid[0],
      longitude: centroid[1],
      zoom: mapPosition.zoom+2,
    }));
  }

  return (
    <div>
      <Map
        latitude={mapPosition.latitude}
        longitude={mapPosition.longitude}
        zoom={mapPosition.zoom}
        onMove={onMapMove}>
        {clusters.map(({centroid, cluster}, i) => (
          <Cluster
            key={i}
            onClick={() => onClusterClick(centroid, i)}
            latitude={centroid[0]}
            longitude={centroid[1]}
            count={cluster.length}
            total={devices.length}/>
        ))}
      </Map>
    </div>
  );
}

export default App;
