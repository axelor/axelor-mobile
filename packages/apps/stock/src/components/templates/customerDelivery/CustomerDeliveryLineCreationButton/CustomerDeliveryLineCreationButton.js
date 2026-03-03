/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {useCallback} from 'react';
import {
  useTranslator,
  useDispatch,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';
import {addNewLine} from '../../../../features/customerDeliverySlice';

const CustomerDeliveryLineCreationButton = ({
  customerDelivery,
  product,
  realQty,
  description,
  trackingNumber,
  fromStockLocation,
  visible = true,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const navigateBackToDetails = useCallback(() => {
    navigation.popTo('CustomerDeliveryDetailScreen', {
      customerDeliveryId: customerDelivery.id,
    });
  }, [customerDelivery, navigation]);

  const handleAddLine = useCallback(() => {
    dispatch(
      addNewLine({
        stockMoveId: customerDelivery.id,
        version: customerDelivery.version,
        fromStockLocationId: fromStockLocation?.id,
        productId: product.id,
        unitId: product.unit?.id,
        trackingNumberId: trackingNumber != null ? trackingNumber.id : null,
        expectedQty: 0,
        realQty: realQty,
        description,
      }),
    );

    navigateBackToDetails();
  }, [
    customerDelivery,
    description,
    dispatch,
    fromStockLocation,
    navigateBackToDetails,
    product,
    realQty,
    trackingNumber,
  ]);

  if (!visible) {
    return null;
  }

  return <Button title={I18n.t('Base_Add')} onPress={handleAddLine} />;
};

export default CustomerDeliveryLineCreationButton;
