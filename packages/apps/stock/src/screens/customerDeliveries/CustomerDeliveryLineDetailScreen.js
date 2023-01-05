import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Badge,
  Button,
  HeaderContainer,
  Screen,
  ScrollView,
  Text,
  useThemeColor,
  NotesCard,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {QuantityCard, ProductCardInfo, StockMoveHeader} from '../../components';
import {fetchProductWithId} from '../../features/productSlice';
import {updateCustomerDeliveryLine} from '../../features/customerDeliveryLineSlice';
import {addNewLine} from '../../features/customerDeliverySlice';
import StockMove from '../../types/stock-move';

const CustomerDeliveryLineDetailScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const customerDelivery = route.params.customerDelivery;
  const customerDeliveryLine = route.params.customerDeliveryLine;
  const trackingNumber = route.params.trackingNumber;
  const {loadingProductFromId, productFromId: product} = useSelector(
    state => state.product,
  );
  const [realQty, setRealQty] = useState(
    customerDeliveryLine != null ? customerDeliveryLine.realQty : 0,
  );
  const I18n = useTranslator();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchProductWithId(
        customerDeliveryLine != null
          ? customerDeliveryLine.product?.id
          : route.params.product.id,
      ),
    );
  }, [dispatch, customerDeliveryLine, route.params.product]);

  const handleQtyChange = value => {
    setRealQty(value);
  };

  const handleValidate = () => {
    dispatch(
      updateCustomerDeliveryLine({
        stockMoveLineId: customerDeliveryLine.id,
        version: customerDeliveryLine.version,
        realQty: realQty,
      }),
    );

    if (customerDelivery.statusSelect !== StockMove.status.Realized) {
      navigation.pop();
      if (product.trackingNumberConfiguration != null) {
        navigation.pop();
      }
    }
    navigation.pop();
  };

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  };

  const handleAddLine = () => {
    dispatch(
      addNewLine({
        stockMoveId: customerDelivery.id,
        productId: product.id,
        unitId: product.unit.id,
        trackingNumberId: trackingNumber != null ? trackingNumber.id : null,
        expectedQty: 0,
        realQty: realQty,
      }),
    );
    navigation.pop();
    if (product.trackingNumberConfiguration != null) {
      navigation.pop();
    }
    navigation.pop();
  };

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <>
          {customerDeliveryLine != null &&
            customerDelivery.statusSelect !== StockMove.status.Realized && (
              <Button
                title={I18n.t('Base_Validate')}
                onPress={handleValidate}
              />
            )}
          {customerDeliveryLine == null &&
            customerDelivery.statusSelect !== StockMove.status.Realized && (
              <Button title={I18n.t('Base_Add')} onPress={handleAddLine} />
            )}
        </>
      }
      loading={loadingProductFromId}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={customerDelivery.stockMoveSeq}
            status={customerDelivery.statusSelect}
            lineRef={customerDeliveryLine?.name}
            date={
              customerDelivery.statusSelect === StockMove.status.Draft
                ? customerDelivery.createdOn
                : customerDelivery.statusSelect === StockMove.status.Planned
                ? customerDelivery.estimatedDate
                : customerDelivery.realDate
            }
            availability={customerDelivery.availableStatusSelect}
          />
        }
      />
      <ScrollView>
        <ProductCardInfo
          onPress={handleShowProduct}
          picture={product?.picture}
          code={product?.code}
          name={product?.name}
          trackingNumber={trackingNumber?.trackingNumberSeq}
          locker={customerDeliveryLine?.locker}
        />
        <QuantityCard
          labelQty={I18n.t('Stock_PickedQty')}
          defaultValue={parseFloat(realQty).toFixed(2)}
          onValueChange={handleQtyChange}
          editable={
            customerDelivery.statusSelect !== StockMove.status.Realized
          }>
          <View style={styles.headerQuantityCard}>
            <Text style={styles.text}>
              {`${I18n.t('Stock_AskedQty')} : ${parseFloat(
                customerDeliveryLine != null ? customerDeliveryLine.qty : 0,
              ).toFixed(2)} ${
                customerDeliveryLine != null
                  ? customerDeliveryLine.unit.name
                  : product?.unit?.name
              }`}
            </Text>
            {customerDeliveryLine != null && (
              <View>
                {Number(customerDeliveryLine.qty) !==
                  Number(customerDeliveryLine.realQty) && (
                  <Badge
                    title={I18n.t('Stock_Status_Incomplete')}
                    color={Colors.cautionColor}
                  />
                )}
                {Number(customerDeliveryLine.qty) ===
                  Number(customerDeliveryLine.realQty) && (
                  <Badge
                    title={I18n.t('Stock_Status_Complete')}
                    color={Colors.primaryColor}
                  />
                )}
              </View>
            )}
          </View>
        </QuantityCard>
        <NotesCard
          title={I18n.t('Stock_NotesClient')}
          data={customerDelivery.pickingOrderComments}
        />
        <NotesCard
          title={I18n.t('Stock_LineComment')}
          data={customerDeliveryLine['saleOrderLine.pickingOrderInfo']}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: '2%',
  },
  validateBtn: {
    width: '60%',
    marginTop: 10,
    borderRadius: 35,
    marginHorizontal: '20%',
  },
  stateLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 32,
    marginVertical: '1%',
  },
  stockView: {
    marginTop: '2%',
  },
  text_secondary: {
    fontSize: 14,
  },
  headerQuantityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CustomerDeliveryLineDetailScreen;
