import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';

const MapIcon: React.FC<ICellRendererParams> = (props: ICellRendererParams) => {
  const path = `mark/${props.value}.png`;
  return (
    <span>
      <img src={path} alt='icon' />
    </span>
  );
};

export default MapIcon;
