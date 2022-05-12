import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {Screen} from '@/components/atoms';
import {AutocompleteSearch} from '@/components/organisms';
import {filterItemByName} from '@/modules/stock/utils/filters';
import {displayItemName} from '@/modules/stock/utils/displayers';
import useStockLocationScanner from '@/modules/stock/hooks/use-stock-location-scanner';
import useFocusedScan from '@/modules/stock/hooks/use-focused-scan';

const stockLocationScanKey = 'stock-location_from_new-stock-correction';

const StockCorrectionNewLocationScreen = ({navigation, route}) => {
  useFocusedScan(stockLocationScanKey);

  const {stockLocationList} = useSelector(state => state.stockLocation);
  const stockLocationScanned = useStockLocationScanner(stockLocationScanKey);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStockLocations());
  }, [dispatch]);

  const handleNavigate = useCallback(
    location => {
      if (location == null) {
        return;
      }
      if (route.params?.product != null) {
        navigation.navigate('StockCorrectionNewProductScreen', {
          stockLocation: location,
          product: route.params.product,
        });
      } else {
        navigation.navigate('StockCorrectionNewProductScreen', {
          stockLocation: location,
        });
      }
    },
    [navigation, route.params?.product, stockLocationList],
  );

  useEffect(() => {
    if (stockLocationScanned) {
      handleNavigate(stockLocationScanned);
    }
  }, [handleNavigate, stockLocationScanned]);

  return (
    <Screen style={styles.container}>
      <AutocompleteSearch
        objectList={stockLocationList}
        placeholder="Stock Location"
        displayValue={displayItemName}
        onChangeValue={item => handleNavigate(item)}
        filter={filterItemByName}
        scanKeySearch={stockLocationScanKey}
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
