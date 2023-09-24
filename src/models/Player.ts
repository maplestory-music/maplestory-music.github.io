import { IMusicRecordGrid } from './DataModel';

export interface IPlayingState {
  currentSong: string | undefined;
  currentQueue: IMusicRecordGrid[];
  currentQueueSong: number;
  repeatQueue: boolean;
}

export interface ILocateSong {
  songId: string | undefined;
}
