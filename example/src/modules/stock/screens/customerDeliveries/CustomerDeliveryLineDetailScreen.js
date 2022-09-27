import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Badge, Button, Card, Screen, Text, useThemeColor} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {ProductCardInfo} from '@/modules/stock/components/organisms';
import {
  QuantityCard,
  StockMoveHeader,
} from '@/modules/stock/components/organisms';
import StockMove from '@/modules/stock/types/stock-move';
import {fetchProductWithId} from '../../features/productSlice';
import RenderHtml from 'react-native-render-html';
import {updateCustomerDeliveryLine} from '../../features/customerDeliveryLineSlice';
import {addNewLine} from '../../features/customerDeliverySlice';

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
  const [widthNotes, setWidthNotes] = useState();
  const PERCENTAGE_WIDTH_NOTES = 0.95;
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
      <ScrollView>
        <StockMoveHeader
          reference={customerDelivery.stockMoveSeq}
          status={customerDelivery.statusSelect}
          date={
            customerDelivery.statusSelect === StockMove.status.Draft
              ? customerDelivery.createdOn
              : customerDelivery.statusSelect === StockMove.status.Planned
              ? customerDelivery.estimatedDate
              : customerDelivery.realDate
          }
          availability={customerDelivery.availableStatusSelect}
        />
        <LocationsMoveCard
          fromStockLocation={customerDelivery.fromStockLocation?.name}
          toStockLocation={customerDelivery?.toAddress.fullName}
        />
        <View style={styles.stockView}>
          {customerDeliveryLine != null && (
            <View style={styles.stateLine}>
              <Text style={styles.text_secondary}>
                {customerDeliveryLine?.name}
              </Text>
              {Number(customerDeliveryLine.qty) !==
                Number(customerDeliveryLine.realQty) && (
                <Badge
                  title={I18n.t('Stock_Status_Incomplete')}
                  color={Colors.cautionColor_light}
                />
              )}
              {Number(customerDeliveryLine.qty) ===
                Number(customerDeliveryLine.realQty) && (
                <Badge
                  title={I18n.t('Stock_Status_Complete')}
                  color={Colors.primaryColor_light}
                />
              )}
            </View>
          )}
        </View>
        <ProductCardInfo
          onPress={handleShowProduct}
          pictureId={product?.picture?.id}
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
          <Text style={styles.text}>
            {`${I18n.t('Stock_AskedQty')} : ${parseFloat(
              customerDeliveryLine != null ? customerDeliveryLine.qty : 0,
            ).toFixed(2)} ${
              customerDeliveryLine != null
                ? customerDeliveryLine.unit.name
                : product?.unit?.name
            }`}
          </Text>
        </QuantityCard>
        {customerDelivery.pickingOrderComments && (
          <View style={styles.description}>
            <Text style={styles.titles}>{I18n.t('Stock_NotesClient')}</Text>
            <Card
              style={styles.notes}
              onLayout={event => {
                const {width} = event.nativeEvent.layout;
                setWidthNotes(width);
              }}>
              <RenderHtml
                source={{
                  html: customerDelivery.pickingOrderComments,
                }}
                contentWidth={widthNotes * PERCENTAGE_WIDTH_NOTES}
              />
            </Card>
          </View>
        )}
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
  description: {
    marginHorizontal: 16,
    flexDirection: 'column',
    marginTop: '2%',
  },
  notes: {
    justifyContent: 'center',
    elevation: 0,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
  },
  titles: {
    marginHorizontal: '5%',
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
});

export default CustomerDeliveryLineDetailScreen;
