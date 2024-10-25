/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useRef } from 'react';
import { getYear } from 'date-fns';
import { useDataSourceState } from '../../context/DataSourceContext';
import { IMusicRecordGrid } from '../../models/DataModel';
import { MusicChart } from '../MusicChart';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { START_YEAR } from '../utils/ChartUtils';

const YearlyFrequencyChart: React.FC = () => {
  const chartComponent = useRef<HighchartsReact.RefObject>(null);
  const dataSource: IMusicRecordGrid[] = useDataSourceState();
  const totalYears = getYear(Date.now()) - START_YEAR + 1;
  const yearlyFreq = dataSource.reduce((prev: number[], current) => {
    if (current.metadata.year) {
      prev[Number(current.metadata.year) - START_YEAR]++;
    }
    return prev;
  }, new Array(totalYears).fill(0));
  const cumulativeCount = yearlyFreq.reduce((prev: number[], current, idx) => {
    if (idx === 0) {
      prev[0] = current;
    } else {
      prev[idx] = prev[idx - 1] + current;
    }
    return prev;
  }, new Array(totalYears).fill(0));

  const options: Highcharts.Options = {
    chart: {
      type: 'line',
      styledMode: true,
    },
    title: {
      text: 'Song frequency per year',
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: [
      {
        title: {
          text: 'Songs',
        },
        allowDecimals: false,
      },
      {
        title: {
          text: 'Cumulative',
        },
        allowDecimals: false,
        opposite: true,
      },
    ],
    series: [
      {
        name: 'Songs',
        type: 'line',
        yAxis: 0,
        pointStart: Date.UTC(START_YEAR, 0, 1),
        pointIntervalUnit: 'year',
        data: yearlyFreq,
      },
      {
        name: 'Cumulative',
        type: 'line',
        yAxis: 1,
        pointStart: Date.UTC(START_YEAR, 0, 1),
        pointIntervalUnit: 'year',
        data: cumulativeCount,
      },
    ],
  };

  return (
    <MusicChart
      styles={css`
        width: 55vw;
        flex: 2;
      `}
      options={options}
      chartComponent={chartComponent}
    />
  );
};

export default YearlyFrequencyChart;
