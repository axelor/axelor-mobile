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
import {
  HeaderContainer,
  Screen,
  ScrollView,
  NotesCard,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  ProductCardInfo,
  StockMoveHeader,
  CustomerDeliveryLineButtons,
  CustomerDeliveryLineQuantityCard,
} from '../../components';
import {fetchProductWithId} from '../../features/productSlice';
import StockMove from '../../types/stock-move';

const CustomerDeliveryLineDetailScreen = ({route, navigation}) => {
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

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  };

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <CustomerDeliveryLineButtons
          customerDelivery={customerDelivery}
          customerDeliveryLine={customerDeliveryLine}
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
        <CustomerDeliveryLineQuantityCard
          customerDelivery={customerDelivery}
          customerDeliveryLine={customerDeliveryLine}
          realQty={realQty}
          setRealQty={setRealQty}
        />
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

export default CustomerDeliveryLineDetailScreen;
