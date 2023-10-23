/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useMemo, useRef } from 'react';
import { getMonth } from 'date-fns';
import { useDataSourceState } from '../../context/DataSourceContext';
import { IMusicRecordGrid } from '../../models/DataModel';
import { MusicChart } from '../MusicChart';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { MapleClient } from '../../models/MapleClient';
import { get } from 'lodash-es';
import { useTranslation } from 'react-i18next';

type ClientBucket = { [key in MapleClient]: number[] };
const getEmptyBucket = (): ClientBucket => ({
  KMS: new Array(12).fill(0),
  JMS: new Array(12).fill(0),
  CMS: new Array(12).fill(0),
  TMS: new Array(12).fill(0),
  MSEA: new Array(12).fill(0),
  GMS: new Array(12).fill(0),
  ThMS: new Array(12).fill(0),
  BMS: new Array(12).fill(0),
});
const allClients = ['KMS', 'JMS', 'CMS', 'TMS', 'MSEA', 'GMS', 'ThMS', 'BMS'];

function getClient(clientSource: string) {
  if (!clientSource) return 'None';
  for (const c of allClients) {
    if (clientSource.includes(c)) {
      return c;
    }
  }
  return 'None';
}

function getMonthsForLocale(locale = 'en-US') {
  const format = new Intl.DateTimeFormat(locale, { month: 'long' }).format;
  return [...Array(12).keys()].map((m) =>
    format(new Date(Date.UTC(2003, (m + 1) % 12)))
  );
}

const MonthlyFrequencyStackedChart: React.FC = () => {
  const { i18n } = useTranslation();
  const chartComponent = useRef<HighchartsReact.RefObject>(null);
  const dataSource: IMusicRecordGrid[] = useDataSourceState();
  const monthlyFreq = useMemo(() => {
    return dataSource.reduce((bkt: ClientBucket, current) => {
      const currentClient = getClient(current.source.client);
      const currentMonth = getMonth(current.source.date ?? 0);
      const currentVersionArr = get(bkt, currentClient);
      if (currentVersionArr) {
        currentVersionArr[currentMonth] += 1;
      }
      return bkt;
    }, getEmptyBucket());
  }, [dataSource]);

  const options: Highcharts.Options = {
    chart: {
      type: 'area',
    },
    title: {
      text: 'Song frequency per month (all years)',
    },
    xAxis: {
      categories: getMonthsForLocale(i18n.language),
    },
    yAxis: [
      {
        title: {
          text: 'Songs',
        },
        allowDecimals: false,
      },
    ],
    tooltip: {
      shared: true,
    },
    plotOptions: {
      area: {
        stacking: 'normal',
      },
    },
    series: allClients.map((client) => ({
      name: client,
      type: 'area',
      yAxis: 0,
      visible:
        client === MapleClient.Korea ||
        client === MapleClient.Japan ||
        client === MapleClient.China,
      data: get(monthlyFreq, client),
    })),
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

export default MonthlyFrequencyStackedChart;
