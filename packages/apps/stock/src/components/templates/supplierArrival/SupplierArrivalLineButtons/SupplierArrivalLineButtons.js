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
import {Button} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import StockMove from '../../../../types/stock-move';
import {addNewLine} from '../../../../features/supplierArrivalSlice';
import {updateSupplierArrivalLine} from '../../../../features/supplierArrivalLineSlice';

const SupplierArrivalLineButtons = ({
  supplierArrival,
  supplierArrivalLine,
  realQty,
  conformity,
  navigation,
  trackingNumber,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {productFromId: product} = useSelector(state => state.product);

  const navigateBackToDetails = useCallback(() => {
    navigation.navigate('SupplierArrivalDetailsScreen', {
      supplierArrival: supplierArrival,
    });
  }, [supplierArrival, navigation]);

  const handleValidate = useCallback(() => {
    dispatch(
      updateSupplierArrivalLine({
        stockMoveLineId: supplierArrivalLine.id,
        version: supplierArrivalLine.version,
        realQty: realQty,
        conformity: conformity.id,
      }),
    );

    navigateBackToDetails();
  }, [
    conformity,
    dispatch,
    navigateBackToDetails,
    realQty,
    supplierArrivalLine,
  ]);

  const handleAddLine = useCallback(() => {
    dispatch(
      addNewLine({
        stockMoveId: supplierArrival.id,
        productId: product.id,
        unitId: product.unit.id,
        trackingNumberId: trackingNumber != null ? trackingNumber.id : null,
        expectedQty: 0,
        realQty: realQty,
        conformity: conformity.id,
      }),
    );

    navigateBackToDetails();
  }, [
    conformity,
    dispatch,
    navigateBackToDetails,
    product,
    realQty,
    supplierArrival,
    trackingNumber,
  ]);

  const buttonProps = useMemo(
    () =>
      supplierArrival != null
        ? {action: handleValidate, title: I18n.t('Base_Validate')}
        : {action: handleAddLine, title: I18n.t('Base_Add')},
    [I18n, supplierArrival, handleAddLine, handleValidate],
  );

  if (supplierArrival.statusSelect !== StockMove.status.Realized) {
    return <Button title={buttonProps.title} onPress={buttonProps.action} />;
  }

  return null;
};

export default SupplierArrivalLineButtons;
