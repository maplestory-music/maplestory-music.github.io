interface IMusicRecordMetadataJson {
  albumArtist: string;
  artist: string;
  subtitle: string;
  title: string;
  year: string;
}

interface IMusicRecordSourceJson {
  client: string;
  date: string;
  structure: string;
  version: string;
}

export interface IMusicRecordJson {
  description: string;
  filename: string;
  mark: string;
  metadata: IMusicRecordMetadataJson;
  source: IMusicRecordSourceJson;
  youtube: string;
}

export interface IMusicRecordSourceGrid
  extends Omit<IMusicRecordSourceJson, 'date'> {
  date: Date | null;
  clientVersion: string;
}

export interface IMusicRecordGrid extends Omit<IMusicRecordJson, 'source'> {
  source: IMusicRecordSourceGrid;
}
