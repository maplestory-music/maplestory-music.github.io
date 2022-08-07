/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ICellRendererParams } from 'ag-grid-community';
import ReactGA from 'react-ga';

export interface ILinkRendererParams {
  title: string;
  youtube: string;
  onGridSongChange: (song: string) => void;
}
type ILinkRenderer = ILinkRendererParams & ICellRendererParams;

export const LinkRenderer: React.FC<ILinkRenderer> = (params) => {
  const { youtube, title } = params;
  const hasLink = youtube !== '';

  const onEmbeddedClick: (e: React.MouseEvent<HTMLAnchorElement>) => void = (
    e
  ) => {
    ReactGA.event({
      category: 'Video',
      action: 'View Embedded Video',
      label: params.youtube,
    });
    params.onGridSongChange(params.youtube);
    e.preventDefault();
  };
  const onExternalClick: () => void = () => {
    ReactGA.event({
      category: 'Video',
      action: 'View External Video',
      label: params.youtube,
    });
  };

  return hasLink ? (
    <span>
      <OverlayTrigger
        delay={{ show: 250, hide: 100 }}
        overlay={<Tooltip id={`tooltip-ext-link`}>View on YouTube</Tooltip>}
      >
        <a
          css={css`
            margin-right: 3px;
          `}
          className="bgm-external-link-icon"
          href={`https://youtu.be/${youtube}`}
          rel={'noopener noreferrer'}
          target={'_blank'}
          onClick={onExternalClick}
        >
          <i className={'fa fa-external-link'}></i>
        </a>
      </OverlayTrigger>

      <a href={'# '} rel={'noopener noreferrer'} onClick={onEmbeddedClick}>
        {title}
      </a>
    </span>
  ) : (
    <span>{title}</span>
  );
};
