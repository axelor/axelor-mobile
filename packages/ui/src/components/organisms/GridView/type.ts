export interface Column {
  key: string;
  title: string;
  width?: number;
  sortable?: boolean;
  getValue?: (row: any) => any;
  renderCell?: (row: any) => React.ReactElement | null;
}

export const ROW_MIN_HEIGHT = 44;
