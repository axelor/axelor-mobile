import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Screen,
  ScrollView,
  HeaderContainer,
  Text,
} from '@aos-mobile/ui';
import {useDispatch, useSelector, useTranslator} from '@aos-mobile/core';
import {
  fetchProductWithId,
  QuantityCard,
  ProductCardInfo,
} from '@aos-mobile/app-stock';
import {ManufacturingOrderHeader} from '../../../components/organisms';
import {
  addProdProductToManufOrder,
  updateProdProductOfManufOrder,
} from '../../../features/prodProductSlice';
import {ManufacturingOrder} from '../../../types';

const ConsumedProductDetailsScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const manufOrder = route.params.manufOrder;
  const consumedProduct = route.params.consumedProduct;
  const {loadingProductFromId, productFromId} = useSelector(
    state => state.product,
  );
  const product = consumedProduct ? productFromId : route.params.product;
  const trackingNumber = route.params.trackingNumber;
  const [consumedQty, setConsumedQty] = useState(
    consumedProduct ? consumedProduct.realQty : 0,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (consumedProduct != null) {
      dispatch(fetchProductWithId(consumedProduct.productId));
    }
  }, [consumedProduct, dispatch]);

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  };

  const handleNavigateBackToList = useCallback(() => {
    navigation.navigate('ConsumedProductListScreen', {
      manufOrder: manufOrder,
    });
  }, [manufOrder, navigation]);

  const handleCreateConsumedProduct = useCallback(() => {
    dispatch(
      addProdProductToManufOrder({
        manufOrderId: manufOrder?.id,
        manufOrderVersion: manufOrder?.version,
        productId: product?.id,
        trackingNumberId: trackingNumber?.id,
        qty: consumedQty,
        productType: 'consumed',
      }),
    );
    handleNavigateBackToList();
  }, [
    consumedQty,
    dispatch,
    handleNavigateBackToList,
    manufOrder,
    product,
    trackingNumber,
  ]);

  const handleUpdateConsumedProduct = useCallback(() => {
    dispatch(
      updateProdProductOfManufOrder({
        stockMoveLineVersion: consumedProduct?.stockMoveLineVersion,
        stockMoveLineId: consumedProduct?.stockMoveLineId,
        prodProductQty: consumedQty,
        type: 'consumed',
        manufOrderId: manufOrder?.id,
        manufOrderVersion: manufOrder?.version,
      }),
    );
    handleNavigateBackToList();
  }, [
    consumedProduct,
    consumedQty,
    dispatch,
    handleNavigateBackToList,
    manufOrder,
  ]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        manufOrder?.statusSelect === ManufacturingOrder.status.InProgress &&
        (consumedProduct ? (
          <Button
            title={I18n.t('Base_Save')}
            onPress={handleUpdateConsumedProduct}
          />
        ) : (
          <Button
            title={I18n.t('Base_Save')}
            onPress={handleCreateConsumedProduct}
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
            trackingNumber={
              product.trackingNumberConfiguration == null ||
              trackingNumber == null
                ? null
                : trackingNumber.trackingNumberSeq
            }
            onPress={handleShowProduct}
          />
        )}
        <QuantityCard
          labelQty={I18n.t('Manufacturing_ConsumedQty')}
          defaultValue={parseFloat(consumedQty).toFixed(2)}
          onValueChange={setConsumedQty}
          editable={
            manufOrder?.statusSelect === ManufacturingOrder.status.InProgress
          }>
          <Text>
            {`${I18n.t('Manufacturing_PlannedQty')}: ${parseFloat(
              consumedProduct ? consumedProduct.plannedQty : 0,
            ).toFixed(2)} ${
              consumedProduct
                ? consumedProduct.unit?.unitName
                : product.unit?.name
            }`}
          </Text>
        </QuantityCard>
      </ScrollView>
    </Screen>
  );
};

export default ConsumedProductDetailsScreen;
