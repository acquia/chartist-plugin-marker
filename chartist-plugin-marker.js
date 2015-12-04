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
              seriesName = data.series && data.series.name ? data.series.name : '';

          if (options.series.length === 0 || options.series.indexOf(seriesName) !== -1) {

            if (data.type === 'point' && data.value.y > options.threshold) {

              // Alter the existing marker point position to the bottom of the chart.
              data.element.attr({
                y1: chart.options.height - chart.options.axisX.offset - chart.options.chartPadding.bottom,
                y2: chart.options.height - chart.options.axisX.offset - chart.options.chartPadding.bottom
              }).addClass(options.classNames.markerPointClass);

              // Create vertical marker line.
              var verticalMarker = Chartist.Svg('line', {
                  x1: data.x,
                  y1: 0 + chart.options.chartPadding.top,
                  x2: data.x,
                  y2: chart.options.height - chart.options.axisX.offset - chart.options.chartPadding.bottom
                }, options.classNames.markerLineClass);

              // Append vertical markerline to SVG group.
              data.group.append(verticalMarker).addClass(options.classNames.markerClass);

            } else {
              data.element.remove();
            }

            // Remove the original line path between points.
            if (data.type === 'line' && !options.keepOriginalPath) {
              data.element.remove();
            }

          }
        });

      }

    };

  };

  var defaultOptions = {
    series: [],
    classNames: {
      markerClass: 'ct-marker',
      markerPointClass: 'ct-marker-point',
      markerLineClas: 'ct-marker-line'
    },
    threshold: 0,
    keepOriginalPath: false
  };

  Chartist.plugins = Chartist.plugins || {};
  Chartist.plugins.ctMarker = CtMarker;

}(window, document, Chartist));
