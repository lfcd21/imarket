const merge = require('lodash/merge');

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

export const entireConfigFn = (labels, points) => {
  const config = {
    labels: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'], // TODO
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