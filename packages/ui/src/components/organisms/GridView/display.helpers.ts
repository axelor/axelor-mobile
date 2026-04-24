import {Dimensions} from 'react-native';
import {Column} from './type';

const COLUMN_DEFAULT_WIDTH = 70;

export const computeColumnWidth = (
  columns: Column[],
  transparent: boolean,
): number => {
  if (!Array.isArray(columns) || columns.length === 0) {
    return COLUMN_DEFAULT_WIDTH;
  }
  const fixedTotal = columns.reduce(
    (sum, c) => sum + (c.width != null ? c.width : 0),
    0,
  );
  const flexCount = columns.filter(c => c.width == null).length;
  if (flexCount === 0) return COLUMN_DEFAULT_WIDTH;
  const usableWidth = transparent
    ? Dimensions.get('window').width
    : Dimensions.get('window').width * 0.85;
  const width = (usableWidth - fixedTotal) / flexCount;
  return width < COLUMN_DEFAULT_WIDTH ? COLUMN_DEFAULT_WIDTH : width;
};
