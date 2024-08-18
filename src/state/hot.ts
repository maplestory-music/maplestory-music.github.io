import { atom } from 'jotai';
import { IHotTrackEntry } from '../models/HotTracks';

export const hotTracksAtom = atom<IHotTrackEntry[]>([]);
