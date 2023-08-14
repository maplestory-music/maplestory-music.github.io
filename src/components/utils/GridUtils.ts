import { CellClassParams, CellStyle } from 'ag-grid-community';
import { rgba, complement } from 'polished';
import { cornFlowerBlue } from '../../constants';
import { MapleClient } from '../../models/MapleClient';

export const ClientVersionCellStyle = (params: CellClassParams): CellStyle => {
  if (!params.value) return {};
  const color = rgba(cornFlowerBlue, 0.5);
  return {
    backgroundColor: params.value.startsWith(MapleClient.Korea)
      ? color
      : complement(color),
  };
};
