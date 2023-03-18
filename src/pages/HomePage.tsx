/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useCallback } from 'react';
import { css } from '@emotion/react';
import {
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
  Dropdown,
} from 'react-bootstrap';
import { shuffle } from 'lodash-es';
import ReactGA from 'react-ga';
import MusicGrid from '../components/MusicGrid';
import { IMusicRecordGrid } from '../models/DataModel';
import { MusicPlayer } from '../components/MusicPlayer';
import { Header } from '../components/Header';
import { PlaylistActionButton } from '../components/PlaylistActionButton';

export interface IPlayingState {
  currentSong: string | undefined;
  currentPlaylist: IMusicRecordGrid[];
  currentPlaylistSong: number;
  repeatPlaylist: boolean;
}

export interface ILocateSong {
  songId: string | undefined;
}

const HomePage: React.FC = () => {
  const [filterText, setFilterText] = useState<string>();
  const [gridFiltered, setGridFiltered] = useState<boolean>(false);
  const [playlistRepeat, setPlaylistRepeat] = useState<boolean>(false);
  const [playingState, setPlayingState] = useState<IPlayingState>({
    currentSong: undefined,
    currentPlaylist: [],
    currentPlaylistSong: -1,
    repeatPlaylist: false,
  });
  const appPlaylistPool = useRef<IMusicRecordGrid[]>([]);
  const [locateSong, setLocateSong] = useState<ILocateSong | undefined>();

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

  const onGridSongChange: (song: string) => void = (song) => {
    setPlayingState({
      currentSong: song,
      currentPlaylist: [],
      currentPlaylistSong: -1,
      repeatPlaylist: playlistRepeat,
    });
  };

  const setPlaylistPool: (
    isGridFiltered: boolean,
    playlistPool: IMusicRecordGrid[]
  ) => void = useCallback((isGridFiltered, playlistPool) => {
    setGridFiltered(isGridFiltered);
    appPlaylistPool.current = playlistPool;
  }, []);

  const onShufflePlaylist: () => void = () => {
    const shuffledSongs = shuffle(
      appPlaylistPool.current.filter((song) => song.youtube !== '')
    );
    if (!shuffledSongs.length) return;
    setPlayingState({
      currentSong: shuffledSongs[0].youtube,
      currentPlaylist: shuffledSongs,
      currentPlaylistSong: 0,
      repeatPlaylist: playlistRepeat,
    });
    ReactGA.event({
      category: 'Playlist',
      action: gridFiltered
        ? 'Start Shuffled Playlist (Filtered)'
        : 'Start Shuffled Playlist',
      label: 'Shuffle Button',
    });
  };

  const onStartPlaylist = () => {
    const playlistSongs = appPlaylistPool.current.filter(
      (song) => song.youtube !== ''
    );
    if (!playlistSongs.length) return;
    setPlayingState({
      currentSong: playlistSongs[0].youtube,
      currentPlaylist: playlistSongs,
      currentPlaylistSong: 0,
      repeatPlaylist: playlistRepeat,
    });
    ReactGA.event({
      category: 'Playlist',
      action: gridFiltered ? 'Start Playlist (Filtered)' : 'Start Playlist',
      label: 'Play Button',
    });
  };

  const setCurrentPlaylistSong: (newVal: number) => void = (newVal) => {
    setPlayingState((state) => {
      return {
        ...state,
        currentSong: state.currentPlaylist[newVal].youtube,
        currentPlaylistSong: newVal,
      };
    });
  };

  return (
    <div>
      {playingState.currentSong === undefined ? (
        <Header />
      ) : (
        <MusicPlayer
          playingState={playingState}
          setCurrentPlaylistSong={setCurrentPlaylistSong}
        />
      )}
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
      <MusicGrid
        query={filterText}
        onGridSongChange={onGridSongChange}
        setPlaylistPool={setPlaylistPool}
        locateSong={locateSong}
      />
    </div>
  );
};

export default HomePage;
