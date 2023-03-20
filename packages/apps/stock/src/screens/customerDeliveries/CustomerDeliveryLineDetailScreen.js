/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Badge,
  HeaderContainer,
  Screen,
  ScrollView,
  Text,
  useThemeColor,
  NotesCard,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  QuantityCard,
  ProductCardInfo,
  StockMoveHeader,
  CustomerDeliveryLineDetailFixedItems,
} from '../../components';
import {fetchProductWithId} from '../../features/productSlice';
import StockMove from '../../types/stock-move';

const CustomerDeliveryLineDetailScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const customerDelivery = route.params.customerDelivery;
  const customerDeliveryLine = route.params.customerDeliveryLine;
  const trackingNumber =
    customerDeliveryLine != null
      ? customerDeliveryLine.trackingNumber
      : route.params.trackingNumber;
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

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  };

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <CustomerDeliveryLineDetailFixedItems
          customerDelivery={customerDelivery}
          customerDeliveryLine={customerDeliveryLine}
          navigation={navigation}
          realQty={realQty}
          trackingNumber={trackingNumber}
        />
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
