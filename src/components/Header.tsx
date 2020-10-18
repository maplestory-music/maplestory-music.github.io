/** @jsx jsx */
import { Fragment } from 'react';
import { css, jsx } from '@emotion/core';

export const Header: React.FC = () => {
  return (
    <Fragment>
      <div>
        <img
          css={css`
            display: block;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 10px;
          `}
          id="header-logo"
          src="assets/pink-bean.png"
          alt="header logo"
        />
      </div>
      <div>
        <p>
          Welcome to the MapleStory Music database. This site provides a
          complete listing of the background music (BGM) used in MapleStory.
          Collectively, the songs are also known as MapleStory's original
          soundtrack (OST).
        </p>
      </div>
    </Fragment>
  );
};
