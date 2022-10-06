import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Screen, ScrollView, HeaderContainer} from '@aos-mobile/ui';
import {ScannerAutocompleteSearch, useTranslator} from '@aos-mobile/core';
import {ManufacturingOrderHeader} from '@/modules/manufacturing/components/organisms';
import {searchProducts} from '@/modules/stock/features/productSlice';
import {displayItemName} from '@/modules/stock/utils/displayers';

const productScanKey = 'product_manufacturing-order-consumed-product-select';

const ConsumedProductSelectProductScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const manufOrder = route.params.manufOrder;
  const {productList} = useSelector(state => state.product);
  const dispatch = useDispatch();

  const fetchProductsAPI = useCallback(
    filter => {
      dispatch(searchProducts({searchValue: filter}));
    },
    [dispatch],
  );

  const handleSelectProduct = product => {
    if (product != null) {
      if (product.trackingNumberConfiguration == null) {
        navigation.navigate('ConsumedProductDetailsScreen', {
          manufOrder: manufOrder,
          product: product,
        });
      } else {
        navigation.navigate('ConsumedProductSelectTrackingScreen', {
          manufOrder: manufOrder,
          product: product,
        });
      }
    }
  };

  return (
    <Screen listScreen={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <ManufacturingOrderHeader
            parentMO={manufOrder.parentMO}
            reference={manufOrder.manufOrderSeq}
            status={manufOrder.statusSelect}
            priority={manufOrder.prioritySelect}
          />
        }
      />
      <ScrollView>
        <ScannerAutocompleteSearch
          objectList={productList}
          onChangeValue={handleSelectProduct}
          fetchData={fetchProductsAPI}
          displayValue={displayItemName}
          placeholder={I18n.t('Manufacturing_Product')}
          scanKeySearch={productScanKey}
          isFocus={true}
          changeScreenAfter={true}
        />
      </ScrollView>
    </Screen>
  );
};

export default ConsumedProductSelectProductScreen;
