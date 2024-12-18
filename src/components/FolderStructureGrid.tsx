import {
  GridOptions,
  ColDef,
  GridReadyEvent,
  ColumnApi,
  GridApi,
  ValueFormatterParams,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { format } from 'date-fns';
import { countBy } from 'lodash-es';
import { useMemo, useRef } from 'react';
import { useDataSourceState } from '../context/DataSourceContext';
import { useTheme } from '../context/ThemeContext';
import { IMusicRecordGrid } from '../models/DataModel';
import { DateRenderer, IDateRendererParams } from './renderers/DateRenderer';
import { MarkRenderer } from './renderers/MarkRenderer';
import { ClientVersionCellStyle } from './utils/GridUtils';

const getGridOptions = (): GridOptions => {
  return {
    animateRows: false,
    pagination: true,
    paginationPageSize: 10,
    suppressColumnVirtualisation: true,
    suppressMovableColumns: true,
    rowHeight: 45,
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
    },
    domLayout: 'autoHeight',
  };
};

const getColDef = (): ColDef[] => {
  return [
    {
      headerName: '',
      field: 'mark',
      minWidth: 70,
      maxWidth: 70,
      resizable: false,
      cellRendererFramework: MarkRenderer,
    },
    {
      headerName: 'Folder',
      field: 'folderName',
    },
    {
      headerName: 'Creation',
      field: 'creation',
      initialWidth: 145,
      cellRendererFramework: DateRenderer,
      cellRendererParams: {
        disableRecentTrack: true,
      } as IDateRendererParams,
      filter: 'agDateColumnFilter',
      valueFormatter: (params: ValueFormatterParams): string => {
        return !Number.isNaN(params.data.creation.valueOf())
          ? format(params.data.creation, 'yyyy-MM-dd')
          : '';
      },
    },
    {
      headerName: 'Creation Client',
      field: 'creationClient',
      initialWidth: 125,
      cellStyle: ClientVersionCellStyle,
    },
    {
      headerName: 'Last Update',
      field: 'lastUpdate',
      initialWidth: 145,
      cellRendererFramework: DateRenderer,
      cellRendererParams: {
        disableRecentTrack: true,
      } as IDateRendererParams,
      filter: 'agDateColumnFilter',
      valueFormatter: (params: ValueFormatterParams): string => {
        return !Number.isNaN(params.data.lastUpdate.valueOf())
          ? format(params.data.lastUpdate, 'yyyy-MM-dd')
          : '';
      },
    },
    {
      headerName: 'Last Update Client',
      field: 'lastUpdateClient',
      initialWidth: 140,
      cellStyle: ClientVersionCellStyle,
    },
    {
      headerName: 'Track Count',
      field: 'trackCount',
      initialWidth: 110,
    },
  ];
};

type FolderStructure = {
  mark: string;
  folderName: string;
  creation: Date;
  creationClient: string;
  lastUpdate: Date;
  lastUpdateClient: string;
  trackCount: number;
};

export const FolderStructureGrid: React.FC = () => {
  const appTheme = useTheme();
  const dataSource = useDataSourceState();
  const gridApi = useRef<GridApi | null>(null);
  const gridColumnApi = useRef<ColumnApi | null>(null);
  const colDef = useRef<ColDef[]>(getColDef());
  const gridOptions = useRef<GridOptions | undefined>(getGridOptions());

  const folderStructure = useMemo(() => {
    const folderToTracks = new Map<string, IMusicRecordGrid[]>();
    for (const track of dataSource) {
      const key = track.source.structure;
      const bucket = folderToTracks.get(key);
      if (bucket) {
        folderToTracks.set(key, [...bucket, track]);
      } else {
        folderToTracks.set(key, [track]);
      }
    }
    const transformToFolderStructure = Array.from(
      folderToTracks.entries()
    ).reduce((prev: FolderStructure[], [currentKey, currentValue]) => {
      const records = currentValue.map((t) => ({
        date: t.source.date?.valueOf() ?? Number.NaN,
        clientVersion: t.source.clientVersion,
      }));
      const sortedRecords = records.sort((a, b) => a.date - b.date);
      const icons = Object.entries(
        countBy(currentValue.map((t) => t.mark))
      ).sort((a, b) => b[1] - a[1]);
      const first = sortedRecords[0];
      const last = sortedRecords[sortedRecords.length - 1];
      const folderInfo: FolderStructure = {
        folderName: currentKey,
        trackCount: currentValue.length,
        mark: icons[0][0],
        creation: new Date(first.date),
        creationClient: first.clientVersion,
        lastUpdate: new Date(last.date),
        lastUpdateClient: last.clientVersion,
      };
      prev.push(folderInfo);
      return prev;
    }, []);
    return transformToFolderStructure;
  }, [dataSource]);

  const onGridReady = (params: GridReadyEvent): void => {
    gridApi.current = params.api;
    gridColumnApi.current = params.columnApi;
    const columnState = { state: [{ colId: 'lastUpdate', sort: 'desc' }] };
    params.columnApi.applyColumnState(columnState);
  };

  return (
    <div
      className={appTheme.darkMode ? 'ag-theme-balham-dark' : 'ag-theme-balham'}
    >
      <AgGridReact
        columnDefs={colDef.current}
        rowData={folderStructure}
        gridOptions={gridOptions.current}
        onGridReady={onGridReady}
        reactUi={true}
        popupParent={document.querySelector('body') || undefined}
      ></AgGridReact>
    </div>
  );
};
