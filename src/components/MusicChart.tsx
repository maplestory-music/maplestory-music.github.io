/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTheme } from '../context/ThemeContext';
import { themeGlobalDark, themeGlobalLight } from './charts/ChartTheme';

interface IMusicChartProps {
  styles?: SerializedStyles;
  options: Highcharts.Options;
  chartComponent: React.RefObject<HighchartsReact.RefObject>;
}

export const MusicChart: React.FC<IMusicChartProps> = (props) => {
  const appTheme = useTheme();

  useEffect(() => {
    const themeConfig = appTheme.darkMode ? themeGlobalDark : themeGlobalLight;
    const newOptions = {
      ...props.options,
      ...themeConfig,
    };
    props.chartComponent.current?.chart?.update(newOptions);
  }, [props.chartComponent, props.options, appTheme]);

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
          className: 'react-highcharts-container',
          style: { width: '100%', height: '100%' },
        }}
        highcharts={Highcharts}
        options={props.options}
        ref={props.chartComponent}
      />
    </div>
  );
};
