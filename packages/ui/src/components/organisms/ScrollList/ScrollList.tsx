import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import {Text} from '../../atoms';

interface ScrollListProps {
  loadingList: boolean;
  data: any[];
  renderItem: (item: any) => any;
  fetchData: (fetchOptions: any) => any[];
  moreLoading: boolean;
  isListEnd: boolean;
  filter: boolean;
  translator?: (translationKey: string) => string;
}

const ScrollList = ({
  loadingList = false,
  data = [],
  renderItem,
  fetchData = () => [],
  moreLoading = false,
  isListEnd = false,
  filter = false,
  translator,
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
    return <ActivityIndicator size="large" color="black" />;
  }

  return (
    <FlatList
      style={styles.scrollView}
      data={data}
      onRefresh={updateData}
      refreshing={loadingList}
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
  footerText: {
    alignSelf: 'center',
    marginBottom: 7,
  },
  scrollView: {
    paddingTop: 7,
  },
});

export default ScrollList;
