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
import {useDispatch} from '@axelor/aos-mobile-core';
import {ProductTrackingNumberSelect} from '../../../templates';
import {addTrackingNumberStockCorrection} from '../../../../features/stockCorrectionSlice';

const trackingScanKey = 'tracking_stock-correction-select';

const StockCorrectionTrackingNumberSelect = ({
  product,
  stockCorrection,
  visible = true,
}) => {
  const dispatch = useDispatch();

  const handleAddTrackingNumber = useCallback(
    selectedTrackingNumber => {
      dispatch(
        (addTrackingNumberStockCorrection as any)({
          stockCorrectionId: stockCorrection?.id,
          stockCorrectionVersion: stockCorrection?.version,
          trackingNumber: selectedTrackingNumber,
        }),
      );
    },
    [dispatch, stockCorrection],
  );

  return (
    <ProductTrackingNumberSelect
      product={product}
      visible={visible}
      trackingScanKey={trackingScanKey}
      onAddTrackingNumber={handleAddTrackingNumber}
      style={{}}
    />
  );
};

export default StockCorrectionTrackingNumberSelect;
