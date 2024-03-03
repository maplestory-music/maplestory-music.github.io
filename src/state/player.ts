import { atom } from 'jotai';
import { ILocateSong, IPlayingState } from '../models/Player';
import { IMusicRecordGrid } from '../models/DataModel';

export const emptyPlayingState = {
  currentSong: undefined,
  currentQueue: [],
  currentQueueSong: -1,
  repeatQueue: false,
};

export const filterTextAtom = atom<string | undefined>(undefined);
export const locateSongAtom = atom<ILocateSong | undefined>(undefined);
export const queueRepeatAtom = atom<boolean>(false);
export const playingStateAtom = atom<IPlayingState>(emptyPlayingState);
export const gridFilteredAtom = atom<boolean>(false);
export const appQueuePoolAtom = atom<IMusicRecordGrid[]>([]);
export const isPlayingAtom = atom<boolean>(false);
