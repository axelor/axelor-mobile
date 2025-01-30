/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import {Text} from '../../atoms';

interface ScrollListProps {
  style?: any;
  loadingList: boolean;
  data: any[];
  renderItem: (item: any) => any;
  fetchData: (fetchOptions?: any) => any[] | void;
  moreLoading: boolean;
  isListEnd: boolean;
  filter: boolean;
  translator?: (translationKey: string) => string;
  horizontal?: boolean;
  disabledRefresh?: boolean;
}

const ScrollList = ({
  style,
  loadingList = false,
  data = [],
  renderItem,
  fetchData = () => [],
  moreLoading = false,
  isListEnd = false,
  filter = false,
  translator,
  horizontal = false,
  disabledRefresh = false,
}: ScrollListProps) => {
  const [, setPage] = useState(0);

  const updateData = useCallback(() => {
    setPage(0);
    fetchData(0);
  }, [fetchData]);

  const initialize = useCallback(() => {
    updateData();
  }, [updateData]);

  const handleMoreData = useCallback(() => {
    if (!isListEnd && !moreLoading && !filter) {
      setPage(_currentPage => {
        const newPage = _currentPage + 1;
        fetchData(newPage);

        return newPage;
      });
    }
  }, [fetchData, filter, isListEnd, moreLoading]);

  const onEndReached = useCallback(() => {
    handleMoreData();
  }, [handleMoreData]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (Array.isArray(data) && data?.length === 0) {
      handleMoreData();
    }
  }, [data, handleMoreData]);

  useEffect(() => {
    if (loadingList && !moreLoading) {
      setPage(_currentPage => {
        if (_currentPage > 0) {
          return 0;
        }

        return _currentPage;
      });
    }
  }, [loadingList, moreLoading]);

  if (loadingList) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <FlatList
      style={[styles.scrollView, style]}
      data={data}
      onRefresh={disabledRefresh ? null : updateData}
      refreshing={loadingList}
      horizontal={horizontal}
      onEndReached={onEndReached}
      ListFooterComponent={() => {
        return (
          <View style={styles.footerText}>
            {moreLoading && <ActivityIndicator size="large" color="black" />}
            {isListEnd && (
              <Text>
                {data == null || data?.length === 0
                  ? translator != null
                    ? translator('Base_NoData')
                    : 'No data.'
                  : translator != null
                  ? translator('Base_NoMoreItems')
                  : 'No more items.'}
              </Text>
            )}
          </View>
        );
      }}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
  },
  footerText: {
    alignSelf: 'center',
    marginBottom: 7,
  },
  scrollView: {
    paddingTop: 7,
  },
});

export default ScrollList;
