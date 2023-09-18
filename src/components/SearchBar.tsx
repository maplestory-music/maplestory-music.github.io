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
import { PlaylistActionButton } from '../components/PlaylistActionButton';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  appPlaylistPoolAtom,
  filterTextAtom,
  gridFilteredAtom,
  locateSongAtom,
  playingStateAtom,
  playlistRepeatAtom,
} from '../state/player';
import { shuffle } from 'lodash-es';
import { selectedPlaylistAtom } from '../state/playlist';

const SearchBar: React.FC = () => {
  const setFilterText = useSetAtom(filterTextAtom);
  const setLocateSong = useSetAtom(locateSongAtom);
  const [playlistRepeat, setPlaylistRepeat] = useAtom(playlistRepeatAtom);
  const [playingState, setPlayingState] = useAtom(playingStateAtom);
  const appPlaylistPool = useAtomValue(appPlaylistPoolAtom);
  const gridFiltered = useAtomValue(gridFilteredAtom);
  const selectedPlaylist = useAtomValue(selectedPlaylistAtom);

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

  const onStartPlaylist = () => {
    const playlistSongs = appPlaylistPool.filter((song) => song.youtube !== '');
    if (!playlistSongs.length) return;
    setPlayingState({
      currentSong: playlistSongs[0].youtube,
      currentPlaylist: playlistSongs,
      currentPlaylistSong: 0,
      repeatPlaylist: playlistRepeat,
    });
    gtag('event', 'ce_start_playlist', {
      ce_category: 'playlist',
      ce_source: 'play_button',
      ce_filtered: gridFiltered,
      ce_playlist_name: selectedPlaylist,
    });
  };

  const onShufflePlaylist: () => void = () => {
    const shuffledSongs = shuffle(
      appPlaylistPool.filter((song) => song.youtube !== '')
    );
    if (!shuffledSongs.length) return;
    setPlayingState({
      currentSong: shuffledSongs[0].youtube,
      currentPlaylist: shuffledSongs,
      currentPlaylistSong: 0,
      repeatPlaylist: playlistRepeat,
    });
    gtag('event', 'ce_start_shuffled_playlist', {
      ce_category: 'playlist',
      ce_source: 'shuffle_button',
      ce_filtered: gridFiltered,
      ce_playlist_name: selectedPlaylist,
    });
  };

  const onRepeatPlaylist: () => void = () => {
    const newPlaylistRepeatVal = !playlistRepeat;
    setPlaylistRepeat(newPlaylistRepeatVal);
    setPlayingState((state) => {
      return {
        ...state,
        repeatPlaylist: newPlaylistRepeatVal,
      };
    });
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
              <Tooltip id={`tooltip-playlist-actions`}>
                {gridFiltered
                  ? 'Playlist Actions (Filtered)'
                  : 'Playlist Actions'}
              </Tooltip>
            }
          >
            <Dropdown.Toggle
              variant={gridFiltered ? 'outline-warning' : 'outline-success'}
              id="dropdown-playlist-actions"
            >
              <i className="fa fa-play"></i>
            </Dropdown.Toggle>
          </OverlayTrigger>
          <Dropdown.Menu>
            <PlaylistActionButton
              actionName="Start Playlist"
              iconClass="fa fa-play"
              onClick={onStartPlaylist}
            />
            <PlaylistActionButton
              actionName="Start Shuffled Playlist"
              iconClass="fa fa-random"
              onClick={onShufflePlaylist}
            />
            <Dropdown.Divider />
            <PlaylistActionButton
              actionName={
                playlistRepeat
                  ? 'Turn Off Playlist Repeat'
                  : 'Turn On Playlist Repeat'
              }
              iconClass="fa fa-repeat"
              onClick={onRepeatPlaylist}
              active={playlistRepeat}
            />
          </Dropdown.Menu>
        </Dropdown>
      </InputGroup>
    </Form.Group>
  );
};

export default SearchBar;
