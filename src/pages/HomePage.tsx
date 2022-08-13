/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useCallback } from 'react';
import { css } from '@emotion/react';
import {
  Form,
  InputGroup,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { shuffle } from 'lodash-es';
import ReactGA from 'react-ga';
import MusicGrid from '../components/MusicGrid';
import { IMusicRecordGrid } from '../models/DataModel';
import { MusicPlayer } from '../components/MusicPlayer';
import { Header } from '../components/Header';

export interface IPlayingState {
  currentSong: string | undefined;
  shufflePlaylist: IMusicRecordGrid[];
  currentPlaylistSong: number;
}

export interface ILocateSong {
  songId: string | undefined;
}

const HomePage: React.FC = () => {
  const [filterText, setFilterText] = useState<string>();
  const [gridFiltered, setGridFiltered] = useState<boolean>(false);
  const [playingState, setPlayingState] = useState<IPlayingState>({
    currentSong: undefined,
    shufflePlaylist: [],
    currentPlaylistSong: -1,
  });
  const shufflePlaylistPool = useRef<IMusicRecordGrid[]>([]);
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

  const onGridSongChange: (song: string) => void = (song) => {
    setPlayingState({
      currentSong: song,
      shufflePlaylist: [],
      currentPlaylistSong: -1,
    });
  };

  const setShufflePool: (
    isGridFiltered: boolean,
    shufflePool: IMusicRecordGrid[]
  ) => void = useCallback((isGridFiltered, shufflePool) => {
    setGridFiltered(isGridFiltered);
    shufflePlaylistPool.current = shufflePool;
  }, []);

  const onShufflePlaylist: () => void = () => {
    const shuffledSongs = shuffle(
      shufflePlaylistPool.current.filter((song) => song.youtube !== '')
    );
    if (!shuffledSongs.length) return;
    setPlayingState({
      currentSong: shuffledSongs[0].youtube,
      shufflePlaylist: shuffledSongs,
      currentPlaylistSong: 0,
    });
    ReactGA.event({
      category: 'Playlist',
      action: gridFiltered
        ? 'Start Shuffled Playlist (Filtered)'
        : 'Start Shuffled Playlist',
      label: 'Shuffle Button',
    });
  };

  const setCurrentPlaylistSong: (newVal: number) => void = (newVal) => {
    setPlayingState((state) => {
      return {
        ...state,
        currentSong: state.shufflePlaylist[newVal].youtube,
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
          <OverlayTrigger
            delay={{ show: 250, hide: 100 }}
            overlay={
              <Tooltip id={`tooltip-start-playlist`}>
                {gridFiltered
                  ? `Start Shuffled Playlist (Filtered)`
                  : `Start Shuffled Playlist`}
              </Tooltip>
            }
          >
            <Button
              variant={gridFiltered ? 'outline-warning' : 'outline-success'}
              onClick={onShufflePlaylist}
            >
              <i className="fa fa-random"></i>
            </Button>
          </OverlayTrigger>
        </InputGroup>
      </Form.Group>
      <MusicGrid
        query={filterText}
        onGridSongChange={onGridSongChange}
        setShufflePool={setShufflePool}
        locateSong={locateSong}
      />
    </div>
  );
};

export default HomePage;
