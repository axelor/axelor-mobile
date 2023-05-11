/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
}: ScrollListProps) => {
  const [page, setPage] = useState(0);

  const updateData = useCallback(() => {
    setPage(0);
    fetchData(0);
  }, [fetchData]);

  const initialize = useCallback(() => {
    updateData();
  }, [updateData]);

  const handleMoreData = useCallback(
    currentPage => {
      if (!isListEnd && !moreLoading && !filter) {
        setPage(currentPage + 1);
        fetchData(currentPage + 1);
      }
    },
    [fetchData, filter, isListEnd, moreLoading],
  );

  useEffect(() => {
    initialize();
  }, [initialize]);

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
      onRefresh={updateData}
      refreshing={loadingList}
      horizontal={horizontal}
      onEndReached={() => handleMoreData(page)}
      ListFooterComponent={() => {
        return (
          <View style={styles.footerText}>
            {moreLoading && <ActivityIndicator size="large" color="black" />}
            {data == null || data?.length === 0 ? (
              <Text>
                {translator != null ? translator('Base_NoData') : 'No data.'}
              </Text>
            ) : (
              isListEnd && (
                <Text>
                  {translator != null
                    ? translator('Base_NoMoreItems')
                    : 'No more items.'}
                </Text>
              )
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
