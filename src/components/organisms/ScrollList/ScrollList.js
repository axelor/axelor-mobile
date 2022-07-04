import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import {Text} from '@/components/atoms';

const SearchContainer = ({
  loadingList = false,
  data = [],
  renderItem = () => {},
  fetchData = () => {},
  moreLoading = false,
  isListEnd = false,
  filter = false,
}) => {
  const [page, setPage] = useState(0);

  const handleMoreData = () => {
    if (!isListEnd && !moreLoading && !filter) {
      setPage(page + 1);
    }
  };

  const updateData = useCallback(() => {
    fetchData(page);
  }, [fetchData, page]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  if (loadingList) {
    return <ActivityIndicator size="large" color="black" />;
  }

  return (
    <FlatList
      data={data}
      onRefresh={() => setPage(0)}
      refreshing={loadingList}
      onEndReached={handleMoreData}
      ListFooterComponent={() => {
        return (
          <View style={styles.footerText}>
            {moreLoading && <ActivityIndicator size="large" color="black" />}
            {isListEnd && <Text>No more items.</Text>}
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
  },
});

export default SearchContainer;
