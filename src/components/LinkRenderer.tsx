/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { ICellRendererParams } from 'ag-grid-community';

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
  const onClick: (evt: React.MouseEvent) => void = (evt) => {
    onSongChange(`https://youtu.be/${youtube}`);
    evt.preventDefault();
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
          >
            <i className='fa fa-external-link'></i>
          </a>
          <a href='# ' rel='noopener noreferrer' onClick={onClick}>
            {title}
          </a>
        </span>
      )}
    </div>
  );
};

export default LinkRenderer;
