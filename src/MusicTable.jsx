/* eslint max-len: 0 */
import React from 'react';
import MarkComponent from './MarkComponent.jsx';

import { AgGridReact } from 'ag-grid-react';
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
          suppressResize: true,
          cellRendererFramework: MarkComponent
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
          field: 'source.structure'
        },
        {
          headerName: 'Date',
          field: 'source.date',
          sort: 'desc'
        }
      ],
      gridOptions: {
        enableColResize: true,
        enableFilter: true,
        enableSorting: true,
        animateRows: true,
        pagination: true,
        paginationPageSize: 25,
        suppressColumnVirtualisation: true,
        suppressMovableColumns: true,
        rowHeight: 45
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
      .then(rowData => this.setState({ rowData }))
  }

  onFirstDataRendered(params) {
    var allColumnIds = [];
    params.columnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    params.columnApi.autoSizeColumns(allColumnIds);
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
            Filter and sort operations can be performed on the properties shown below. Hover over a column header and press the menu
            icon to access the filter dialog. Mobile users can access the filter dialog by pressing and holding the column
            header.
          </p>
        </div>
        <div className="ag-theme-balham">
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            gridOptions={
              this.state.gridOptions
            }
            components={this.state.components}
            onFirstDataRendered={this.onFirstDataRendered.bind(this)}
            cellStyle={this.state.cellStyle}>
          </AgGridReact>
        </div>
      </div>
    );
  }
}

export default MusicTable;
