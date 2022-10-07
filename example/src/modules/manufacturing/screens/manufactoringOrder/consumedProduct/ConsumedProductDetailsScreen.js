import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  Screen,
  ScrollView,
  HeaderContainer,
  Text,
} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';
import {ManufacturingOrderHeader} from '@/modules/manufacturing/components/organisms';
import {
  QuantityCard,
  ProductCardInfo,
} from '@/modules/stock/components/organisms';
import {fetchProductWithId} from '@/modules/stock/features/productSlice';

const ConsumedProductDetailsScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const manufOrder = route.params.manufOrder;
  const consumedProduct = route.params.consumedProduct;
  const {loadingProductFromId, productFromId} = useSelector(
    state => state.product,
  );
  const product = consumedProduct ? productFromId : route.params.product;
  const trackingNumber = route.params.trackingNumber;
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

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={<Button title={I18n.t('Base_Save')} onPress={() => {}} />}>
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
            pictureId={product.picture?.id}
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
          defaultValue={parseFloat(
            consumedProduct ? consumedProduct.realQty : 0,
          ).toFixed(2)}
          onValueChange={() => {}}
          editable={true}>
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
