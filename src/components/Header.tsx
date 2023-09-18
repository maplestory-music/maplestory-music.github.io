/** @jsxImportSource @emotion/react */
import { Fragment } from 'react';
import { css } from '@emotion/react';

interface IHeader {
  noText?: boolean;
}

export const Header: React.FC<IHeader> = ({ noText }) => {
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
      {noText ? null : (
        <div>
          <p>
            Welcome to the MapleStory Music database. This site provides a
            complete listing of the background music (BGM) used in MapleStory.
            Collectively, the songs are also known as MapleStory's original
            soundtrack (OST).
          </p>
        </div>
      )}
    </Fragment>
  );
};
