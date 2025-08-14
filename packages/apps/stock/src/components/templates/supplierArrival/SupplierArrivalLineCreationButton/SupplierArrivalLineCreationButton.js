/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {addNewLine} from '../../../../features/supplierArrivalSlice';

const SupplierArrivalLineCreationButton = ({
  supplierArrival,
  product,
  realQty,
  trackingNumber,
  conformity,
  toStockLocation,
  description,
  visible = true,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const navigateBackToDetails = useCallback(() => {
    navigation.popTo('SupplierArrivalDetailsScreen', {
      supplierArrivalId: supplierArrival?.id,
    });
  }, [supplierArrival, navigation]);

  const handleAddLine = useCallback(() => {
    dispatch(
      addNewLine({
        stockMoveId: supplierArrival.id,
        version: supplierArrival.version,
        productId: product.id,
        unitId: product.unit?.id,
        trackingNumberId: trackingNumber != null ? trackingNumber.id : null,
        expectedQty: 0,
        realQty: realQty,
        conformity: conformity?.id,
        toStockLocationId: toStockLocation?.id,
        description,
      }),
    );

    navigateBackToDetails();
  }, [
    dispatch,
    supplierArrival.id,
    supplierArrival.version,
    product.id,
    product.unit?.id,
    trackingNumber,
    realQty,
    conformity?.id,
    toStockLocation?.id,
    description,
    navigateBackToDetails,
  ]);

  if (!visible) {
    return null;
  }

  return <Button title={I18n.t('Base_Add')} onPress={handleAddLine} />;
};

export default SupplierArrivalLineCreationButton;
