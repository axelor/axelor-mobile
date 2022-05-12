import React, {useEffect, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '@/modules/stock/features/productSlice';
import {Screen} from '@/components/atoms';
import {ClearableCard} from '@/components/molecules';
import useFocusedScan from '@/modules/stock/hooks/use-focused-scan';
import useProductScanner from '@/modules/stock/hooks/use-product-scanner';
import {filterItemByName} from '@/modules/stock/utils/filters';
import {displayItemName} from '@/modules/stock/utils/displayers';
import {AutocompleteSearch} from '@/components/organisms';

const productScanKey = 'product_stock-correction-new';

const StockCorrectionNewProductScreen = ({navigation, route}) => {
  useFocusedScan(productScanKey);

  const {productList} = useSelector(state => state.product);
  const dispatch = useDispatch();
  const productScanned = useProductScanner(productScanKey);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleNavigate = useCallback(
    product => {
      if (product.trackingNumberConfiguration == null) {
        navigation.navigate('StockCorrectionDetailsScreen', {
          stockLocation: route.params.stockLocation,
          stockProduct: product,
        });
      } else {
        navigation.navigate('StockCorrectionNewTrackingScreen', {
          stockLocation: route.params.stockLocation,
          product: product,
        });
      }
    },
    [navigation, route.params.stockLocation],
  );

  useEffect(() => {
    if (productScanned) {
      handleNavigate(productScanned);
    }
  }, [handleNavigate, productScanned]);

  const handleClearLocation = () => {
    navigation.navigate('StockCorrectionNewLocationScreen');
  };

  return (
    <Screen style={styles.container}>
      <ClearableCard
        style={styles.infosCard}
        valueTxt={route.params.stockLocation.name}
        onClearPress={handleClearLocation}
      />
      <AutocompleteSearch
        objectList={productList}
        scanKeySearch={productScanKey}
        filter={filterItemByName}
        displayValue={displayItemName}
        onChangeValue={item => handleNavigate(item)}
        placeholder="Product"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
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

export default StockCorrectionNewProductScreen;
