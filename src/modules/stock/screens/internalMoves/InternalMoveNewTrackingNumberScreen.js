import React, {useEffect, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTrackingNumber} from '@/modules/stock/features/trackingNumberSlice';
import {Screen} from '@/components/atoms';
import {AutocompleteSearch} from '@/components/organisms';
import {ClearableCard} from '@/components/molecules';
import useFocusedScan from '@/modules/stock/hooks/use-focused-scan';
import useTrackingNumberScanner from '@/modules/stock/hooks/use-tracking-number-scanner';
import {filterItemByTrackingNumberSeq} from '@/modules/stock/utils/filters';

const trackingNumberScanKey = 'tracking-number_new-internal-move';

const InternalMoveNewTrackingNumberScreen = ({navigation, route}) => {
  useFocusedScan(trackingNumberScanKey);

  const {trackingNumberList} = useSelector(state => state.trackingNumber);
  const trackingNumberScanned = useTrackingNumberScanner(trackingNumberScanKey);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrackingNumber(route.params.stockProduct.id));
  }, [dispatch, route.params.stockProduct.id]);

  const handleClearOriginalLocation = () => {
    navigation.navigate('InternalMoveNewOriginalLocationScreen');
  };

  const handleClearDestinationLocation = () => {
    navigation.navigate('InternalMoveNewDestinationLocationScreen', {
      fromStockLocation: route.params.fromStockLocation,
    });
  };

  const handleClearProduct = () => {
    navigation.navigate('InternalMoveNewProductScreen', {
      fromStockLocation: route.params.fromStockLocation,
      toStockLocation: route.params.toStockLocation,
    });
  };

  const handleTrackingNumberSelection = useCallback(
    trackingNumber => {
      navigation.navigate('InternalMoveDetailsScreen', {
        fromStockLocation: route.params.fromStockLocation,
        toStockLocation: route.params.toStockLocation,
        stockProduct: route.params.stockProduct,
        trackingNumber: trackingNumber,
      });
    },
    [navigation],
  );

  useEffect(() => {
    if (trackingNumberScanned) {
      handleTrackingNumberSelection(trackingNumberScanned);
    }
  }, [handleTrackingNumberSelection, trackingNumberScanned]);

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
      <ClearableCard
        style={styles.infosCard}
        valueTxt={route.params.stockProduct.name}
        onClearPress={handleClearProduct}
      />
      <AutocompleteSearch
        objectList={trackingNumberList}
        scanKeySearch={trackingNumberScanKey}
        onChangeValue={item => handleTrackingNumberSelection(item)}
        filter={filterItemByTrackingNumberSeq}
        placeholder="Tracking number"
        displayValue={item => item.trackingNumberSeq}
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
