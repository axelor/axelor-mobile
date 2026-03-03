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
import {Button} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useNavigation,
  usePermitted,
  useStackChecker,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {updateSupplierArrivalLine} from '../../../../features/supplierArrivalLineSlice';
import {updateTrackingNumber} from '../../../../features/trackingNumberSlice';

const SupplierArrivalLineButtons = ({
  supplierArrival,
  supplierArrivalLine,
  realQty,
  conformity,
  toStockLocation,
  trackingNumber,
  origin,
  description,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isScreenMounted = useStackChecker();
  const {StockMove} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMoveLine',
  });

  const navigateBackToDetails = useCallback(() => {
    if (isScreenMounted('SupplierArrivalLineListScreen')) {
      navigation.popTo('SupplierArrivalLineListScreen', {supplierArrival});
    } else {
      navigation.popTo('SupplierArrivalDetailsScreen', {
        supplierArrivalId: supplierArrival?.id,
      });
    }
  }, [isScreenMounted, navigation, supplierArrival]);

  const handleTrackingNumberOrigin = useCallback(() => {
    if (trackingNumber != null && origin !== trackingNumber.origin) {
      dispatch(
        updateTrackingNumber({
          ...trackingNumber,
          origin,
        }),
      );
    }
  }, [dispatch, origin, trackingNumber]);

  const handleValidate = useCallback(() => {
    handleTrackingNumberOrigin();
    dispatch(
      updateSupplierArrivalLine({
        stockMoveLineId: supplierArrivalLine.id,
        version: supplierArrivalLine.version,
        realQty: realQty,
        conformity: conformity?.id,
        toStockLocationId: toStockLocation?.id,
        description: description,
      }),
    );

    navigateBackToDetails();
  }, [
    conformity,
    description,
    dispatch,
    handleTrackingNumberOrigin,
    navigateBackToDetails,
    realQty,
    supplierArrivalLine,
    toStockLocation,
  ]);

  if (
    !readonly &&
    supplierArrival.statusSelect !== StockMove?.statusSelect.Realized
  ) {
    return <Button title={I18n.t('Base_Validate')} onPress={handleValidate} />;
  }

  return null;
};

export default SupplierArrivalLineButtons;
