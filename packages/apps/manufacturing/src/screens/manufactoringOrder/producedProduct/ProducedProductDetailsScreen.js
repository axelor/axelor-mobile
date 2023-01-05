import React, {useCallback, useEffect, useState} from 'react';
import {
  Screen,
  Text,
  Button,
  ScrollView,
  HeaderContainer,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  fetchProductWithId,
  QuantityCard,
  ProductCardInfo,
} from '@axelor/aos-mobile-stock';
import {ManufacturingOrderHeader} from '../../../components/organisms';
import {
  addProdProductToManufOrder,
  updateProdProductOfManufOrder,
} from '../../../features/prodProductSlice';
import {ManufacturingOrder} from '../../../types';

const ProducedProductDetailsScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const manufOrder = route.params.manufOrder;
  const producedProduct = route.params.producedProduct;
  const {loadingProductFromId, productFromId} = useSelector(
    state => state.product,
  );
  const product = producedProduct ? productFromId : route.params.product;
  const trackingNumber = route.params.trackingNumber;
  const [producedQty, setProducedQty] = useState(
    producedProduct ? producedProduct.realQty : 0,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (producedProduct != null) {
      dispatch(fetchProductWithId(producedProduct.productId));
    }
  }, [producedProduct, dispatch]);

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  };

  const handleNavigateBackToList = useCallback(() => {
    navigation.navigate('ProducedProductListScreen', {
      manufOrder: manufOrder,
    });
  }, [manufOrder, navigation]);

  const handleCreateProducedProduct = useCallback(() => {
    dispatch(
      addProdProductToManufOrder({
        manufOrderId: manufOrder?.id,
        manufOrderVersion: manufOrder?.version,
        productId: product?.id,
        trackingNumberId: trackingNumber?.id,
        qty: producedQty,
        productType: 'produced',
      }),
    );
    handleNavigateBackToList();
  }, [
    producedQty,
    dispatch,
    handleNavigateBackToList,
    manufOrder,
    product,
    trackingNumber,
  ]);

  const handleUpdateProducedProduct = useCallback(() => {
    dispatch(
      updateProdProductOfManufOrder({
        stockMoveLineVersion: producedProduct?.stockMoveLineVersion,
        stockMoveLineId: producedProduct?.stockMoveLineId,
        prodProductQty: producedQty,
        type: 'produced',
        manufOrderId: manufOrder?.id,
        manufOrderVersion: manufOrder?.version,
      }),
    );
    handleNavigateBackToList();
  }, [
    producedProduct,
    producedQty,
    dispatch,
    handleNavigateBackToList,
    manufOrder,
  ]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        manufOrder?.statusSelect === ManufacturingOrder.status.InProgress &&
        (producedProduct ? (
          <Button
            title={I18n.t('Base_Save')}
            onPress={handleUpdateProducedProduct}
          />
        ) : (
          <Button
            title={I18n.t('Base_Save')}
            onPress={handleCreateProducedProduct}
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
          labelQty={I18n.t('Manufacturing_ProducedQty')}
          defaultValue={parseFloat(producedQty).toFixed(2)}
          onValueChange={setProducedQty}
          editable={
            manufOrder?.statusSelect === ManufacturingOrder.status.InProgress
          }>
          <Text>
            {`${I18n.t('Manufacturing_PlannedQty')}: ${parseFloat(
              producedProduct ? producedProduct.plannedQty : 0,
            ).toFixed(2)} ${
              producedProduct
                ? producedProduct.unit?.unitName
                : product.unit?.name
            }`}
          </Text>
        </QuantityCard>
      </ScrollView>
    </Screen>
  );
};

export default ProducedProductDetailsScreen;
