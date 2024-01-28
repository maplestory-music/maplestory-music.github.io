/** @jsxImportSource @emotion/react */
import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { css } from '@emotion/react';
import { getKey } from '../utils/PlaylistUtils';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export const TrackIdRenderer: React.FC<ICellRendererParams> = (params) => {
  const { data } = params;

  return (
    <span
      css={css`
        display: flex;
        justify-content: center;
      `}
    >
      <div
        onClick={() => {
          navigator.clipboard.writeText(
            `"${getKey(data.source.structure, data.filename)}",\n`
          );
        }}
      >
        <OverlayTrigger
          delay={{ show: 250, hide: 100 }}
          overlay={
            <Tooltip id={`tooltip-copy-track-id`}>Copy Track ID</Tooltip>
          }
        >
          <i
            css={css`
              cursor: pointer;
            `}
            className={'fa-regular fa-copy'}
          />
        </OverlayTrigger>
      </div>
    </span>
  );
};
