/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Checkbox} from '../../molecules';
import {GridViewColumn} from '../GridView';

const CHECKBOX_COL_WIDTH = 44;

export function useGridSelection(
  columns: GridViewColumn[],
  data: any[],
  mode: 'simple' | 'checkbox' = 'simple',
  onSelectionChange?: (items: any[]) => void,
): GridViewColumn[] {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  useEffect(() => {
    onSelectionChange?.(selectedItems);
  }, [onSelectionChange, selectedItems]);

  const allSelected = useMemo(
    () =>
      data.length > 0 &&
      data.every(r => selectedItems.some(s => s.id === r.id)),
    [data, selectedItems],
  );

  const someSelected = useMemo(
    () => selectedItems.length > 0 && !allSelected,
    [allSelected, selectedItems.length],
  );

  const handleToggleItem = useCallback((row: any, checked: boolean) => {
    setSelectedItems(prev =>
      checked ? [...prev, row] : prev.filter(s => s.id !== row.id),
    );
  }, []);

  const handleToggleAll = useCallback(
    (checked: boolean) => {
      setSelectedItems(checked ? [...data] : []);
    },
    [data],
  );

  return useMemo<GridViewColumn[]>(() => {
    if (mode !== 'checkbox' || !Array.isArray(columns)) return columns ?? [];

    const checkboxColumn: GridViewColumn = {
      key: '__checkbox__',
      title: '',
      width: CHECKBOX_COL_WIDTH,
      sortable: false,
      renderHeader: () =>
        React.createElement(Checkbox, {
          iconSize: 18,
          isDefaultChecked: allSelected,
          isDefaultPartialChecked: someSelected,
          onChange: handleToggleAll,
        }),
      renderCell: (row: any) =>
        React.createElement(Checkbox, {
          iconSize: 18,
          isDefaultChecked: selectedItems.some((s: any) => s.id === row.id),
          onChange: (checked: boolean) => handleToggleItem(row, checked),
        }),
    };

    return [checkboxColumn, ...columns];
  }, [
    allSelected,
    columns,
    handleToggleAll,
    handleToggleItem,
    mode,
    selectedItems,
    someSelected,
  ]);
}
