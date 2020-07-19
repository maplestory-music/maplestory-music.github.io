/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  GridOptions,
  GridApi,
  ColumnApi,
  GridReadyEvent,
  ICellRendererParams,
  FirstDataRenderedEvent,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import MarkRenderer from './MarkRenderer';
import LinkRenderer from './LinkRenderer';
import { useDataSourceState } from '../context/DataSourceContext';

interface IMusicGridJson {
  description: string;
  filename: string;
  mark: string;
  metadata: {
    albumArtist: string;
    artist: string;
    subtitle: string;
    title: string;
    year: string;
  };
  source: {
    client: string;
    date: string;
    structure: string;
    version: string;
  };
  youtube: string;
}

export interface IMusicGridData extends IMusicGridJson {
  source: {
    client: string;
    date: string;
    structure: string;
    version: string;
    cliver: string;
  };
}

const getGridOptions: () => GridOptions = () => {
  return {
    animateRows: true,
    pagination: true,
    paginationPageSize: 25,
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

const getColDef: (onSongChange: (song: string) => void) => ColDef[] = (
  onSongChange
) => {
  return [
    {
      headerName: '',
      field: 'mark',
      minWidth: 70,
      maxWidth: 70,
      resizable: false,
      cellRendererFramework: MarkRenderer,
      getQuickFilterText: (): string => '',
    },
    {
      headerName: 'Title',
      field: 'metadata.title',
      minWidth: 250,
      cellRendererFramework: LinkRenderer,
      cellRendererParams: (
        props: ICellRendererParams
      ): {
        title: string;
        youtube: string;
        onSongChange: (song: string) => void;
      } => ({
        title: props.value,
        youtube: props.data.youtube,
        onSongChange: onSongChange,
      }),
    },
    {
      headerName: 'Description',
      minWidth: 375,
      field: 'description',
    },
    {
      headerName: 'Folder',
      field: 'source.structure',
      getQuickFilterText: (): string => '',
    },
    {
      headerName: 'Date',
      field: 'source.date',
      sort: 'desc',
      getQuickFilterText: (): string => '',
    },
    {
      headerName: 'Client',
      field: 'source.cliver',
      getQuickFilterText: (): string => '',
    },
  ];
};

const MusicGrid: React.FC<{
  query: string | undefined;
  onSongChange: (song: string) => void;
}> = ({ query, onSongChange }) => {
  const dataSource = useDataSourceState();
  const gridApi = useRef<GridApi | null>(null);
  const gridColumnApi = useRef<ColumnApi | null>(null);
  const colDef = useRef<ColDef[]>([]);
  const gridOptions = useRef<GridOptions | undefined>(undefined);
  colDef.current = getColDef(onSongChange);
  gridOptions.current = getGridOptions();

  useEffect(() => {
    gridApi.current?.setQuickFilter(query);
  }, [query]);

  const onGridReady = (params: GridReadyEvent): void => {
    gridApi.current = params.api;
    gridColumnApi.current = params.columnApi;
  };

  const onFirstDataRendered = (event: FirstDataRenderedEvent): void => {
    event.columnApi.autoSizeAllColumns();
  };

  return (
    <div
      css={css`
        margin: auto;
        width: 95vw;
      `}
      className="ag-theme-balham"
    >
      <AgGridReact
        columnDefs={colDef.current}
        rowData={dataSource}
        gridOptions={gridOptions.current}
        onFirstDataRendered={onFirstDataRendered}
        onGridReady={onGridReady}
      ></AgGridReact>
    </div>
  );
};

export default MusicGrid;
