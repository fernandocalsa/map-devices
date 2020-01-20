import React from 'react';
import {Marker} from 'react-map-gl';

function Cluster({
  latitude,
  longitude,
  count,
  total,
  onClick,
}) {
  let padding = (count/total) * 200;
  padding = padding > 20 ? 20 : padding;
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <div 
        style={{
          borderRadius: "50%",
          border: "1px solid #FFF",
          backgroundColor: "#007B99",
          color: "#FFF",
          fontSize: "1.2rem",
          lineHeight: "25px",
          textAlign: "center",
          padding: `${2+padding}px`,
          width: "25px",
          height: "25px",
        }}
        onClick={onClick}>
        {count}
      </div>
    </Marker>
  );
}

export default Cluster;
