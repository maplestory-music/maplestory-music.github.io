/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import LinkComponent from './LinkComponent';

const products = [];
var data = require('./bgm.json');

function parseJSON() {
  for (let i = 0; i < data.length; i++) {
    let obj = data[i];
    let source = obj.source;
    let metadata = obj.metadata;
    let version = "";
    if (source.client && source.version) {
      version = source.client + " " + source.version
    }
    products.push({
      title: metadata.title,
      filename: obj.filename,
      description: obj.description,
      icon: obj.icon,
      structure: source.structure,
      youtube: obj.youtube,
      mark: obj.mark,
      version: version
    });
  }
}

function linkFormatter(cell, row) {
  return (
    <LinkComponent youtube={row.youtube} title={row.title} />
  );
}

function imageFormatter(cell, row) {
  return (
    <img src={'mark/' + row.mark + '.png'} alt='icon' />
  )
}

function markSort(a, b, order) {
  var textA = a.mark.toLowerCase();
  var textB = b.mark.toLowerCase();
  if (order === 'asc') {
    if (textA < textB) return -1;
    if (textA > textB) return 1;
    return 0;
  }
  else {
    if (textA > textB) return -1;
    if (textA < textB) return 1;
    return 0;
  }
}

parseJSON();

class MyTable extends React.Component {

  render() {
    const options = {
      // Pagination
      sizePerPage: 25,
      hideSizePerPage: true,
      // Search
      clearSearch: true,
      // Sort
      sortIndicator: false
    };
    return (
      <div>
        <BootstrapTable
          data={products}
          striped
          hover
          pagination={true}
          options={options}
          search={true}>

          <TableHeaderColumn dataField='mark' width='60' dataAlign='center' dataFormat={imageFormatter} dataSort={true} sortFunc={markSort}>Mark</TableHeaderColumn>
          <TableHeaderColumn dataField='title' width='350' isKey={true} dataSort={true} dataFormat={linkFormatter}>Title</TableHeaderColumn>
          <TableHeaderColumn dataField='filename' width='200' dataSort={true}>Filename</TableHeaderColumn>
          <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
          <TableHeaderColumn dataField='structure' width='140'>Structure</TableHeaderColumn>

        </BootstrapTable>
      </div>
    );
  }
}

export default MyTable;
