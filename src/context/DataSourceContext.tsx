import React, { useEffect } from 'react';
import { parseISO } from 'date-fns';
import {
  IMusicRecordGrid,
  IMusicRecordJson,
  IMusicRecordSourceGrid,
} from '../DataModel';

type State = IMusicRecordGrid[];
type DataSourceProviderProps = { children: React.ReactNode };

const DataSourceStateContext = React.createContext<State | undefined>(
  undefined
);

export const DataSourceProvider: ({
  children,
}: DataSourceProviderProps) => React.ReactElement = ({ children }) => {
  const [state, setState] = React.useState<State>([]);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/maplestory-music/maplebgm-db/prod/bgm.min.json'
    )
      .then((result) => result.json())
      .then((rowData: IMusicRecordJson[]) => {
        const rowDataGrid: IMusicRecordGrid[] = rowData.map(
          (song: IMusicRecordJson) => {
            const source: IMusicRecordSourceGrid = {
              client: song.source.client,
              date: song.source.date ? parseISO(song.source.date) : null,
              structure: song.source.structure,
              version: song.source.version,
              clientVersion:
                song.source.client && song.source.version
                  ? `${song.source.client} ${song.source.version}`
                  : '',
            };
            const gridRecord: IMusicRecordGrid = Object.assign({}, song, {
              source: source,
            });
            return gridRecord;
          }
        );
        setState(rowDataGrid);
      });
  }, [setState]);

  return (
    <DataSourceStateContext.Provider value={state}>
      {children}
    </DataSourceStateContext.Provider>
  );
};

export const useDataSourceState: () => State = () => {
  const context = React.useContext(DataSourceStateContext);
  if (!context) {
    throw new Error(
      'useDataSourceState must be used within a DataSourceProvider'
    );
  }
  return context;
};
