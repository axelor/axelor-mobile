import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTrackingNumber} from '@/modules/stock/features/trackingNumberSlice';
import {Screen} from '@/components/atoms';
import {AutocompleteSearch} from '@/components/organisms';
import {ClearableCard} from '@/components/molecules';
import useFocusedScan from '@/modules/stock/hooks/use-focused-scan';
import useTrackingNumberScanner from '@/modules/stock/hooks/use-tracking-number-scanner';
import {filterItemByTrackingNumberSeq} from '@/modules/stock/utils/filters';

const trackingNumberScanKey = 'tracking-number_stock-correction-new';

const StockCorrectionNewTrackingScreen = ({navigation, route}) => {
  useFocusedScan(trackingNumberScanKey);

  const {trackingNumberList} = useSelector(state => state.trackingNumber);
  const trackingNumberScanned = useTrackingNumberScanner(trackingNumberScanKey);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrackingNumber(route.params.product.id));
  }, [dispatch, route.params.product.id]);

  const handleTrackingNumberSelection = useCallback(
    trackingNumber => {
      navigation.navigate('StockCorrectionDetailsScreen', {
        stockLocation: route.params.stockLocation,
        stockProduct: route.params.product,
        trackingNumber: trackingNumber,
      });
    },
    [navigation, route.params.product, route.params.stockLocation],
  );

  useEffect(() => {
    if (trackingNumberScanned) {
      handleTrackingNumberSelection(trackingNumberScanned);
    }
  }, [handleTrackingNumberSelection, trackingNumberScanned]);

  const handleClearLocation = () => {
    navigation.navigate('StockCorrectionNewLocationScreen', {
      product: route.params.product,
    });
  };

  const handleClearProduct = () => {
    navigation.navigate('StockCorrectionNewProductScreen', {
      stockLocation: route.params.stockLocation,
    });
  };

  return (
    <Screen style={styles.container}>
      <ClearableCard
        style={styles.infosCard}
        valueTxt={route.params.stockLocation.name}
        onClearPress={handleClearLocation}
      />
      <ClearableCard
        style={styles.infosCard}
        valueTxt={route.params.product.name}
        onClearPress={handleClearProduct}
      />
      <AutocompleteSearch
        objectList={trackingNumberList}
        scanKey={trackingNumberScanKey}
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

export default StockCorrectionNewTrackingScreen;
