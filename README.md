# Marker plugin for Chartist.js

This is a simple plugin for Chartist.js that will display a series of data as vertical markers in a line chart.

## Download
The easiest way to get started, using Bower
```
bower install chartist-plugin-marker --save
```

## Available options and their defaults

```javascript
var defaultOptions = {
  series: [],
  threshold: 0,
  classNames: {
    markerClass: 'ct-marker',
    markerPointClass: 'ct-marker-point',
    markerLineClass: 'ct-marker-line'
  }
};
```

## Sample usage in Chartist.js

```javascript
var chart = new Chartist.Line('.ct-chart', {
  labels: [1, 2, 3, 4, 5, 6, 7],
  series: [
    {
      "name": "Series 1",
      "data": [1, 5, 3, 4, 6, 2, 3],
    },
    {
      "name": "Series 2",
      "data": [2, 4, 2, 5, 4, 3, 6]
    }
  ]
}, {
  plugins: [
    ctMarker({
      series: ['Series 1'],
      threshold: 2
    })
  ]
});
```
