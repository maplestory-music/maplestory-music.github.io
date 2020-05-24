/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { ICellRendererParams } from 'ag-grid-community';
import ReactGA from 'react-ga';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface ILinkRenderer extends ICellRendererParams {
  title: string;
  youtube: string;
  onSongChange: (song: string) => void;
}

const LinkRenderer: React.FC<ILinkRenderer> = ({
  title,
  youtube,
  onSongChange,
}) => {
  const onEmbeddedClick: (e: React.MouseEvent) => void = (e) => {
    ReactGA.event({
      category: 'Video',
      action: 'View embedded video',
      label: youtube,
    });
    onSongChange(`https://youtu.be/${youtube}`);
    e.preventDefault();
  };
  const onExternalClick: (e: React.MouseEvent) => void = (e) => {
    ReactGA.event({
      category: 'Video',
      action: 'View external video',
      label: youtube,
    });
    // Handle tooltip defocus
    const activeElement = document.activeElement as HTMLElement;
    activeElement.blur();
  };
  return (
    <div>
      {youtube === '' ? (
        <span>{title}</span>
      ) : (
        <span>
          <OverlayTrigger
            placement={'top'}
            delay={{ show: 250, hide: 100 }}
            overlay={
              <Tooltip id={`tooltip-external-link`}>View on YouTube</Tooltip>
            }
          >
            <a
              css={css`
                color: inherit;
                margin-right: 3px;
              `}
              href={`https://youtu.be/${youtube}`}
              rel='noopener noreferrer'
              target='_blank'
              onClick={onExternalClick}
            >
              <i className='fa fa-external-link'></i>
            </a>
          </OverlayTrigger>
          <a href='# ' rel='noopener noreferrer' onClick={onEmbeddedClick}>
            {title}
          </a>
        </span>
      )}
    </div>
  );
};

export default LinkRenderer;
