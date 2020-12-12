/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useDataSourceState } from '../../context/DataSourceContext';
import { IMusicRecordGrid } from '../../models/DataModel';
import Highcharts from 'highcharts';
import { complement } from 'polished';
import { ICommonChartProps } from './CommonChartProps';
import { cornFlowerBlue } from '../../constants';
import { MapleClient } from '../../models/MapleClient';
import { MusicChart } from '../MusicChart';

const RegionalDistributionChart: React.FC<ICommonChartProps> = (props) => {
  const dataSource: IMusicRecordGrid[] = useDataSourceState();
  const selectedYear = props.selectedYear;
  const songsInYear = dataSource.filter(
    (song) => song.source.date?.getFullYear() === selectedYear
  );
  const yearlyKorea = songsInYear.filter((song) =>
    song.source.client?.includes(MapleClient.Korea)
  ).length;
  const yearlyOverseas = songsInYear.length - yearlyKorea;

  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Distribution of song region',
    },
    series: [
      {
        name: 'Songs',
        type: 'pie',
        data: [
          { name: 'Korea', color: cornFlowerBlue, y: yearlyKorea },
          {
            name: 'Overseas',
            color: complement(cornFlowerBlue),
            y: yearlyOverseas,
          },
        ],
      },
    ],
  };

  return (
    <MusicChart
      styles={css`
        width: 35%;
      `}
      options={options}
    />
  );
};

export default RegionalDistributionChart;
