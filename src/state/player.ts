import { atom } from 'jotai';
import { ILocateSong, IPlayingState } from '../pages/HomePage';
import { IMusicRecordGrid } from '../models/DataModel';

export const emptyPlayingState = {
  currentSong: undefined,
  currentPlaylist: [],
  currentPlaylistSong: -1,
  repeatPlaylist: false,
};

export const filterTextAtom = atom<string | undefined>(undefined);
export const locateSongAtom = atom<ILocateSong | undefined>(undefined);
export const playlistRepeatAtom = atom<boolean>(false);
export const playingStateAtom = atom<IPlayingState>(emptyPlayingState);
export const gridFilteredAtom = atom<boolean>(false);
export const appPlaylistPoolAtom = atom<IMusicRecordGrid[]>([]);
