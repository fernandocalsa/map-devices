import React from 'react';
import { Popup } from 'react-map-gl';

export default function DeviceInfo({coordinates, onClose, device}) {
  return (
    <Popup
      tipSize={5}
      anchor="top"
      longitude={coordinates[0]}
      latitude={coordinates[1]}
      closeOnClick={false}
      onClose={onClose}
      >
        <div>
          <div>Name: {device.Name}</div>
          <div>Status: {device.Active ? "Active" : "No active"}</div>
          <div>Battery: {parseInt(device.Battery*100)}%</div>
          <div>Temperature: {device.Temperature}°C</div>
        </div>
    </Popup>
  )
}
