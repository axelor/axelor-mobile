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

import React, {useCallback, useMemo} from 'react';
import {
  useTranslator,
  useDispatch,
  useSelector,
  isEmpty,
} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';
import StockMove from '../../../../types/stock-move';
import {updateCustomerDeliveryLine} from '../../../../features/customerDeliveryLineSlice';
import {addNewLine} from '../../../../features/customerDeliverySlice';

const CustomerDeliveryLineButtons = ({
  customerDeliveryLine,
  customerDelivery,
  realQty,
  navigation,
  trackingNumber,
  visible = true,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {productFromId: product} = useSelector(state => state.product);

  const navigateBackToDetails = useCallback(() => {
    navigation.navigate('CustomerDeliveryDetailScreen', {
      customerDeliveryId: customerDelivery.id,
    });
  }, [customerDelivery, navigation]);

  const handleValidate = useCallback(() => {
    dispatch(
      updateCustomerDeliveryLine({
        stockMoveLineId: customerDeliveryLine.id,
        version: customerDeliveryLine.version,
        realQty: realQty,
      }),
    );

    navigateBackToDetails();
  }, [customerDeliveryLine, dispatch, navigateBackToDetails, realQty]);

  const handleAddLine = useCallback(() => {
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

    navigateBackToDetails();
  }, [
    customerDelivery,
    dispatch,
    navigateBackToDetails,
    product,
    realQty,
    trackingNumber,
  ]);

  const buttonProps = useMemo(
    () =>
      !isEmpty(customerDeliveryLine)
        ? {action: handleValidate, title: I18n.t('Base_Validate')}
        : {action: handleAddLine, title: I18n.t('Base_Add')},
    [I18n, customerDeliveryLine, handleAddLine, handleValidate],
  );

  if (!visible) {
    return null;
  }

  if (customerDelivery.statusSelect !== StockMove.status.Realized) {
    return <Button title={buttonProps.title} onPress={buttonProps.action} />;
  }

  return null;
};

export default CustomerDeliveryLineButtons;
