const merge = require('lodash/merge');
const range = require('lodash/range');
const moment = require('moment');

export const currentConfigFn = (labels, points) => {
  const config = {
    data: {
      datasets: [{
        borderWidth: 2,
        pointHitRadius: 7,
      }],
    },
    options: {
      scales: {
        xAxes: [{
          type: 'linear',
          ticks: {
            callback: (value, i, values) => labels[value],
            max: labels.length,
            stepSize: 60
          }
        }],
      },
      tooltips: {
        callbacks: {
          label: (item, data) => {
            const point = points[item.index]
            const value = point.y
            return ` ${value} 倍（${labels[point.x]}）`
          },
        },
      },
    }
  };

  return merge(defaultConfig(points), config);
};

export const currentPointFn = (labels) => (point) => {
  return {x: point[0], y: point[1]};
};

export const entireConfigFn = (labels, points) => {
  const first = moment(labels[0]).year();
  const last = moment(labels[labels.length - 1]).year();
  const labelsRange = range(first, last + 1).map((v) => v.toString());

  const config = {
    labels: labelsRange,
    data: {
      datasets: [{
        borderWidth: 1.5,
        pointHitRadius: 2,
      }],
    },
    options: {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'year',
            stepSize: 1,
          },
        }],
      },
      tooltips: {
        callbacks: {
          label: (item, data) => {
            const point = points[item.index]
            const value = point.y
            return ` ${value} 倍（${point.x}）`
          },
        },
      },
    }
  };

  return merge(defaultConfig(points), config);
};

export const entirePointFn = (labels) => (point, i) => {
  return {x: labels[i], y: point[1]};
};

function defaultConfig(points) {
  return {
    type: 'shadowLine',
    data: {
      datasets: [
        {
          data: points,
          backgroundColor: '#edc240',
          borderColor: '#edc240',
          fill: false,
          pointHoverBackgroundColor: 'transparent',
          pointHoverBorderColor: '#afd8f8',
          pointHoverBorderWidth: 4,
          pointHoverRadius: 6,
          pointRadius: 0,
        }
      ]
    },
    options: {
      animation: {
          duration: 0,
      },
      elements: {
          line: {
              tension: 0.1,
          }
      },
      hover: {
          animationDuration: 0,
      },
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false,
      responsiveAnimationDuration: 0,
      scales: {
        xAxes: [{
          gridLines: {
            drawTicks: false,
          },
          ticks: {
            autoSkip: false,
            padding: 10,
            maxRotation: 45,
          }
        }],
        yAxes: [{
          gridLines: {
            drawTicks: false,
          },
          ticks: {
            padding: 10,
            maxTicksLimit: 6,
          }
        }]
      },
      tooltips: {
        callbacks: {
          title: (item, data) => {},
        },
        displayColors: false,
        caretPadding: 5,
      },
    }
  };
};
