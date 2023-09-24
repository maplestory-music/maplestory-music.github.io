/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect, useMemo } from 'react';
import MusicGrid from '../components/MusicGrid';
import { MusicPlayer } from '../components/MusicPlayer';
import { Header } from '../components/Header';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { emptyPlayingState, playingStateAtom } from '../state/player';
import SearchBar from '../components/SearchBar';
import { useDataSourceState } from '../context/DataSourceContext';
import Select from 'react-select';
import { playlistMapAtom, selectedPlaylistsAtom } from '../state/playlist';
import { css } from '@emotion/react';
import { useTheme } from '../context/ThemeContext';

export interface ILocateSong {
  songId: string | undefined;
}

const PlaylistPage: React.FC = () => {
  const appTheme = useTheme();
  const dbFromWire = useDataSourceState();
  const [dataSource, setDataSource] = useState(dbFromWire);
  const dbPlaylistMap = useAtomValue(playlistMapAtom);
  const [playingState, setPlayingState] = useAtom(playingStateAtom);
  const selectRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState<
    readonly { value: string; label: string }[]
  >([]);
  const dbPlaylists = useMemo(() => {
    return Array.from(dbPlaylistMap.values()).map((pl) => ({
      value: pl.name,
      label: pl.name,
    }));
  }, [dbPlaylistMap]);
  const setSelectedPlaylists = useSetAtom(selectedPlaylistsAtom);

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
      const playlist = dbPlaylistMap.get(pl.value);
      if (!playlist) return;
      playlist.tracks.forEach((t) => allPlaylistTracks.add(t));
    }
    const filtered = dbFromWire.filter((track) => {
      const key = `${track.source.structure}/${track.filename}`;
      return allPlaylistTracks.has(key);
    });
    setDataSource(filtered);
  }, [dbFromWire, dbPlaylistMap, selectedOption]);

  const setCurrentQueueSong: (newVal: number) => void = (newVal) => {
    setPlayingState((state) => {
      return {
        ...state,
        currentSong: state.currentQueue[newVal].youtube,
        currentQueueSong: newVal,
      };
    });
  };

  const onSelectChange = (
    newValue: readonly { value: string; label: string }[]
  ) => {
    setSelectedOption(newValue);
    setSelectedPlaylists(newValue.map((pl) => pl.value));
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
      <Select
        css={css`
          margin: 10px 25vw;
        `}
        classNamePrefix={
          appTheme.darkMode ? 'playlist-select-dark' : 'playlist-select'
        }
        isMulti
        options={dbPlaylists}
        ref={selectRef}
        value={selectedOption}
        onChange={onSelectChange}
        placeholder="Select playlist"
      />
      <SearchBar />
      <MusicGrid dataSource={dataSource} />
    </div>
  );
};

export default PlaylistPage;
