import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  Picker,
  Screen,
  ScrollView,
  HeaderContainer,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  fetchProductWithId,
  fetchUnit,
  ProductCardInfo,
  QuantityCard,
} from '@axelor/aos-mobile-stock';
import {ManufacturingOrderHeader} from '../../../components/organisms';
import {ManufacturingOrder} from '../../../types';
import {
  addWasteProductToManufOrder,
  updateWasteProductOfManufOrder,
} from '../../../features/wasteProductsSlice';

const WasteProductDetailsScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const manufOrder = route.params.manufOrder;
  const wasteProduct = route.params.wasteProduct;
  const {loadingProductFromId, productFromId} = useSelector(
    state => state.product,
  );
  const product = wasteProduct ? productFromId : route.params.product;
  const {unitList} = useSelector(state => state.unit);
  const [unit, setUnit] = useState(wasteProduct ? wasteProduct?.unit : null);
  const [wasteQty, setWasteQty] = useState(wasteProduct ? wasteProduct.qty : 0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUnit());
    if (wasteProduct != null) {
      dispatch(fetchProductWithId(wasteProduct?.product?.id));
    }
  }, [wasteProduct, dispatch]);

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  };

  const handleNavigateBackToList = useCallback(() => {
    navigation.navigate('WasteProductListScreen', {
      manufOrder: manufOrder,
    });
  }, [manufOrder, navigation]);

  const handleCreateWasteProduct = useCallback(() => {
    dispatch(
      addWasteProductToManufOrder({
        manufOrderVersion: manufOrder.version,
        manufOrderId: manufOrder.id,
        productId: product.id,
        qty: wasteQty,
      }),
    );
    handleNavigateBackToList();
  }, [dispatch, handleNavigateBackToList, manufOrder, product, wasteQty]);

  const handleUpdateWasteProduct = useCallback(() => {
    dispatch(
      updateWasteProductOfManufOrder({
        manufOrderId: manufOrder?.id,
        page: 0,
        prodProductVersion: wasteProduct.version,
        prodProductId: wasteProduct.id,
        qty: wasteQty,
      }),
    );
    handleNavigateBackToList();
  }, [dispatch, handleNavigateBackToList, manufOrder, wasteProduct, wasteQty]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        manufOrder?.statusSelect === ManufacturingOrder.status.InProgress &&
        manufOrder?.wasteStockMove == null &&
        (wasteProduct ? (
          <Button
            title={I18n.t('Base_Save')}
            onPress={handleUpdateWasteProduct}
          />
        ) : (
          <Button
            title={I18n.t('Base_Save')}
            onPress={handleCreateWasteProduct}
          />
        ))
      }>
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
        {(product || !loadingProductFromId) && (
          <ProductCardInfo
            name={product.name}
            code={product.code}
            picture={product.picture}
            onPress={handleShowProduct}
          />
        )}
        <QuantityCard
          labelQty={I18n.t('Manufacturing_WasteQty')}
          defaultValue={parseFloat(wasteQty).toFixed(2).toString()}
          editable={
            manufOrder?.statusSelect === ManufacturingOrder.status.InProgress &&
            manufOrder?.wasteStockMove == null
          }
          onValueChange={setWasteQty}
        />
        <Picker
          style={styles.picker}
          styleTxt={unit?.id === null ? styles.picker_empty : null}
          title={I18n.t('Stock_Unit')}
          onValueChange={setUnit}
          defaultValue={unit?.id}
          listItems={unitList}
          labelField="name"
          valueField="id"
          disabled={
            manufOrder.statusSelect >= ManufacturingOrder.status.Finished
          }
          disabledValue={unit?.name}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  infosCard: {
    marginHorizontal: 12,
    marginBottom: '2%',
  },
  reasonTitle: {
    marginHorizontal: 20,
  },
  picker: {
    marginHorizontal: 12,
    marginBottom: '2%',
  },
  picker_empty: {
    color: 'red',
  },
});

export default WasteProductDetailsScreen;
