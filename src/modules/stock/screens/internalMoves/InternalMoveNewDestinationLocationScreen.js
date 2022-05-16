import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchStockLocations} from '@/modules/stock/features/stockLocationSlice';
import {Screen} from '@/components/atoms';
import {AutocompleteSearch} from '@/components/organisms';
import {ClearableCard} from '@/components/molecules';
import {filterItemByName} from '@/modules/stock/utils/filters';
import {displayItemName} from '@/modules/stock/utils/displayers';
import useStockLocationScanner from '@/modules/stock/hooks/use-stock-location-scanner';
import useFocusedScan from '@/modules/stock/hooks/use-focused-scan';

const destinationStockLocationScanKey =
  'destination-stock-location_from_new-internal-move';

const InternalMoveNewDestinationLocationScreen = ({navigation, route}) => {
  useFocusedScan(destinationStockLocationScanKey);

  const {stockLocationList} = useSelector(state => state.stockLocation);
  const stockLocationScanned = useStockLocationScanner(
    destinationStockLocationScanKey,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStockLocations());
  }, [dispatch]);

  const handleClearLocation = () => {
    navigation.navigate('InternalMoveNewOriginalLocationScreen');
  };

  const handleNavigate = useCallback(
    location => {
      if (location == null) {
        return;
      }
      navigation.navigate('InternalMoveNewProductScreen', {
        fromStockLocation: route.params.fromStockLocation,
        toStockLocation: location,
      });
    },
    [navigation, route.params.fromStockLocation],
  );

  useEffect(() => {
    if (stockLocationScanned) {
      handleNavigate(stockLocationScanned);
    }
  }, [handleNavigate, stockLocationScanned]);

  return (
    <Screen style={styles.container}>
      <ClearableCard
        style={styles.infosCard}
        valueTxt={route.params.fromStockLocation.name}
        onClearPress={handleClearLocation}
      />
      <AutocompleteSearch
        objectList={stockLocationList}
        placeholder="Destination Stock Location"
        displayValue={displayItemName}
        onChangeValue={item => handleNavigate(item)}
        filter={filterItemByName}
        scanKeySearch={destinationStockLocationScanKey}
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

export default InternalMoveNewDestinationLocationScreen;
