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

import React, {useCallback, useEffect} from 'react';
import {GridViewColumn, ScrollGridView} from '@axelor/aos-mobile-ui';
import {useDispatch} from '../../../redux/hooks';
import {useIsFocused} from '../../../hooks';
import {useTranslator} from '../../../i18n';

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
}: GridListViewProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const fetchListAPI = useCallback(
    (page = 0) => {
      dispatch(sliceFunction({...(sliceFunctionData ?? {}), page}));
    },
    [dispatch, sliceFunction, sliceFunctionData],
  );

  useEffect(() => {
    if (isFocused) {
      fetchListAPI(0);
    }
  }, [fetchListAPI, isFocused]);

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
    />
  );
};

export default GridListView;
