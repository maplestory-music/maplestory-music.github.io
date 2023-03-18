/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useRef } from 'react';
import ReactPlayer from 'react-player';
import ReactGA from 'react-ga';
import { padStart } from 'lodash-es';
import { ButtonGroup, Button } from 'react-bootstrap';
import { IPlayingState } from '../pages/HomePage';

interface IMusicPlayerProps {
  playingState: IPlayingState;
  setCurrentPlaylistSong: (num: number) => void;
}

export const MusicPlayer: React.FC<IMusicPlayerProps> = (props) => {
  const player = useRef<ReactPlayer>(null);
  const { playingState, setCurrentPlaylistSong } = props;

  const onPreviousPlaylistSong: () => void = () => {
    if (playingState.currentPlaylistSong < 1) return;
    setCurrentPlaylistSong(playingState.currentPlaylistSong - 1);
  };

  const onNextPlaylistSong: () => void = () => {
    if (
      playingState.currentPlaylistSong ===
      playingState.currentPlaylist.length - 1
    )
      return;
    setCurrentPlaylistSong(playingState.currentPlaylistSong + 1);
  };

  return (
    <div>
      <ReactPlayer
        css={css`
          display: block;
          margin-left: auto;
          margin-right: auto;
          max-width: 100vw;
        `}
        ref={player}
        url={`https://youtu.be/${playingState.currentSong}`}
        playing
        controls
        onEnded={(): void => {
          if (player.current !== null) {
            if (!playingState.currentPlaylist.length) {
              player.current.seekTo(0);
              ReactGA.event({
                category: 'Video',
                action: 'Loop Embedded Video',
                label: playingState.currentSong,
              });
            } else {
              ReactGA.event({
                category: 'Video',
                action: 'Complete Playlist Video',
                label: playingState.currentSong,
              });
              let newVal;
              if (
                playingState.currentPlaylistSong ===
                playingState.currentPlaylist.length - 1
              ) {
                if (playingState.repeatPlaylist) {
                  newVal = 0;
                } else {
                  return;
                }
              } else {
                newVal = playingState.currentPlaylistSong + 1;
              }
              setCurrentPlaylistSong(newVal);
            }
          }
        }}
      />
      {playingState.currentPlaylist.length > 0 && (
        <div
          className="text-center"
          css={css`
            margin-top: 5px;
          `}
        >
          <ButtonGroup size="sm">
            <Button
              variant="outline-primary"
              onClick={onPreviousPlaylistSong}
              disabled={playingState.currentPlaylistSong === 0}
            >
              <i className="fa fa-step-backward"></i>
            </Button>
            <span
              css={css`
                background-color: #343a40;
                border-color: #343a40;
                color: white;
                padding: 0.25rem 0.5rem;
                font-size: 0.875rem;
                line-height: 1.5;
                border: 1px solid transparent;
                margin-left: -1px;
              `}
            >{`${padStart(
              (playingState.currentPlaylistSong + 1).toString(),
              playingState.currentPlaylist.length.toString().length,
              '0'
            )} | ${playingState.currentPlaylist.length}`}</span>
            <Button
              variant="outline-primary"
              onClick={onNextPlaylistSong}
              disabled={
                playingState.currentPlaylistSong + 1 ===
                playingState.currentPlaylist.length
              }
            >
              <i className="fa fa-step-forward"></i>
            </Button>
          </ButtonGroup>
        </div>
      )}
    </div>
  );
};
