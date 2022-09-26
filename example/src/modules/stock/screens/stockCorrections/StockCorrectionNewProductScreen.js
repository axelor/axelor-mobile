import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {searchProducts} from '@/modules/stock/features/productSlice';
import {Screen} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';
import {ClearableCard} from '@/components/molecules';
import {displayItemName} from '@/modules/stock/utils/displayers';
import {AutocompleteSearch} from '@/components/organisms';

const productScanKey = 'product_stock-correction-new';

const StockCorrectionNewProductScreen = ({navigation, route}) => {
  const {productList} = useSelector(state => state.product);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const fetchProductsAPI = useCallback(
    filter => {
      dispatch(searchProducts({searchValue: filter}));
    },
    [dispatch],
  );

  const handleNavigate = useCallback(
    product => {
      if (product != null) {
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
      }
    },
    [navigation, route.params.stockLocation],
  );

  const handleClearLocation = () => {
    navigation.navigate('StockCorrectionNewLocationScreen');
  };

  return (
    <Screen>
      <ClearableCard
        valueTxt={route.params.stockLocation.name}
        onClearPress={handleClearLocation}
      />
      <AutocompleteSearch
        objectList={productList}
        onChangeValue={item => handleNavigate(item)}
        fetchData={fetchProductsAPI}
        displayValue={displayItemName}
        scanKeySearch={productScanKey}
        placeholder={I18n.t('Stock_Product')}
        isFocus={true}
        changeScreenAfter={true}
      />
    </Screen>
  );
};

export default StockCorrectionNewProductScreen;
