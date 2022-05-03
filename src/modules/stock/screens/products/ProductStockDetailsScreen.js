import React, { useEffect, useState, useRef } from 'react';
import { CardStockInfo, Screen, Text } from '@/components/atoms';
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { ProductCard } from '../../components/molecules';
import { EditableInput, SearchBar } from '@/components/molecules';
import { useSelector, useDispatch } from 'react-redux';
import SelectOptions from '@/components/molecules/SelectOptions/SelectOptions';
import { fetchProducts } from '@/modules/stock/features/productSlice';
import CardStock from '@/components/molecules/Card/CardStock';

const ProductStockDetailsScreen = ({ route }) => {

  const { loading, productList } = useSelector(state => state.product);
  const dispatch = useDispatch();
  const options = ["axelor-maroc", "axelor-france"];
  const product = productList.filter(item => item.id === route.params.productId)[0];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  return (
    <Screen>
      {loading ? (<ActivityIndicator size="large" />) : (
        <View style={styles.container}>
          <ProductCard code={product.code} name={product.name} style={styles.item} />
          <View style={styles.lineStyle} />
          <SelectOptions style={[styles.item, { marginBottom: 18 }]} options={options} defaultValue="COMPANY" />
          <SearchBar style={styles.searchBar} placeholder="Stock location" onSearchPress={() => dispatch(fetchProducts())} />
          <EditableInput style={styles.searchBar} placeholder="Casier"></EditableInput>
          <View style={styles.row}>
            <CardStock title="REAL QUANTITY" number={1} />
            <CardStock title="FUTURE QUANTITY" number={1} />
            <CardStock title="ALLOCATED QUANTITY" number={1} />
            <CardStock title="SALE ORDER QUANTITY" number={1} />
            <CardStock title="PURCHASE ORDER QUANTITY" number={1} />
            <CardStock title="AVIALABLE STOCK" number={1} />
            <CardStock title="BUILDING QUANTITY" number={1} />
            <CardStock title="CONSUME MANUF QUANTITY" number={1} />
            <CardStock title="MISSING MANUF ORDER QUANTITY" number={1} />
          </View>
        </View>
      )}
    </Screen>
  );
};


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center'
  },
  searchBar: {
    marginHorizontal: 12,
    marginBottom: 18,
    backgroundColor: '#f3f7fc',
  },
  item: {
    marginHorizontal: 12,
    borderRadius: 0,
    elevation: 0,
  },
  lineStyle: {
    borderWidth: 0.5,
    width: 280,
    borderColor: 'black',
    margin: 10,
    marginBottom: 10
  },
  row: {
    flex: 1,
    marginVertical: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});

export default ProductStockDetailsScreen;
