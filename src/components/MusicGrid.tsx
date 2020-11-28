/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useRef, useEffect, CSSProperties } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  GridOptions,
  GridApi,
  ColumnApi,
  GridReadyEvent,
  ICellRendererParams,
  FirstDataRenderedEvent,
  ValueFormatterParams,
  FilterChangedEvent,
  RowNode,
  CellClassParams,
  ModelUpdatedEvent,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {
  MarkRenderer,
  LinkRenderer,
  DateRenderer,
  ILinkRendererParams,
} from './CellRenderer';
import { useDataSourceState } from '../context/DataSourceContext';
import { format } from 'date-fns';
import { IMusicRecordGrid } from '../models/DataModel';
import { MapleClient } from '../models/MapleClient';
import { complement, rgba } from 'polished';
import { cornFlowerBlue } from '../constants';

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

const getColDef: (onGridSongChange: (song: string) => void) => ColDef[] = (
  onGridSongChange
) => {
  return [
    {
      headerName: '',
      field: 'mark',
      minWidth: 70,
      maxWidth: 70,
      resizable: false,
      cellRenderer: MarkRenderer,
      getQuickFilterText: (): string => '',
    },
    {
      headerName: 'Title',
      field: 'metadata.title',
      minWidth: 250,
      cellRenderer: LinkRenderer,
      cellRendererParams: (
        props: ICellRendererParams
      ): ILinkRendererParams => ({
        title: props.value,
        youtube: props.data.youtube,
        onGridSongChange: onGridSongChange,
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
      filter: 'agDateColumnFilter',
      sort: 'desc',
      valueFormatter: (params: ValueFormatterParams): string => {
        return params.data.source.date
          ? format(params.data.source.date, 'yyyy-MM-dd')
          : '';
      },
      cellRenderer: DateRenderer,
      getQuickFilterText: (): string => '',
    },
    {
      headerName: 'Client',
      field: 'source.clientVersion',
      getQuickFilterText: (): string => '',
      cellStyle: (params: CellClassParams): CSSProperties => {
        if (!params.value) return {};
        const color = rgba(cornFlowerBlue, 0.5);
        return {
          backgroundColor: params.value.startsWith(MapleClient.Korea)
            ? color
            : complement(color),
        };
      },
    },
  ];
};

const MusicGrid: React.FC<{
  query: string | undefined;
  onGridSongChange: (song: string) => void;
  setShufflePool: (
    isGridFiltered: boolean,
    shufflePool: IMusicRecordGrid[]
  ) => void;
}> = ({ query, onGridSongChange, setShufflePool }) => {
  const dataSource = useDataSourceState();
  const gridApi = useRef<GridApi | null>(null);
  const gridColumnApi = useRef<ColumnApi | null>(null);
  const colDef = useRef<ColDef[]>([]);
  const gridOptions = useRef<GridOptions | undefined>(undefined);
  colDef.current = getColDef(onGridSongChange);
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
    setShufflePool(false, dataSource);
  };

  const onFilterChanged = (event: FilterChangedEvent): void => {
    const filterPresent = event.api.isAnyFilterPresent();
    if (!filterPresent) {
      setShufflePool(false, dataSource);
      return;
    }
    const filteredSongs: IMusicRecordGrid[] = [];
    event.api.forEachNodeAfterFilter((rowNode: RowNode, index: number) => {
      filteredSongs.push(rowNode.data);
    });
    setShufflePool(true, filteredSongs);
  };

  const onModelUpdated = (event: ModelUpdatedEvent): void => {
    const rows = event.api.getDisplayedRowCount();
    if (rows > 0) {
      event.api.hideOverlay();
    } else {
      event.api.showNoRowsOverlay();
    }
  };

  return (
    <div
      css={css`
        margin: auto;
        width: 95vw;
        margin-bottom: 15px;
      `}
      className="ag-theme-balham"
    >
      <AgGridReact
        columnDefs={colDef.current}
        rowData={dataSource}
        gridOptions={gridOptions.current}
        onFirstDataRendered={onFirstDataRendered}
        onFilterChanged={onFilterChanged}
        onModelUpdated={onModelUpdated}
        onGridReady={onGridReady}
      ></AgGridReact>
    </div>
  );
};

export default MusicGrid;
