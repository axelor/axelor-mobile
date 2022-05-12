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

const originalStockLocationScanKey =
  'original-stock-location_from_new-internal-move';

const InternalMoveNewOriginalLocationScreen = ({navigation, route}) => {
  useFocusedScan(originalStockLocationScanKey);

  const {stockLocationList} = useSelector(state => state.stockLocation);
  const stockLocationScanned = useStockLocationScanner(
    originalStockLocationScanKey,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStockLocations());
  }, [dispatch]);

  const handleNavigate = useCallback(
    location => {
      if (location == null) {
        return;
      }
      navigation.navigate('InternalMoveNewDestinationLocationScreen', {
        fromStockLocation: location,
      });
    },
    [navigation],
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
        placeholder="Original Stock Location"
        displayValue={displayItemName}
        onChangeValue={item => handleNavigate(item)}
        filter={filterItemByName}
        scanKeySearch={originalStockLocationScanKey}
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

export default InternalMoveNewOriginalLocationScreen;
