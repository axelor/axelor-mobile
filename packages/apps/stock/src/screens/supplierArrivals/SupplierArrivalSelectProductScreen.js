import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {HeaderContainer, PopUpOneButton, Screen} from '@axelor/aos-mobile-ui';
import {
  displayItemName,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {StockMoveHeader} from '../../components';
import {searchProducts} from '../../features/productSlice';
import StockMove from '../../types/stock-move';

const productScanKey = 'product_supplier-arrival-select';

const SupplierArrivalSelectProductScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const supplierArrival = route.params.supplierArrival;
  const supplierArrivalLine = route.params.supplierArrivalLine;
  const {productList} = useSelector(state => state.product);
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const fetchProductsAPI = useCallback(
    filter => {
      dispatch(searchProducts({searchValue: filter}));
    },
    [dispatch],
  );

  const handleProductSelection = item => {
    if (item !== null) {
      if (
        supplierArrivalLine != null &&
        item.id !== supplierArrivalLine?.product.id
      ) {
        setVisible(true);
      } else if (item.trackingNumberConfiguration != null) {
        navigation.navigate('SupplierArrivalSelectTrackingScreen', {
          supplierArrivalLine: supplierArrivalLine,
          supplierArrival: supplierArrival,
          product: item,
        });
      } else {
        navigation.navigate('SupplierArrivalLineDetailScreen', {
          supplierArrivalLine: supplierArrivalLine,
          supplierArrival: supplierArrival,
          product: item,
        });
      }
    }
  };

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={supplierArrival.stockMoveSeq}
            lineRef={supplierArrivalLine?.name}
            status={supplierArrival.statusSelect}
            date={
              supplierArrival.statusSelect === StockMove.status.Draft
                ? supplierArrival.createdOn
                : supplierArrival.statusSelect === StockMove.status.Planned
                ? supplierArrival.estimatedDate
                : supplierArrival.realDate
            }
          />
        }
      />
      <View style={styles.stockView}>
        <ScannerAutocompleteSearch
          objectList={productList}
          onChangeValue={item => handleProductSelection(item)}
          fetchData={fetchProductsAPI}
          displayValue={displayItemName}
          scanKeySearch={productScanKey}
          placeholder={I18n.t('Stock_Product')}
          isFocus={true}
          changeScreenAfter={true}
        />
      </View>
      <PopUpOneButton
        visible={isVisible}
        title={I18n.t('Auth_Warning')}
        data={I18n.t('Stock_ErrorProduct')}
        btnTitle={I18n.t('Auth_Close')}
        onPress={() => setVisible(false)}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  stockView: {
    marginTop: '2%',
  },
  text_secondary: {
    fontSize: 14,
  },
});

export default SupplierArrivalSelectProductScreen;
