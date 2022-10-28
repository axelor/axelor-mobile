import React, {useCallback} from 'react';
import {Screen, ScrollView, HeaderContainer} from '@aos-mobile/ui';
import {
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@aos-mobile/core';
import {ManufacturingOrderHeader} from '@/modules/manufacturing/components/organisms';
import {displayItemName, searchProducts} from '@aos-mobile/app-stock';

const productScanKey = 'product_manufacturing-order-waste-product-select';

const WasteProductSelectProductScreen = ({route, navigation}) => {
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
      navigation.navigate('WasteProductDetailsScreen', {
        manufOrder: manufOrder,
        product: product,
      });
    }
  };

  return (
    <Screen removeSpaceOnTop={true}>
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

export default WasteProductSelectProductScreen;
