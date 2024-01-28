import { atom } from 'jotai';
import { IPlaylist } from '../models/Playlist';

export const playlistAtom = atom<IPlaylist[]>([]);
export const playlistMapAtom = atom<Map<string, IPlaylist>>(new Map());
export const selectedPlaylistsAtom = atom<string[]>([]);
export const selectedPlaylistAtom = atom((get) => {
  const selectedPlaylists = get(selectedPlaylistsAtom);
  return !selectedPlaylists.length
    ? 'undefined'
    : selectedPlaylists.length > 1
    ? 'multi'
    : selectedPlaylists[0];
});
export const trackExportSetAtom = atom<Set<string>>(new Set<string>());
