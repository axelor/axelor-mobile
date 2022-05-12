import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '@/modules/stock/features/productSlice';
import {Screen} from '@/components/atoms';
import {AutocompleteSearch} from '@/components/organisms';
import {ClearableCard} from '@/components/molecules';
import useFocusedScan from '@/modules/stock/hooks/use-focused-scan';
import useProductScanner from '@/modules/stock/hooks/use-product-scanner';
import {filterItemByName} from '@/modules/stock/utils/filters';
import {displayItemName} from '@/modules/stock/utils/displayers';

const productScanKey = 'product_new-internal-move';

const InternalMoveNewProductScreen = ({navigation, route}) => {
  useFocusedScan(productScanKey);

  const {productList} = useSelector(state => state.product);
  const productScanned = useProductScanner(productScanKey);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleClearOriginalLocation = () => {
    navigation.navigate('InternalMoveNewOriginalLocationScreen');
  };

  const handleClearDestinationLocation = () => {
    navigation.navigate('InternalMoveNewDestinationLocationScreen', {
      fromStockLocation: route.params.fromStockLocation,
    });
  };

  const handleNavigate = useCallback(
    product => {
      if (product.trackingNumberConfiguration == null) {
        navigation.navigate('InternalMoveDetailsScreen', {
          fromStockLocation: route.params.fromStockLocation,
          toStockLocation: route.params.toStockLocation,
          stockProduct: product,
        });
      } else {
        navigation.navigate('InternalMoveNewTrackingNumberScreen', {
          fromStockLocation: route.params.fromStockLocation,
          toStockLocation: route.params.toStockLocation,
          stockProduct: product,
        });
      }
    },
    [navigation],
  );

  useEffect(() => {
    if (productScanned) {
      handleNavigate(productScanned);
    }
  }, [handleNavigate, productScanned]);

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

export default InternalMoveNewProductScreen;
