import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Screen, Text} from '@/components/atoms';
import {Badge} from '@/components/molecules';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {useDispatch, useSelector} from 'react-redux';
import {AutocompleteSearch, PopUpOneButton} from '@/components/organisms';
import {displayItemName} from '@/modules/stock/utils/displayers';
import {searchProducts} from '@/modules/stock/features/productSlice';
import StockMove from '../../types/stock-move';
import {ColorHook} from '@/themeStore';
import {StockMoveHeader} from '../../components/organisms';

const productScanKey = 'product_supplier-arrival-select';

const SupplierArrivalSelectProductScreen = ({route, navigation}) => {
  const Colors = ColorHook();
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
              <Badge title="Incomplete" color={Colors.cautionColor_light} />
            )}
            {parseFloat(supplierArrivalLine.qty) ===
              parseFloat(supplierArrivalLine.realQty) && (
              <Badge title="Complete" color={Colors.primaryColor_light} />
            )}
          </View>
        )}
        <AutocompleteSearch
          objectList={productList}
          onChangeValue={item => handleProductSelection(item)}
          fetchData={fetchProductsAPI}
          displayValue={displayItemName}
          scanKeySearch={productScanKey}
          placeholder="Product"
          isFocus={true}
          changeScreenAfter={true}
        />
      </View>
      <PopUpOneButton
        visible={isVisible}
        title="Warning"
        data="This is not the right product."
        btnTitle="OK"
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
