/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useRef } from 'react';
import { useDataSourceState } from '../../context/DataSourceContext';
import { IMusicRecordGrid } from '../../models/DataModel';
import Highcharts, { DataLabelsOptions } from 'highcharts';
import { complement } from 'polished';
import { ICommonChartProps } from './CommonChartProps';
import { cornFlowerBlue } from '../../constants';
import { MapleClient } from '../../models/MapleClient';
import { MusicChart } from '../MusicChart';
import HighchartsReact from 'highcharts-react-official';

const RegionalDistributionChart: React.FC<ICommonChartProps> = (props) => {
  const chartComponent = useRef<HighchartsReact.RefObject>(null);
  const dataSource: IMusicRecordGrid[] = useDataSourceState();
  const selectedYear = props.selectedYear;
  const songsInYear = dataSource.filter(
    (song) =>
      song.source.date?.getFullYear() === selectedYear && song.source.client
  );
  const getYearlyRegionalCount = (region: MapleClient): number => {
    return songsInYear.filter((song) => song.source.client?.includes(region))
      .length;
  };
  const yearlyKorea = getYearlyRegionalCount(MapleClient.Korea);
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
        id: 'domesticVsOverseas',
        name: 'Total Songs',
        type: 'pie',
        data: [
          { name: 'Domestic', color: cornFlowerBlue, y: yearlyKorea },
          {
            name: 'Overseas',
            color: complement(cornFlowerBlue),
            y: yearlyOverseas,
          },
        ],
        size: '70%',
        dataLabels: {
          enabled: false,
        },
      },
      {
        id: 'regional',
        name: 'Songs',
        type: 'pie',
        data: [
          {
            name: 'Korea',
            color: cornFlowerBlue,
            y: yearlyKorea,
          },
          { name: 'Japan', y: getYearlyRegionalCount(MapleClient.Japan) },
          { name: 'China', y: getYearlyRegionalCount(MapleClient.China) },
          { name: 'Taiwan', y: getYearlyRegionalCount(MapleClient.Taiwan) },
          { name: 'Thailand', y: getYearlyRegionalCount(MapleClient.Thailand) },
          { name: 'SEA', y: getYearlyRegionalCount(MapleClient.SEA) },
          { name: 'Global', y: getYearlyRegionalCount(MapleClient.Global) },
          { name: 'Brazil', y: getYearlyRegionalCount(MapleClient.Brazil) },
        ],
        size: '100%',
        innerSize: '70%',
        dataLabels: {
          formatter: function (options: DataLabelsOptions): string | undefined {
            if (!this.y) return undefined;
            return this.key;
          },
        },
      },
    ],
  };

  return (
    <MusicChart
      styles={css`
        width: 35vw;
        flex: 1;
      `}
      options={options}
      chartComponent={chartComponent}
    />
  );
};

export default RegionalDistributionChart;
