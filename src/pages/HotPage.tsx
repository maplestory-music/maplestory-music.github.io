/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
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
import { hotTracksAtom } from '../state/hot';
import { IMusicRecordGrid } from '../models/DataModel';

const getVideoId = (track: IMusicRecordGrid) => {
  return track.youtube;
};

type IHotMusicRecordGrid = IMusicRecordGrid & { count?: number };

const filterToHot = (
  dbFromWire: IMusicRecordGrid[],
  allHotTracks: Map<string, number>
) => {
  const output: IHotMusicRecordGrid[] = [];
  for (const t of dbFromWire) {
    const key = getVideoId(t);
    const hasKey = allHotTracks.has(key);
    if (hasKey) {
      output.push({ ...t, count: allHotTracks.get(key) });
    }
  }
  return output;
};

const HotPage: React.FC = () => {
  const hotTracks = useAtomValue(hotTracksAtom);
  const dbFromWire = useDataSourceState();
  const [dataSource, setDataSource] = useState<IHotMusicRecordGrid[]>([]);
  const [playingState, setPlayingState] = useAtom(playingStateAtom);
  const setIsPlaying = useSetAtom(isPlayingAtom);

  useEffect(() => {
    setPlayingState(emptyPlayingState);
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

  useEffect(() => {
    // Filter datasource to hot tracks
    if (!dbFromWire.length) return;
    const allHotTracks: Map<string, number> = new Map();
    for (const track of hotTracks) {
      allHotTracks.set(track.track, track.count);
    }
    const filtered = filterToHot(dbFromWire, allHotTracks);
    setDataSource(filtered);
  }, [hotTracks, dbFromWire]);

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
      <SearchBar />
      <MusicGrid
        dataSource={dataSource}
        colState={[{ colId: 'count', sort: 'desc' }]}
        enableHotCountCol
      />
    </div>
  );
};

export default HotPage;
