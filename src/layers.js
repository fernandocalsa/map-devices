const clusters = {
  id: "clusters",
  type: "circle",
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': '#ffe100',
    'circle-radius': ['step', ['get', 'point_count'], 20, 20, 25, 30, 30]
  }
};

const clustersCount = {
  id: "clusters-count",
  type: "symbol",
  filter: ['has', 'point_count'],
  layout: {
    "text-field": "{point_count}",
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    "text-size": 12,
  }
};

const unclusteredPoints = {
  id: "unclustered-points",
  type: "circle",
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-radius': 10,
    'circle-color': ["step", ["get", "Temperature"], "#00bfff", 15, "#ffbb00", 30, "#ff0000"],
  }
};

export default {
  clusters,
  clustersCount,
  unclusteredPoints,
};
