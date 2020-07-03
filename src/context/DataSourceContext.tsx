import React, { useEffect } from 'react';
import { IMusicGridData } from '../components/MusicGrid';

type State = IMusicGridData[];
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
      .then((rowData) => {
        const rowDataMod = rowData.map((song: IMusicGridData) => {
          if (song.source.client && song.source.version) {
            song.source.cliver = `${song.source.client} ${song.source.version}`;
          }
          return song;
        });
        setState(rowDataMod);
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
