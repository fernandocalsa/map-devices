import React, { useState, useEffect } from 'react';
import kmeans from 'node-kmeans';
import Map from './components/Map';
import Cluster from './components/Cluster';
import 'normalize.css';
import devices from "./data/devices.json";

function App() {
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
  }, [])

  return (
    <div>
      <Map>
        {clusters.map(({centroid, cluster}) => (
          <Cluster
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
