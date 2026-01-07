export const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'my-data',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': [
      'step',
      ['get', 'point_count'],
      '#34d399', // green for small clusters
      10, '#60a5fa', // blue for medium
      50, '#f472b6', // pink for large
      100, '#f59e42' // orange for very large
    ],
    'circle-radius': [
      'step',
      ['get', 'point_count'],
      20, 10, 28, 50, 36, 100, 44
    ],
    'circle-stroke-width': 2,
    'circle-stroke-color': '#fff'
  }
}

export const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'my-data',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': [
      'step',
      ['get', 'point_count'],
      '{point_count_abbreviated}',
      100, '99+'
    ],
    'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
    'text-size': 16,
    'text-allow-overlap': true
  },
  paint: {
    'text-color': '#fff',
    'text-halo-color': '#222',
    'text-halo-width': 2
  }
}

export const unclusteredPointLayer = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'my-data',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#10b981', // teal
    'circle-radius': 10,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#fff'
  }
} 