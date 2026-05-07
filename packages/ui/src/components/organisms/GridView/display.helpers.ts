import {Dimensions} from 'react-native';
import {Column} from './type';

const COLUMN_DEFAULT_WIDTH = 70;

export const computeColumnWidth = (
  columns: Column[],
  transparent: boolean,
  containerWidth?: number,
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
  const base = containerWidth ?? Dimensions.get('window').width;
  const usableWidth = transparent ? base : base * 0.85;
  const width = (usableWidth - fixedTotal) / flexCount;
  return width < COLUMN_DEFAULT_WIDTH ? COLUMN_DEFAULT_WIDTH : width;
};

export const computeColumnScale = (
  columns: Column[],
  transparent: boolean,
  containerWidth: number,
): number => {
  const defaultWidth = computeColumnWidth(columns, transparent, containerWidth);
  const total = columns.reduce((sum, c) => sum + (c.width ?? defaultWidth), 0);
  return total > 0 && total < containerWidth ? containerWidth / total : 1;
};
