import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import {Text} from '@/components/atoms';
import useTranslator from '@/hooks/use-translator';

const SearchContainer = ({
  loadingList = false,
  data = [],
  renderItem = () => {},
  fetchData = () => {},
  moreLoading = false,
  isListEnd = false,
  filter = false,
}) => {
  const [page, setPage] = useState();
  const I18n = useTranslator();

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

  const updateData = useCallback(() => {
    setPage(0);
    fetchData(0);
  }, [fetchData]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (loadingList) {
    return <ActivityIndicator size="large" color="black" />;
  }

  return (
    <FlatList
      data={data}
      onRefresh={updateData}
      refreshing={loadingList}
      onEndReached={() => handleMoreData(page)}
      ListFooterComponent={() => {
        return (
          <View style={styles.footerText}>
            {moreLoading && <ActivityIndicator size="large" color="black" />}
            {isListEnd && <Text>{I18n.t('Base_NoMoreItems')}</Text>}
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
