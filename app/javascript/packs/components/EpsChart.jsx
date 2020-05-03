/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { n225Config } from './EpsChartConfig';
import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const EpsChart = ({ code, indices }) => {
  const idStr = `${code}-highcharts`;
  //const [currentConfig, setCurrentConfig] = useState();
  //const [entireConfig, setEntireConfig] = useState();

  useEffect(() => {
    getData(code).then((data) => {
      const labels = data.x_label;
      const pointsN225 = data.data_n225.map(dataToPoint(labels));
      const pointsN225R = data.data_n225_r.map(dataToPoint(labels));
      const prices = data.data_close.map(dataToPoint(labels));
      const config = n225Config(pointsN225, pointsN225R, prices, labels);

      Highcharts.chart(idStr, config);
    });
  });

  return <div id={idStr} css={style} />;
};

async function getData(code) {
  const url = `/eps_estimates/${code}/chart`;
  const response = await axios.get(url);
  return response.data;
}

function dataToPoint(labels) {
  return function(point, i) {
    return {
      x: dayjs(`${labels[i]}T00:00Z`)
        .toDate()
        .getTime(),
      y: point,
      key: i,
    };
  }
}

const style = css`
  width: 100%;
  height: 100%;
  font-size: 14px;
  line-height: 1.2em;
`;

export default EpsChart;
