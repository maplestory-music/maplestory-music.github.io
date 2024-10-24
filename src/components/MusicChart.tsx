/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTheme } from '../context/ThemeContext';

interface IMusicChartProps {
  styles?: SerializedStyles;
  options: Highcharts.Options;
  chartComponent: React.RefObject<HighchartsReact.RefObject>;
}

export const MusicChart: React.FC<IMusicChartProps> = (props) => {
  const appTheme = useTheme();
  const [classTheme, setClassTheme] = useState('');

  useEffect(() => {
    const themeClass = appTheme.darkMode
      ? 'highcharts-dark'
      : 'highcharts-light';
    setClassTheme(themeClass);
  }, [appTheme]);

  return (
    <div
      css={[
        css`
          display: inline-block;
          margin: 10px;
          @media (max-width: 1024px) {
            width: 100%;
          }
        `,
        props.styles,
      ]}
    >
      <HighchartsReact
        containerProps={{
          className: `react-highcharts-container ${classTheme}`,
          style: { width: '100%', height: '100%' },
        }}
        highcharts={Highcharts}
        options={props.options}
        ref={props.chartComponent}
      />
    </div>
  );
};
