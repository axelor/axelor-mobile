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

import React from 'react';
import {useTranslator, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';
import StockMove from '../../../types/stock-move';
import {updateCustomerDeliveryLine} from '../../../features/customerDeliveryLineSlice';
import {addNewLine} from '../../../features/customerDeliverySlice';

const CustomerDeliveryLineDetailFixedItems = ({
  customerDeliveryLine,
  customerDelivery,
  realQty,
  navigation,
  trackingNumber,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {productFromId: product} = useSelector(state => state.product);

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
    <>
      {customerDeliveryLine != null &&
        customerDelivery.statusSelect !== StockMove.status.Realized && (
          <Button title={I18n.t('Base_Validate')} onPress={handleValidate} />
        )}
      {customerDeliveryLine == null &&
        customerDelivery.statusSelect !== StockMove.status.Realized && (
          <Button title={I18n.t('Base_Add')} onPress={handleAddLine} />
        )}
    </>
  );
};

export default CustomerDeliveryLineDetailFixedItems;
