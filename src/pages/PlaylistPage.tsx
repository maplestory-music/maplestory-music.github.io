/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect, useMemo } from 'react';
import MusicGrid from '../components/MusicGrid';
import { MusicPlayer } from '../components/MusicPlayer';
import { Header } from '../components/Header';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  emptyPlayingState,
  isPlayingAtom,
  playingStateAtom,
} from '../state/player';
import SearchBar from '../components/SearchBar';
import { useDataSourceState } from '../context/DataSourceContext';
import Select from 'react-select';
import {
  playlistMapAtom,
  selectedPlaylistsAtom,
  trackExportSetAtom,
} from '../state/playlist';
import { css } from '@emotion/react';
import { useTheme } from '../context/ThemeContext';
import { IPlayingState } from '../models/Player';
import {
  getCustomPlaylistsMap,
  getKey,
} from '../components/utils/PlaylistUtils';
import { sortBy } from 'lodash-es';
import { Dropdown } from 'react-bootstrap';
import { QueueActionButton } from '../components/QueueActionButton';

const PlaylistPage: React.FC = () => {
  const appTheme = useTheme();
  const dbFromWire = useDataSourceState();
  const [dataSource, setDataSource] = useState(dbFromWire);
  const dbPlaylistMap = useAtomValue(playlistMapAtom);
  const customPlaylistsMap = useMemo(() => {
    return getCustomPlaylistsMap();
  }, []);
  const [playingState, setPlayingState] = useAtom(playingStateAtom);
  const setIsPlaying = useSetAtom(isPlayingAtom);
  const selectRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState<
    readonly { value: string; label: string; custom?: boolean }[]
  >([]);
  const dbPlaylists = useMemo(() => {
    return Array.from(dbPlaylistMap.values()).map((pl) => ({
      value: pl.name,
      label: pl.name,
    }));
  }, [dbPlaylistMap]);
  const customPlaylists = useMemo(() => {
    return Array.from(customPlaylistsMap.values()).map((pl) => ({
      value: pl.name,
      label: `[Custom] ${pl.name}`,
      custom: true,
    }));
  }, [customPlaylistsMap]);
  const allPlaylists = useMemo(() => {
    return [...dbPlaylists, ...customPlaylists];
  }, [dbPlaylists, customPlaylists]);
  const setSelectedPlaylists = useSetAtom(selectedPlaylistsAtom);
  const [trackExportSet, setTrackExportSet] = useAtom(trackExportSetAtom);

  useEffect(() => {
    setPlayingState(emptyPlayingState);
  }, [setPlayingState]);

  useEffect(() => {
    // Filter datasource to tracks in the selected playlist(s)
    if (!dbFromWire.length) return;
    if (!selectedOption || !selectedOption.length) {
      setDataSource(dbFromWire);
      return;
    }
    const allPlaylistTracks: Set<string> = new Set();
    for (const pl of selectedOption) {
      const playlistMap = pl.custom ? customPlaylistsMap : dbPlaylistMap;
      const playlist = playlistMap.get(pl.value);
      if (!playlist) return;
      playlist.tracks.forEach((t) => allPlaylistTracks.add(t));
    }
    const allPlaylistTracksArr = Array.from(allPlaylistTracks);
    const filtered = dbFromWire.filter((track) => {
      const key = getKey(track.source.structure, track.filename);
      return allPlaylistTracks.has(key);
    });
    const sorted = sortBy(filtered, (t) => {
      const key = getKey(t.source.structure, t.filename);
      return allPlaylistTracksArr.indexOf(key);
    });
    setDataSource(sorted);
  }, [dbFromWire, dbPlaylistMap, customPlaylistsMap, selectedOption]);

  const setCurrentQueueSong: (newVal: number) => void = (newVal) => {
    setIsPlaying(true);
    setPlayingState(
      (state): IPlayingState => {
        return {
          ...state,
          currentSong: state.currentQueue[newVal].youtube,
          currentQueueSong: newVal,
        };
      }
    );
  };

  const onSelectChange = (
    newValue: readonly { value: string; label: string }[]
  ) => {
    setSelectedOption(newValue);
    setSelectedPlaylists(newValue.map((pl) => pl.value));
  };

  const onCopyExportSet = () => {
    const strArr = Array.from(trackExportSet);
    const str = JSON.stringify(strArr, null, 2);
    navigator.clipboard.writeText(str);
  };

  const onClearExportSet = () => {
    setTrackExportSet(new Set());
  };

  return (
    <div>
      {playingState.currentSong === undefined ? (
        <Header noText />
      ) : (
        <MusicPlayer
          playingState={playingState}
          setCurrentQueueSong={setCurrentQueueSong}
        />
      )}
      <div
        css={css`
          display: flex;
          margin: 10px 25vw;
          justify-content: center;
          align-items: center;
          height: 46px;
        `}
      >
        <Select
          css={css`
            width: 100%;
          `}
          classNamePrefix={
            appTheme.darkMode ? 'playlist-select-dark' : 'playlist-select'
          }
          isMulti
          options={allPlaylists}
          ref={selectRef}
          value={selectedOption}
          onChange={onSelectChange}
          placeholder="Select playlist"
        />
        <Dropdown
          css={css`
            height: 100%;
          `}
        >
          <Dropdown.Toggle
            css={css`
              height: 100%;
            `}
            variant="outline-primary"
          >
            <i className="fa fa-cog"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <QueueActionButton
              actionName="Copy Export Set"
              iconClass="fa fa-copy"
              onClick={onCopyExportSet}
            />
            <QueueActionButton
              actionName="Clear Export Set"
              iconClass="fa fa-trash"
              onClick={onClearExportSet}
            />
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <SearchBar />
      <MusicGrid dataSource={dataSource} enableTrackIdCol />
    </div>
  );
};

export default PlaylistPage;
