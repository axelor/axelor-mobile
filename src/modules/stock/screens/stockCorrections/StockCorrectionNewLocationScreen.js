import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Screen, Text} from '@/components/atoms';
import {SearchBar} from '@/components/molecules';

const StockCorrectionNewLocationScreen = () => {
  return (
    <Screen style={styles.container}>
      <SearchBar
        style={styles.searchBar}
        placeholder="Stock Location"
        onSearchPress={() => {}}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  searchBar: {
    marginHorizontal: 12,
    marginBottom: 8,
  },
});

export default StockCorrectionNewLocationScreen;
