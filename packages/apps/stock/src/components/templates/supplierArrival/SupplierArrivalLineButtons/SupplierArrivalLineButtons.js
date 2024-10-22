/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {StockMove} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMoveLine',
  });

  const navigateBackToDetails = useCallback(() => {
    navigation.navigate('SupplierArrivalDetailsScreen', {
      supplierArrivalId: supplierArrival?.id,
    });
  }, [supplierArrival, navigation]);

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
      }),
    );

    navigateBackToDetails();
  }, [
    conformity,
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
