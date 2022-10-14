import React, {useEffect} from 'react';
import {
  Screen,
  Text,
  Button,
  ScrollView,
  HeaderContainer,
} from '@aos-mobile/ui';
import {useDispatch, useSelector, useTranslator} from '@aos-mobile/core';
import {ManufacturingOrderHeader} from '@/modules/manufacturing/components/organisms';
import {
  QuantityCard,
  ProductCardInfo,
} from '@/modules/stock/components/organisms';
import {fetchProductWithId} from '@/modules/stock/features/productSlice';

const ProducedProductDetailsScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const manufOrder = route.params.manufOrder;
  const producedProduct = route.params.producedProduct;
  const {loadingProductFromId, productFromId} = useSelector(
    state => state.product,
  );
  const product = producedProduct ? productFromId : route.params.product;
  const trackingNumber = route.params.trackingNumber;
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
            locker={null}
            onPress={handleShowProduct}
          />
        )}
        <QuantityCard
          labelQty={I18n.t('Manufacturing_ProducedQty')}
          defaultValue={parseFloat(
            producedProduct ? producedProduct.realQty : 0,
          ).toFixed(2)}
          onValueChange={() => {}}
          editable={true}>
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
