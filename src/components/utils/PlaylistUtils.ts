import { IPlaylist } from '../../models/Playlist';

const LOCAL_STORAGE_KEY = 'custom-playlists';

export const getKey = (folder: string, filename: string): string => {
  return `${folder}/${filename}`;
};

export function resetCustomPlaylists(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export function getCustomPlaylists(): IPlaylist[] {
  const json = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (json) {
    try {
      return JSON.parse(json);
    } catch (e) {
      throw new Error('Error parsing JSON from localStorage');
    }
  }
  return [];
}

export function getCustomPlaylistsMap(): Map<string, IPlaylist> {
  const json = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (json) {
    const parsed = JSON.parse(json);
    return convertToPlaylistMap(parsed);
  }
  return new Map();
}

export function setCustomPlaylists(playlists: IPlaylist[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(playlists));
}

export const playlistSanityCheck = (playlist: IPlaylist): boolean => {
  if (!('name' in playlist) || !('tracks' in playlist)) return false;
  return true;
};

export const convertToPlaylistMap = (
  playlist: IPlaylist[]
): Map<string, IPlaylist> => {
  const plMap = new Map<string, IPlaylist>();
  for (const pl of playlist) {
    plMap.set(pl.name, pl);
  }
  return plMap;
};
