import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';

const MarkRenderer: React.FC<ICellRendererParams> = (props) => {
  const path = `mark/${props.value}.png`;
  return (
    <span>
      <img src={path} alt='icon' />
    </span>
  );
};

export default MarkRenderer;
