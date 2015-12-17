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

| __Option__ | __Description__ | __Type__ | __Default__ |
| ---        | ---             | ---      | ---         |
| `series` | Array of series names to show as markers. | `Array` | `[]` |
| `allSeries` | Supercedes `series` option. If set `true` all series will be converted to markers. | `boolean` | `false` |
| `threshold` | All series Y values above the threshold will be shown. | `number` | `0` |
| `pointShape` | The shape of the points for the marker. Currently only `circle` and `triangle` are supported. | `string` | `circle` |
| `classNames` | Assign custom class name to series (`markerClass`), points (`markerClassPoint`), and lines (`markerClassLine`) of the marker  | `object` | |


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
