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
  useSelector,
} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import StockCorrection from '../../../../types/stock-corrrection';
import {createCorrection} from '../../../../features/stockCorrectionSlice';

const StockCorrectionCreationButton = ({
  reason,
  product,
  trackingNumber,
  stockLocation,
  realQty,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector(state => state.config);

  const handleAPI = useCallback(
    status => {
      dispatch(
        createCorrection({
          productId: product.id,
          stockLocationId: stockLocation.id,
          reasonId: reason.id,
          trackingNumberId:
            product?.trackingNumberConfiguration == null ||
            trackingNumber == null
              ? null
              : trackingNumber.id,
          status: status,
          realQty: realQty,
        }),
      );

      navigation.pop();
    },
    [
      dispatch,
      navigation,
      product,
      realQty,
      reason,
      stockLocation,
      trackingNumber,
    ],
  );

  const handleSave = useCallback(
    () => handleAPI(StockCorrection.status.Draft),
    [handleAPI],
  );

  const handleValidate = useCallback(
    () => handleAPI(StockCorrection.status.Validated),
    [handleAPI],
  );

  if (reason?.id == null) {
    return null;
  }

  return (
    <>
      <Button
        title={I18n.t('Base_Save')}
        color={Colors.secondaryColor}
        onPress={handleSave}
      />
      {mobileSettings?.isStockCorrectionValidationEnabled !== false && (
        <Button title={I18n.t('Base_Validate')} onPress={handleValidate} />
      )}
    </>
  );
};

export default StockCorrectionCreationButton;
