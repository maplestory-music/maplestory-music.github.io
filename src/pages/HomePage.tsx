/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import MusicGrid from '../components/MusicGrid';
import { IMusicRecordGrid } from '../models/DataModel';
import { MusicPlayer } from '../components/MusicPlayer';
import { Header } from '../components/Header';
import { useAtom } from 'jotai';
import { emptyPlayingState, playingStateAtom } from '../state/player';
import SearchBar from '../components/SearchBar';
import { useDataSourceState } from '../context/DataSourceContext';

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
  const dataSource = useDataSourceState();
  const [playingState, setPlayingState] = useAtom(playingStateAtom);

  useEffect(() => {
    setPlayingState(emptyPlayingState);
  }, [setPlayingState]);

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
      <SearchBar />
      <MusicGrid dataSource={dataSource} />
    </div>
  );
};

export default HomePage;
