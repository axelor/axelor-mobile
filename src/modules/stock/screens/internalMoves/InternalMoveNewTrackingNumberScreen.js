import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '@/modules/stock/features/productSlice';
import {Screen} from '@/components/atoms';
import {AutocompleteSearch} from '@/components/organisms';
import {ClearableCard} from '@/components/molecules';
import getFromList from '@/modules/stock/utils/get-from-list';
import useScanner, {castIntent} from '@/modules/stock/utils/use-scanner';

const InternalMoveNewTrackingNumberScreen = ({navigation, route}) => {
  const {productList} = useSelector(state => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, route]);

  const handleClearOriginalLocation = () => {
    navigation.navigate('InternalMoveNewOriginalLocationScreen');
  };

  const handleClearDestinationLocation = () => {
    navigation.navigate('InternalMoveNewDestinationLocationScreen', {
      fromStockLocation: route.params.fromStockLocation,
    });
  };

  const handleProductSelection = productId => {
    if (productId !== '') {
      const product = getFromList(productList, 'id', productId);
      handleNavigate(product);
    }
  };

  const handleProductScan = intent => {
    console.log('Yes');
    const serialNumber = castIntent(intent).value;
    console.log(serialNumber);
    console.log(productList);
    if (serialNumber !== '') {
      const product = getFromList(productList, 'serialNumber', serialNumber);
      console.log(product);
      handleNavigate(product);
    }
  };

  const handleNavigate = product => {
    if (product.trackingNumberConfiguration == null) {
      navigation.navigate('StockCorrectionDetailsScreen', {
        fromStockLocation: route.params.fromStockLocation,
        toStockLocation: route.params.toStockLocation,
        stockProduct: product,
      });
    } else {
      navigation.navigate('StockCorrectionNewTrackingScreen', {
        fromStockLocation: route.params.fromStockLocation,
        toStockLocation: route.params.toStockLocation,
        stockProduct: product,
      });
    }
  };

  //useScanner(handleProductScan);

  return (
    <Screen style={styles.container}>
      <ClearableCard
        style={styles.infosCard}
        valueTxt={route.params.fromStockLocation.name}
        onClearPress={handleClearOriginalLocation}
      />
      <ClearableCard
        style={styles.infosCard}
        valueTxt={route.params.toStockLocation.name}
        onClearPress={handleClearDestinationLocation}
      />
      <AutocompleteSearch
        objectList={productList}
        searchName="Product"
        searchParam="name"
        setValueSearch={handleProductSelection}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  infosCard: {
    marginHorizontal: 12,
    marginBottom: 8,
  },
  searchBar: {
    marginHorizontal: 12,
    marginBottom: 8,
  },
});

export default InternalMoveNewTrackingNumberScreen;
