/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { padStart } from 'lodash-es';
import { ButtonGroup, Button } from 'react-bootstrap';
import { IPlayingState } from '../models/Player';
import { selectedPlaylistAtom } from '../state/playlist';
import { useAtom, useAtomValue } from 'jotai';
import { useEvent } from 'react-use';
import { isPlayingAtom } from '../state/player';

interface IMusicPlayerProps {
  playingState: IPlayingState;
  setCurrentQueueSong: (num: number) => void;
}

export const MusicPlayer: React.FC<IMusicPlayerProps> = (props) => {
  const player = useRef<ReactPlayer>(null);
  const { playingState, setCurrentQueueSong } = props;
  const selectedPlaylist = useAtomValue(selectedPlaylistAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);

  useEffect(() => {
    localStorage.setItem('playingState', JSON.stringify(playingState));
  }, [playingState]);

  useEvent('pausevideo', () => {
    setIsPlaying(false);
  });

  const onPreviousQueueSong: () => void = () => {
    if (playingState.currentQueueSong < 1) return;
    setCurrentQueueSong(playingState.currentQueueSong - 1);
  };

  const onNextQueueSong: () => void = () => {
    if (playingState.currentQueueSong === playingState.currentQueue.length - 1)
      return;
    setCurrentQueueSong(playingState.currentQueueSong + 1);
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
        playing={isPlaying}
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={(): void => {
          if (player.current !== null) {
            if (!playingState.currentQueue.length) {
              player.current.seekTo(0);
              gtag('event', 'ce_loop_embedded_video', {
                ce_category: 'video',
                ce_youtube: playingState.currentSong,
              });
            } else {
              gtag('event', 'ce_complete_queue_video', {
                ce_category: 'video',
                ce_youtube: playingState.currentSong,
                ce_playlist_name: selectedPlaylist,
              });
              let newVal;
              if (
                playingState.currentQueueSong ===
                playingState.currentQueue.length - 1
              ) {
                if (playingState.repeatQueue) {
                  newVal = 0;
                } else {
                  return;
                }
              } else {
                newVal = playingState.currentQueueSong + 1;
              }
              setCurrentQueueSong(newVal);
            }
          }
        }}
      />
      {playingState.currentQueue.length > 0 && (
        <div
          className="text-center"
          css={css`
            margin-top: 5px;
          `}
        >
          <ButtonGroup size="sm">
            <Button
              variant="outline-primary"
              onClick={onPreviousQueueSong}
              disabled={playingState.currentQueueSong === 0}
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
              (playingState.currentQueueSong + 1).toString(),
              playingState.currentQueue.length.toString().length,
              '0'
            )} | ${playingState.currentQueue.length}`}</span>
            <Button
              variant="outline-primary"
              onClick={onNextQueueSong}
              disabled={
                playingState.currentQueueSong + 1 ===
                playingState.currentQueue.length
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
