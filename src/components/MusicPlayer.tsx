/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { ButtonGroup, Button, FormControl } from 'react-bootstrap';
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
  const [inputValue, setInputValue] = useState(
    playingState.currentQueueSong + 1
  );

  useEffect(() => {
    setInputValue(playingState.currentQueueSong + 1);
  }, [playingState.currentQueueSong]);

  useEvent('pausevideo', () => {
    setIsPlaying(false);
  });

  const onPreviousQueueSong = () => {
    if (playingState.currentQueueSong < 1) return;
    setCurrentQueueSong(playingState.currentQueueSong - 1);
  };

  const onNextQueueSong = () => {
    if (playingState.currentQueueSong === playingState.currentQueue.length - 1)
      return;
    setCurrentQueueSong(playingState.currentQueueSong + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = parseInt(e.target.value, 10);
    if (isNaN(userInput)) {
      return;
    }
    const newInputValue = Math.max(
      1,
      Math.min(userInput, playingState.currentQueue.length)
    );
    setInputValue(newInputValue);
  };

  const handleInputBlur = () => {
    setCurrentQueueSong(inputValue - 1);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      (e.target as HTMLInputElement).blur();
    }
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
            <div
              css={css`
                display: inline-flex;
                align-items: center;
                padding: 0.25rem 0.5rem;
                background-color: #343a40;
                color: white;
                font-size: 0.875rem;
              `}
            >
              <FormControl
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
                css={css`
                  height: 100%;
                  width: 6ch;
                  padding: 0.25rem;
                  background-color: inherit;
                  color: inherit;
                  font-size: 0.875rem;
                  text-align: center;
                `}
              />
              <span
                css={css`
                  margin-left: 5px;
                `}
              >
                / {playingState.currentQueue.length}
              </span>
            </div>
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
