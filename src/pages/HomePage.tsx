/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import MusicGrid from '../components/MusicGrid';
import { MusicPlayer } from '../components/MusicPlayer';
import { Header } from '../components/Header';
import { useAtom, useSetAtom } from 'jotai';
import {
  emptyPlayingState,
  isPlayingAtom,
  playingStateAtom,
} from '../state/player';
import SearchBar from '../components/SearchBar';
import { useDataSourceState } from '../context/DataSourceContext';

const HomePage: React.FC = () => {
  const dataSource = useDataSourceState();
  const [playingState, setPlayingState] = useAtom(playingStateAtom);
  const setIsPlaying = useSetAtom(isPlayingAtom);

  useEffect(() => {
    const savedPlayingState = localStorage.getItem('playingState');
    setPlayingState(
      savedPlayingState ? JSON.parse(savedPlayingState) : emptyPlayingState
    );
  }, [setPlayingState]);

  const setCurrentQueueSong: (newVal: number) => void = (newVal) => {
    setIsPlaying(true);
    setPlayingState((state) => {
      return {
        ...state,
        currentSong: state.currentQueue[newVal].youtube,
        currentQueueSong: newVal,
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
          setCurrentQueueSong={setCurrentQueueSong}
        />
      )}
      <SearchBar />
      <MusicGrid
        dataSource={dataSource}
        colState={[{ colId: 'source.date', sort: 'desc' }]}
      />
    </div>
  );
};

export default HomePage;
