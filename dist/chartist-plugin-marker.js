(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['Chartist.plugins.ctMarker'] = factory();
  }
}(this, function () {

  /**
   * Chartist.js plugin to display a series of data as vertical markers in a line
   * chart.
   *
   */

  /* global Chartist */
  (function(window, document, Chartist) {
    'use strict';

    var CtMarker = function(options) {

      options = Chartist.extend({}, defaultOptions, options);

      return function ctMarker(chart) {

        if (chart instanceof Chartist.Line) {

          chart.on('draw', function (data) {

            var verticalMarker,
                seriesName = data.series && data.series.name ? data.series.name : null,
                chartHeight = chart.svg.height(),
                pointShape = options.pointShape || 'circle',
                allSeries = options.allSeries || false;

            if (allSeries || options.series.indexOf(seriesName) !== -1) {

              // Move points to bottom of the charts.
              if (data.type === 'point' && data.value.y > options.threshold) {

                switch (pointShape) {

                  case 'triangle':
                    var triangle = new Chartist.Svg('path', {
                      d: ['M',
                        data.x,
                        (chartHeight - chart.options.axisX.offset - chart.options.chartPadding.bottom) - 6,
                        'L',
                        data.x - 8,
                        (chartHeight - chart.options.axisX.offset - chart.options.chartPadding.bottom) + 3,
                        'L',
                        data.x + 8,
                        (chartHeight - chart.options.axisX.offset - chart.options.chartPadding.bottom) + 3,
                        'z'].join(' '),
                      style: 'fill-opacity: 1'
                    }, 'ct-area');
                    data.element.replace(triangle).addClass(options.classNames.markerPointClass);
                    break;

                  default:
                    // Alter the existing marker point position to the bottom of the chart.
                    data.element
                      .attr({
                        y1: chartHeight - chart.options.axisX.offset - chart.options.chartPadding.bottom,
                        y2: chartHeight - chart.options.axisX.offset - chart.options.chartPadding.bottom
                      })
                      .addClass(options.classNames.markerPointClass);

                }


              }
              // Convert existing line area to vertical markers.
              else if (data.type === 'line' && data.values.length) {

                // Remove the original line path.
                data.element.remove();

                // Iterate over values and create vertical markers.
                for (var i = 0, len = data.values.length; i < len; i++) {

                  if (data.values[i] !== undefined && data.values[i].y > options.threshold) {

                    // Create vertical marker line.
                    verticalMarker = Chartist
                      .Svg('line', {
                        x1: data.axisX.projectValue(data.values[i].x, i) + chart.options.axisY.offset + chart.options.chartPadding.left,
                        y1: 0 + chart.options.chartPadding.top,
                        x2: data.axisX.projectValue(data.values[i].x, i) + chart.options.axisY.offset + chart.options.chartPadding.left,
                        y2: chartHeight - chart.options.axisX.offset - chart.options.chartPadding.bottom
                      }, 'ct-line')
                      .addClass(options.classNames.markerLineClass);

                    // Append vertical markerline to SVG group.
                    data.group.append(verticalMarker);

                  }
                }

              }
              // Remove all other data except grids and labels.
              else if (data.type !== 'grid' && data.type !== 'label') {
                data.element.remove();
              }

              // Add the marker class to the group.
              data.group.addClass(options.classNames.markerClass);

            }
          });

        }

      };

    };

    var defaultOptions = {
      series: [],
      threshold: 0,
      classNames: {
        markerClass: 'ct-marker',
        markerPointClass: 'ct-marker-point',
        markerLineClass: 'ct-marker-line'
      }
    };

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.ctMarker = CtMarker;

  }(window, document, Chartist));

  return Chartist.plugins.ctMarker;

}));
