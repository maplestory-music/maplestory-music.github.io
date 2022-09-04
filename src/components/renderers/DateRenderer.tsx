/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ICellRendererParams } from 'ag-grid-community';
import { differenceInWeeks, isFuture } from 'date-fns';

export type IDateRendererParams = ICellRendererParams &
  IDateRendererLocalParams;
interface IDateRendererLocalParams {
  disableRecentTrack?: boolean;
}

export const DateRenderer: React.FC<IDateRendererParams> = (params) => {
  const date = params.value;
  const now = new Date();
  const isRecentTrack = differenceInWeeks(now, date) < 3 || isFuture(date);

  return (
    <div className={'date-col'}>
      <span
        css={css`
          margin-right: 3px;
        `}
      >
        {params.valueFormatted}
      </span>
      {!params.disableRecentTrack && isRecentTrack && (
        <OverlayTrigger
          delay={{ show: 250, hide: 100 }}
          overlay={<Tooltip id={`tooltip-recent-track`}>Recent Track</Tooltip>}
        >
          <i className="fa fa-star" aria-hidden={true}></i>
        </OverlayTrigger>
      )}
    </div>
  );
};
