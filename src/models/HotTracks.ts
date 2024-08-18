export interface IHotTrackResponse {
  time: string; // ISO 8601
  data: IHotTrackEntry[];
}

export interface IHotTrackEntry {
  track: string;
  count: number;
}
