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
  const [page, setPage] = useState(0);
  const I18n = useTranslator();

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
