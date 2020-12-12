/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface IMusicChartProps {
  styles?: SerializedStyles;
  options: Highcharts.Options;
}

export const MusicChart: React.FC<IMusicChartProps> = (props) => {
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
      />
    </div>
  );
};
