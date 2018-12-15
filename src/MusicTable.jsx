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
        { headerName: "", field: "mark", width: 70, minWidth: 50, suppressSizeToFit: true, cellRendererFramework: MarkComponent },
        { headerName: "Folder", field: "source.structure" },
        { headerName: "Title", field: "metadata.title", cellRenderer: "linkRenderer" },
        { headerName: "Description", field: "description" },
        { headerName: "Date", field: "source.date" }
      ],
      gridOptions: {
        enableColResize: true,
        enableFilter: true,
        enableSorting: true,
        animateRows: true,
        pagination: true,
        paginationPageSize: 25,
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
