import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Badge,
  PopUpOneButton,
  Screen,
  Text,
  useThemeColor,
} from '@aos-mobile/ui';
import {ScannerAutocompleteSearch, useTranslator} from '@aos-mobile/core';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {useDispatch, useSelector} from 'react-redux';
import {displayItemName} from '@/modules/stock/utils/displayers';
import {searchProducts} from '@/modules/stock/features/productSlice';
import StockMove from '../../types/stock-move';
import {StockMoveHeader} from '../../components/organisms';

const productScanKey = 'product_supplier-arrival-select';

const SupplierArrivalSelectProductScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
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
    <Screen>
      <StockMoveHeader
        reference={supplierArrival.stockMoveSeq}
        status={supplierArrival.statusSelect}
        date={
          supplierArrival.statusSelect === StockMove.status.Draft
            ? supplierArrival.createdOn
            : supplierArrival.statusSelect === StockMove.status.Planned
            ? supplierArrival.estimatedDate
            : supplierArrival.realDate
        }
      />
      <LocationsMoveCard
        fromStockLocation={supplierArrival.fromAddress?.fullName}
        toStockLocation={supplierArrival.toStockLocation?.name}
      />
      <View style={styles.stockView}>
        {supplierArrivalLine != null && (
          <View style={styles.stateLine}>
            <Text style={styles.text_secondary}>
              {supplierArrivalLine?.name}
            </Text>
            {parseFloat(supplierArrivalLine.qty) !==
              parseFloat(supplierArrivalLine.realQty) && (
              <Badge
                title={I18n.t('Stock_Status_Incomplete')}
                color={Colors.cautionColor_light}
              />
            )}
            {parseFloat(supplierArrivalLine.qty) ===
              parseFloat(supplierArrivalLine.realQty) && (
              <Badge
                title={I18n.t('Stock_Status_Complete')}
                color={Colors.primaryColor_light}
              />
            )}
          </View>
        )}
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
  stateLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 32,
    marginVertical: '1%',
  },
  stockView: {
    marginTop: '2%',
    marginBottom: '50%',
  },
  text_secondary: {
    fontSize: 14,
  },
});

export default SupplierArrivalSelectProductScreen;
