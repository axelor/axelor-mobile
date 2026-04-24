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

import React, {useCallback, useEffect, useState} from 'react';
import {GridViewColumn, ScrollGridView} from '@axelor/aos-mobile-ui';
import {useDispatch} from '../../../redux/hooks';
import {useIsFocused} from '../../../hooks';
import {useTranslator} from '../../../i18n';

type SortConfig = {field: string; order: 'asc' | 'desc'} | undefined;

interface GridListViewProps {
  style?: any;
  columns: GridViewColumn[];
  list: any[];
  loading: boolean;
  moreLoading: boolean;
  isListEnd: boolean;
  sliceFunction: any;
  sliceFunctionData?: Object;
  onRowPress?: (row: any) => void;
  sortable?: boolean;
  defaultSort?: SortConfig;
  stickyHeader?: boolean;
}

const GridListView = ({
  style,
  columns,
  list,
  loading,
  moreLoading,
  isListEnd,
  sliceFunction,
  sliceFunctionData,
  onRowPress,
  sortable = false,
  defaultSort,
  stickyHeader = false,
}: GridListViewProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [sortState, setSortState] = useState<SortConfig>(defaultSort);

  const fetchListAPI = useCallback(
    (page = 0) => {
      dispatch(
        sliceFunction({
          ...(sliceFunctionData ?? {}),
          page,
          sortFields: sortState
            ? [`${sortState.order === 'desc' ? '-' : ''}${sortState.field}`]
            : [],
        }),
      );
    },
    [dispatch, sliceFunction, sliceFunctionData, sortState],
  );

  useEffect(() => {
    if (isFocused) {
      fetchListAPI(0);
    }
  }, [fetchListAPI, isFocused]);

  const handleSortChange = useCallback((field: string) => {
    setSortState(prev => {
      if (prev?.field !== field) return {field, order: 'asc'};
      if (prev.order === 'asc') return {field, order: 'desc'};
      return undefined;
    });
  }, []);

  return (
    <ScrollGridView
      style={style}
      loadingList={loading}
      columns={columns}
      data={list}
      fetchData={fetchListAPI}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      translator={I18n.t}
      onRowPress={onRowPress}
      sortable={sortable}
      sortField={sortState?.field}
      sortOrder={sortState?.order}
      onSortChange={handleSortChange}
      stickyHeader={stickyHeader}
    />
  );
};

export default GridListView;
