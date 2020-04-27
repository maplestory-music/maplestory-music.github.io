import React, { useRef, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  GridOptions,
  GridApi,
  ColumnApi,
  GridReadyEvent,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import MapIcon from './MapIcon';

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

interface IMusicGridData extends IMusicGridJson {
  source: {
    client: string;
    date: string;
    structure: string;
    version: string;
    cliver: string;
  };
}

function linkRenderer(params: any) {
  var element = document.createElement('span');
  var textNode = document.createTextNode(params.data.metadata.title);
  if (params.data.youtube) {
    var linkElement = document.createElement('a');
    linkElement.appendChild(textNode);
    linkElement.href = 'https://youtu.be/' + params.data.youtube;
    linkElement.target = '_blank';
    linkElement.rel = 'noopener noreferrer';
    element.appendChild(linkElement);
  } else {
    element.appendChild(textNode);
  }
  return element;
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

const getColDef: () => ColDef[] = () => {
  return [
    {
      headerName: '',
      field: 'mark',
      minWidth: 70,
      maxWidth: 70,
      resizable: false,
      cellRendererFramework: MapIcon,
      getQuickFilterText: () => '',
    },
    {
      headerName: 'Title',
      field: 'metadata.title',
      minWidth: 250,
      cellRenderer: 'linkRenderer',
    },
    {
      headerName: 'Description',
      minWidth: 375,
      field: 'description',
    },
    {
      headerName: 'Folder',
      field: 'source.structure',
      getQuickFilterText: () => '',
    },
    {
      headerName: 'Date',
      field: 'source.date',
      sort: 'desc',
      getQuickFilterText: () => '',
    },
    {
      headerName: 'Client',
      field: 'source.cliver',
      getQuickFilterText: () => '',
    },
  ];
};

const getComponents: () => any = () => {
  return {
    linkRenderer: linkRenderer,
  };
};

const MusicGrid: React.FC = () => {
  const gridApi = useRef<GridApi | null>(null);
  const gridColumnApi = useRef<ColumnApi | null>(null);
  const colDef = useRef<ColDef[]>([]);
  const gridOptions = useRef<GridOptions | undefined>(undefined);
  const [rowData, setRowData] = useState<any>(null);
  colDef.current = getColDef();
  gridOptions.current = getGridOptions();

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/maplestory-music/maplebgm-db/master/bgm.json'
    )
      .then((result) => result.json())
      .then((rowData) => {
        const rowDataMod = rowData.map((song: IMusicGridData) => {
          if (song.source.client && song.source.version) {
            song.source.cliver = `${song.source.client} ${song.source.version}`;
          }
          return song;
        });
        setRowData(rowDataMod);
      });
  }, [setRowData]);

  const onGridReady = (params: GridReadyEvent) => {
    gridApi.current = params.api;
    gridColumnApi.current = params.columnApi;
  };

  return (
    <div className='ag-theme-balham'>
      <AgGridReact
        columnDefs={colDef.current}
        rowData={rowData}
        gridOptions={gridOptions.current}
        components={getComponents()}
        // onFirstDataRendered={this.onFirstDataRendered.bind(this)}
        onGridReady={onGridReady}
      ></AgGridReact>
    </div>
  );
};

export default MusicGrid;
