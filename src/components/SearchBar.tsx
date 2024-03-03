/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import {
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
  Dropdown,
} from 'react-bootstrap';
import { QueueActionButton } from './QueueActionButton';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  appQueuePoolAtom,
  filterTextAtom,
  gridFilteredAtom,
  isPlayingAtom,
  locateSongAtom,
  playingStateAtom,
  queueRepeatAtom,
} from '../state/player';
import { shuffle } from 'lodash-es';
import { selectedPlaylistAtom } from '../state/playlist';
import { IPlayingState } from '../models/Player';

const SearchBar: React.FC = () => {
  const setFilterText = useSetAtom(filterTextAtom);
  const setLocateSong = useSetAtom(locateSongAtom);
  const [queueRepeat, setQueueRepeat] = useAtom(queueRepeatAtom);
  const [playingState, setPlayingState] = useAtom(playingStateAtom);
  const appQueuePool = useAtomValue(appQueuePoolAtom);
  const gridFiltered = useAtomValue(gridFilteredAtom);
  const selectedPlaylist = useAtomValue(selectedPlaylistAtom);
  const setIsPlaying = useSetAtom(isPlayingAtom);

  const onFilterTextChanged: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event) => {
    setFilterText(event.target.value);
  };

  // Handle mobile quick filter submission
  const onFilterTextKeyPress: (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void = (event) => {
    if (event.key === 'Enter' && document.activeElement) {
      const activeElement = document.activeElement as HTMLElement;
      activeElement.blur();
    }
  };

  const onStartQueue = () => {
    const queueSongs = appQueuePool.filter((song) => song.youtube !== '');
    if (!queueSongs.length) return;
    setIsPlaying(true);
    setPlayingState({
      currentSong: queueSongs[0].youtube,
      currentQueue: queueSongs,
      currentQueueSong: 0,
      repeatQueue: queueRepeat,
    });
    gtag('event', 'ce_start_queue', {
      ce_category: 'queue',
      ce_source: 'play_button',
      ce_filtered: gridFiltered,
      ce_playlist_name: selectedPlaylist,
    });
  };

  const onShuffleQueue: () => void = () => {
    const shuffledSongs = shuffle(
      appQueuePool.filter((song) => song.youtube !== '')
    );
    if (!shuffledSongs.length) return;
    setIsPlaying(true);
    setPlayingState({
      currentSong: shuffledSongs[0].youtube,
      currentQueue: shuffledSongs,
      currentQueueSong: 0,
      repeatQueue: queueRepeat,
    });
    gtag('event', 'ce_start_shuffled_queue', {
      ce_category: 'queue',
      ce_source: 'shuffle_button',
      ce_filtered: gridFiltered,
      ce_playlist_name: selectedPlaylist,
    });
  };

  const onRepeatQueue: () => void = () => {
    const newQueueRepeatVal = !queueRepeat;
    setQueueRepeat(newQueueRepeatVal);
    setIsPlaying(true);
    setPlayingState(
      (state): IPlayingState => {
        return {
          ...state,
          repeatQueue: newQueueRepeatVal,
        };
      }
    );
  };

  return (
    <Form.Group
      css={css`
        margin: 10px 14vw;
      `}
      className="filter-text"
    >
      <InputGroup size="lg">
        <OverlayTrigger
          delay={{ show: 250, hide: 100 }}
          overlay={
            <Tooltip id={`tooltip-locate-song`}>Locate Current Song</Tooltip>
          }
        >
          <InputGroup.Text
            css={css`
              cursor: pointer;
            `}
            onClick={() => {
              setLocateSong({ songId: playingState.currentSong });
            }}
          >
            <i className="fa fa-search"></i>
          </InputGroup.Text>
        </OverlayTrigger>
        <Form.Control
          type="search"
          placeholder="Song title or keyword"
          onChange={onFilterTextChanged}
          onKeyPress={onFilterTextKeyPress}
        />
        <Dropdown>
          <OverlayTrigger
            delay={{ show: 250, hide: 100 }}
            overlay={
              <Tooltip id={`tooltip-queue-actions`}>
                {gridFiltered ? 'Queue Actions (Filtered)' : 'Queue Actions'}
              </Tooltip>
            }
          >
            <Dropdown.Toggle
              variant={gridFiltered ? 'outline-warning' : 'outline-success'}
              id="dropdown-queue-actions"
            >
              <i className="fa fa-play"></i>
            </Dropdown.Toggle>
          </OverlayTrigger>
          <Dropdown.Menu>
            <QueueActionButton
              actionName="Start Queue"
              iconClass="fa fa-play"
              onClick={onStartQueue}
            />
            <QueueActionButton
              actionName="Start Shuffled Queue"
              iconClass="fa fa-random"
              onClick={onShuffleQueue}
            />
            <Dropdown.Divider />
            <QueueActionButton
              actionName={
                queueRepeat ? 'Turn Off Queue Repeat' : 'Turn On Queue Repeat'
              }
              iconClass="fa fa-repeat"
              onClick={onRepeatQueue}
              active={queueRepeat}
            />
          </Dropdown.Menu>
        </Dropdown>
      </InputGroup>
    </Form.Group>
  );
};

export default SearchBar;
