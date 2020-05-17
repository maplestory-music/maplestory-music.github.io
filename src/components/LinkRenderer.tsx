/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { ICellRendererParams } from 'ag-grid-community';
import ReactGA from 'react-ga';

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
  };
  return (
    <div>
      {youtube === '' ? (
        <span>{title}</span>
      ) : (
        <span>
          <a
            css={css`
              color: inherit;
              margin-right: 3px;
            `}
            href={`https://youtu.be/${youtube}`}
            rel='noopener noreferrer'
            target='_blank'
            title='View on YouTube'
            onClick={onExternalClick}
          >
            <i className='fa fa-external-link'></i>
          </a>
          <a href='# ' rel='noopener noreferrer' onClick={onEmbeddedClick}>
            {title}
          </a>
        </span>
      )}
    </div>
  );
};

export default LinkRenderer;
