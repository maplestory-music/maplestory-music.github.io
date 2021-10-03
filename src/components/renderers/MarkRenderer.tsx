import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';

export const MarkRenderer: React.FC<ICellRendererParams> = (params) => {
  return (
    <span>
      <img src={`mark/${params.value}.png`} alt="icon"></img>
    </span>
  );
};
