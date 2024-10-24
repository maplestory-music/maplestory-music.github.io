/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useRef } from 'react';
import { getMonth, getYear } from 'date-fns';
import { useDataSourceState } from '../../context/DataSourceContext';
import { IMusicRecordGrid } from '../../models/DataModel';
import { MusicChart } from '../MusicChart';
import { ICommonChartProps } from './CommonChartProps';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const removeFutureDates = (values: number[], selectedYear: number) => {
  const now = Date.now();
  const currentMonth = getMonth(now) + 1;
  return selectedYear === getYear(now)
    ? values.slice(0, currentMonth === 1 ? currentMonth + 1 : currentMonth)
    : values;
};

const MonthlyFrequencyChart: React.FC<ICommonChartProps> = (props) => {
  const chartComponent = useRef<HighchartsReact.RefObject>(null);
  const dataSource: IMusicRecordGrid[] = useDataSourceState();
  const selectedYear = props.selectedYear;
  const monthlyFreq = dataSource.reduce((prev: number[], current) => {
    if (
      current.metadata.year === selectedYear.toString() &&
      current.source.date
    ) {
      prev[getMonth(current.source.date)]++;
    }
    return prev;
  }, new Array(12).fill(0));
  const cumulativeCount = monthlyFreq.reduce((prev: number[], current, idx) => {
    if (idx === 0) {
      prev[0] = current;
    } else {
      prev[idx] = prev[idx - 1] + current;
    }
    return prev;
  }, new Array(12).fill(0));

  const options: Highcharts.Options = {
    chart: {
      type: 'line',
      styledMode: true,
    },
    title: {
      text: 'Song frequency per month',
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
        pointStart: Date.UTC(selectedYear, 0, 1),
        pointIntervalUnit: 'month',
        data: removeFutureDates(monthlyFreq, selectedYear),
      },
      {
        name: 'Cumulative',
        type: 'line',
        yAxis: 1,
        pointStart: Date.UTC(selectedYear, 0, 1),
        pointIntervalUnit: 'month',
        data: removeFutureDates(cumulativeCount, selectedYear),
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

export default MonthlyFrequencyChart;
