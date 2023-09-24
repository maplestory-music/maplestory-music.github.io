/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import MusicGrid from '../components/MusicGrid';
import { MusicPlayer } from '../components/MusicPlayer';
import { Header } from '../components/Header';
import { useAtom } from 'jotai';
import { emptyPlayingState, playingStateAtom } from '../state/player';
import SearchBar from '../components/SearchBar';
import { useDataSourceState } from '../context/DataSourceContext';

const HomePage: React.FC = () => {
  const dataSource = useDataSourceState();
  const [playingState, setPlayingState] = useAtom(playingStateAtom);

  useEffect(() => {
    setPlayingState(emptyPlayingState);
  }, [setPlayingState]);

  const setCurrentQueueSong: (newVal: number) => void = (newVal) => {
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
      <MusicGrid dataSource={dataSource} />
    </div>
  );
};

export default HomePage;
