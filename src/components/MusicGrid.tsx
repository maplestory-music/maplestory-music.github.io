/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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
  ValueFormatterParams,
  FilterChangedEvent,
  RowNode,
  CellClassParams,
  ModelUpdatedEvent,
  CellStyle,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { useDataSourceState } from '../context/DataSourceContext';
import { format } from 'date-fns';
import { IMusicRecordGrid } from '../models/DataModel';
import { MapleClient } from '../models/MapleClient';
import { complement, rgba } from 'polished';
import { cornFlowerBlue, PAGINATION_PAGE_SIZE } from '../constants';
import { ILocateSong } from '../pages/HomePage';
import { MarkRenderer } from './renderers/MarkRenderer';
import { ILinkRendererParams, LinkRenderer } from './renderers/LinkRenderer';
import { DateRenderer } from './renderers/DateRenderer';

const getGridOptions: () => GridOptions = () => {
  return {
    animateRows: false,
    pagination: true,
    paginationPageSize: PAGINATION_PAGE_SIZE,
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
      valueFormatter: (params: ValueFormatterParams): string => {
        return params.data.source.date
          ? format(params.data.source.date, 'yyyy-MM-dd')
          : '';
      },
      cellRendererFramework: DateRenderer,
      getQuickFilterText: (): string => '',
    },
    {
      headerName: 'Client',
      field: 'source.clientVersion',
      getQuickFilterText: (): string => '',
      cellStyle: (params: CellClassParams): CellStyle => {
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

const scrollToLocatedRow = (rowIndex: number | null): void => {
  if (rowIndex === null) return;
  const rowElement = document.querySelector<HTMLElement>(
    `div.ag-theme-balham div[row-index='${rowIndex}']`
  );
  const rowTransform = rowElement?.style.transform;
  if (!rowTransform) return;
  const regex = new RegExp(/^translateY\((\d+)px\)$/g);
  const execResult = regex.exec(rowTransform);
  if (!execResult) return;
  const [, rowTranslateY] = execResult;
  const gridOffsetY = document.querySelector<HTMLElement>(`div.ag-theme-balham`)
    ?.offsetTop;
  if (gridOffsetY === undefined) return;
  const scrollPosition = gridOffsetY + Number(rowTranslateY);
  window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
};

const MusicGrid: React.FC<{
  query: string | undefined;
  onGridSongChange: (song: string) => void;
  setShufflePool: (
    isGridFiltered: boolean,
    shufflePool: IMusicRecordGrid[]
  ) => void;
  locateSong: ILocateSong | undefined;
}> = ({ query, onGridSongChange, setShufflePool, locateSong }) => {
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

  // Locate Current Song handler
  useEffect(() => {
    if (!locateSong?.songId) return;
    locateSongInGrid(locateSong.songId);
  }, [locateSong]);

  const locateSongInGrid = (songId: string | undefined): void => {
    if (!songId) return;
    let foundIdx = -1;
    const foundNode: RowNode[] = [];
    gridApi.current?.forEachNodeAfterFilterAndSort(
      (node: RowNode, index: number) => {
        const data = node.data as IMusicRecordGrid;
        if (data.youtube === songId) {
          foundIdx = index;
          foundNode.push(node);
        }
      }
    );
    if (foundIdx === -1 || foundNode.length !== 1) return;
    const pageOffset = Math.ceil((foundIdx + 1) / PAGINATION_PAGE_SIZE) - 1;
    gridApi.current?.paginationGoToPage(pageOffset);
    gridApi.current?.ensureIndexVisible(foundIdx, 'middle');
    foundNode[0].setSelected(true);
    scrollToLocatedRow(foundNode[0].rowIndex);
  };

  const onGridReady = (params: GridReadyEvent): void => {
    gridApi.current = params.api;
    gridColumnApi.current = params.columnApi;
    const columnState = { state: [{ colId: 'source.date', sort: 'desc' }] };
    params.columnApi.applyColumnState(columnState);
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
