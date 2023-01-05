import React, {useCallback} from 'react';
import {ClearableCard, Screen} from '@axelor/aos-mobile-ui';
import {
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {filterTrackingNumber} from '../../features/trackingNumberSlice';
import {displayItemTrackingNumber} from '../../utils/displayers';

const trackingNumberScanKey = 'tracking-number_stock-correction-new';

const StockCorrectionNewTrackingScreen = ({navigation, route}) => {
  const {trackingNumberList} = useSelector(state => state.trackingNumber);
  const product = route.params.product;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const fetchTrackingAPI = useCallback(
    filter => {
      dispatch(
        filterTrackingNumber({productId: product.id, searchValue: filter}),
      );
    },
    [dispatch, product.id],
  );

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

  const handleClearLocation = () => {
    navigation.navigate('StockCorrectionNewLocationScreen');
  };

  const handleClearProduct = () => {
    navigation.navigate('StockCorrectionNewProductScreen', {
      stockLocation: route.params.stockLocation,
    });
  };

  return (
    <Screen>
      <ClearableCard
        valueTxt={route.params.stockLocation.name}
        onClearPress={handleClearLocation}
      />
      <ClearableCard
        valueTxt={route.params.product.name}
        onClearPress={handleClearProduct}
      />
      <ScannerAutocompleteSearch
        objectList={trackingNumberList}
        onChangeValue={item => handleTrackingNumberSelection(item)}
        fetchData={fetchTrackingAPI}
        displayValue={displayItemTrackingNumber}
        scanKeySearch={trackingNumberScanKey}
        placeholder={I18n.t('Stock_TrackingNumber')}
        isFocus={true}
        changeScreenAfter={true}
      />
    </Screen>
  );
};

export default StockCorrectionNewTrackingScreen;
