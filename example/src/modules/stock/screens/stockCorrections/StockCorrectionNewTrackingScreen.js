import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ClearableCard, Screen} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';
import {filterTrackingNumber} from '@/modules/stock/features/trackingNumberSlice';
import {displayItemTrackingNumber} from '@/modules/stock/utils/displayers';
import {AutocompleteSearch} from '@/components/organisms';

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
      <AutocompleteSearch
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
