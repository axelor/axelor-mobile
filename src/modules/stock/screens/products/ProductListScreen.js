import React from 'react';
import {Screen} from '@/components/atoms';
import {SearchBar} from '@/components/molecules';
import {StyleSheet} from 'react-native';

const ProductListScreen = () => {
  return (
    <Screen style={styles.container}>
      <SearchBar placeholder="Product" />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    marginHorizontal: 12,
  },
});

export default ProductListScreen;
