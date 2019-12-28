/* eslint max-len: 0 */
import React from 'react';
import MarkComponent from './MarkComponent.jsx';

import { AgGridReact } from 'ag-grid-react';
import {
  FormControl,
  FormGroup,
  Glyphicon,
  InputGroup
} from 'react-bootstrap';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

function linkRenderer(params) {
  var element = document.createElement("span");
  var textNode = document.createTextNode(params.data.metadata.title);
  if (params.data.youtube) {
    var linkElement = document.createElement("a");
    linkElement.appendChild(textNode);
    linkElement.href = 'https://youtu.be/' + params.data.youtube;
    linkElement.target = '_blank';
    linkElement.rel = 'noopener noreferrer';
    element.appendChild(linkElement);
  }
  else {
    element.appendChild(textNode);
  }
  return element;
}

class MusicTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: '',
          field: 'mark',
          minWidth: 70,
          maxWidth: 70,
          resizable: false,
          cellRendererFramework: MarkComponent,
          getQuickFilterText: () => ''
        },
        {
          headerName: 'Title',
          field: 'metadata.title',
          minWidth: 250,
          cellRenderer: 'linkRenderer'
        },
        {
          headerName: 'Description',
          minWidth: 375,
          field: 'description'
        },
        {
          headerName: 'Folder',
          field: 'source.structure',
          getQuickFilterText: () => ''
        },
        {
          headerName: 'Date',
          field: 'source.date',
          sort: 'desc',
          getQuickFilterText: () => ''
        },
        {
          headerName: 'Client',
          field: 'source.cliver',
          getQuickFilterText: () => ''
        }
      ],
      gridOptions: {
        animateRows: true,
        pagination: true,
        paginationPageSize: 25,
        suppressColumnVirtualisation: true,
        suppressMovableColumns: true,
        rowHeight: 45,
        defaultColDef: {
          sortable: true,
          filter: true,
          resizable: true
        },
        domLayout: 'autoHeight'
      },
      components: {
        linkRenderer: linkRenderer
      },
      cellStyle: {
        'text-align': 'right'
      }
    }
  }

  componentWillMount() {
    fetch('https://raw.githubusercontent.com/maplestory-music/maplebgm-db/master/bgm.json')
      .then(result => result.json())
      .then(rowData => {
        let rowDataMod = rowData.map(song => {
          if ('client' in song.source && 'version' in song.source) {
            song.source['cliver'] = `${song.source.client}  ${song.source.version}`;
          }
          return song;
        });
        this.setState({ rowData: rowDataMod })
      });
  }

  onFirstDataRendered(params) {
    var allColumnIds = [];
    params.columnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    params.columnApi.autoSizeColumns(allColumnIds);
  }

  onFilterTextChanged(params) {
    this.gridApi.setQuickFilter(params.target.value);
  }

  onFilterTextKeyPress(params) {
    if (params.key === 'Enter') {
      document.activeElement.blur();
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  render() {
    return (
      <div>
        <div>
          <img id='header-logo' src='assets/pink-bean.png' alt='header logo'/>
        </div>
        <div>
          <p>
            Welcome to the MapleStory Music database. This site provides a complete listing of the background music (BGM)
            used in MapleStory. Collectively, the songs are also known as MapleStory's original soundtrack (OST).
            To sort by a column, press the column header. Hover over a column header and press the menu icon to access the
            advanced filter dialog. Mobile users can access the filter dialog by pressing and holding the column header.
          </p>
        </div>
        <FormGroup className='filter-text' bsSize="large">
          <InputGroup>
            <InputGroup.Addon>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
            <FormControl
              type='text'
              placeholder='Song title or keyword'
              onChange={this.onFilterTextChanged.bind(this)}
              onKeyPress={this.onFilterTextKeyPress.bind(this)} />
          </InputGroup>
        </FormGroup>
        <div className="ag-theme-balham">
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            gridOptions={
              this.state.gridOptions
            }
            components={this.state.components}
            onFirstDataRendered={this.onFirstDataRendered.bind(this)}
            onGridReady={this.onGridReady.bind(this)}
            cellStyle={this.state.cellStyle}>
          </AgGridReact>
        </div>
      </div>
    );
  }
}

export default MusicTable;
