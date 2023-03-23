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
import {Button} from '@axelor/aos-mobile-ui';
import StockMove from '../../../types/stock-move';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {addNewLine} from '../../../features/supplierArrivalSlice';
import {updateSupplierArrivalLine} from '../../../features/supplierArrivalLineSlice';

const SupplierArrivalLineDetailFixedItems = ({
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

  const handleValidate = () => {
    dispatch(
      updateSupplierArrivalLine({
        stockMoveLineId: supplierArrivalLine.id,
        version: supplierArrivalLine.version,
        realQty: realQty,
        conformity: conformity.id,
      }),
    );

    navigation.navigate('SupplierArrivalLineListScreen', {
      supplierArrival: supplierArrival,
    });
  };

  const handleAddLine = () => {
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
    navigation.pop();
    if (product.trackingNumberConfiguration != null) {
      navigation.pop();
    }
    navigation.pop();
  };
  if (
    supplierArrivalLine != null &&
    supplierArrival.statusSelect !== StockMove.status.Realized
  ) {
    return <Button title={I18n.t('Base_Validate')} onPress={handleValidate} />;
  } else if (
    supplierArrivalLine == null &&
    supplierArrival.statusSelect !== StockMove.status.Realized
  ) {
    return <Button title={I18n.t('Base_Add')} onPress={handleAddLine} />;
  } else {
    return null;
  }
};

export default SupplierArrivalLineDetailFixedItems;
