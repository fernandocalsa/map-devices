import React, { useState, useRef, useEffect } from 'react';

export default function Filter({devices, onUpdate}) {
  const [devicesFiltered, setDevicesFiltered] = useState(devices);
  const [active, setActive] = useState("all");
  const [minBattery, setMinBattery] = useState(0);
  const [maxBattery, setMaxBattery] = useState(1);
  const totalMinTemperature = useRef(0);
  const totalMaxTemperature = useRef(0);
  const [minTemperature, setMinTemperature] = useState(0);
  const [maxTemperature, setMaxTemperature] = useState(0);

  useEffect(() => {
    const [minTemperature, maxTemperature] = devices.reduce(([minTemperature, maxTemperature], {properties}) => {
      const temperature = properties.Temperature;
      if (minTemperature >  temperature) {
        minTemperature = temperature;
      }
      if (maxTemperature < temperature) {
        maxTemperature = temperature;
      }
      return [minTemperature, maxTemperature];
    }, [devices[0].properties.Temperature,devices[0].properties.Temperature]);
    totalMinTemperature.current = minTemperature;
    totalMaxTemperature.current = maxTemperature;
    setMinTemperature(minTemperature);
    setMaxTemperature(maxTemperature);
  }, []);
  const onActiveChange = (event) => {
    setActive(event.target.value);
  }
  const onMinBatteryChange = (event) => {
    const newMinBattery = event.target.value;
    if (newMinBattery < maxBattery) {
      setMinBattery(newMinBattery);
    }
  }
  const onMaxBatteryChange = (event) => {
    const newMaxBattery = event.target.value;
    if (newMaxBattery > minBattery) {
      setMaxBattery(newMaxBattery);
    }
  }

  const onMinTemperatureChange = (event) => {
    const newMinTemperature = parseFloat(event.target.value);
    if (newMinTemperature < maxTemperature) {
      setMinTemperature(newMinTemperature);
    }
  }

  const onMaxTemperatureChange = (event) => {
    const newMaxTemperature = parseFloat(event.target.value);
    if (newMaxTemperature > minTemperature) {
      setMaxTemperature(newMaxTemperature);
    }
  }

  useEffect(() => {
    const newDevices = devices.filter(({properties}) => {
      let isFilterValid = true;
      if (active === "active") {
        isFilterValid = isFilterValid && properties.Active;
      }
      if (active === "no-active") {
        isFilterValid = isFilterValid && !properties.Active;
      }
      isFilterValid = isFilterValid && (properties.Battery >= minBattery);
      isFilterValid = isFilterValid && (properties.Battery <= maxBattery);
      isFilterValid = isFilterValid && (properties.Temperature >= minTemperature);
      isFilterValid = isFilterValid && (properties.Temperature <= maxTemperature);
      return isFilterValid;
    });
    setDevicesFiltered(newDevices)
  }, [active, minBattery, maxBattery, minTemperature, maxTemperature]);

  useEffect(() => {
    onUpdate(devicesFiltered);
  }, [devicesFiltered]);

  return (
    <div>
      <div>Total devices: {devices.length}</div>
      <div>Filtered devices: {devicesFiltered.length}</div>
      <div>
        <label>
          Filter by active status
          <select value={active} onChange={onActiveChange}>
            <option value="all">All</option>
            <option value="active">only active</option>
            <option value="no-active">only no active</option>
          </select>
        </label>
      </div>
      <fieldset>
        <legend>Battery level: {minBattery} - {maxBattery}</legend>
        <div>
          <label>
            Min battery
            <input value={minBattery} type="range" min="0" max="1" onChange={onMinBatteryChange} step="0.01"/>
          </label>
        </div>
        <div>
          <label>
            Max battery
            <input value={maxBattery} type="range" min="0" max="1" onChange={onMaxBatteryChange} step="0.01"/>
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>Temperature: {minTemperature} - {maxTemperature}</legend>
        <div>
          <label>
            Min Temperature
            <input value={minTemperature} type="range" min={totalMinTemperature.current} max={totalMaxTemperature.current} onChange={onMinTemperatureChange} step="0.01"/>
          </label>
        </div>
        <div>
          <label>
            Max Temperature
            <input value={maxTemperature} type="range" min={totalMinTemperature.current} max={totalMaxTemperature.current} onChange={onMaxTemperatureChange} step="0.01"/>
          </label>
        </div>
      </fieldset>
    </div>
  )
}