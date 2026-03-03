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
import {useDispatch} from '@axelor/aos-mobile-core';
import {ProductTrackingNumberSelect} from '../../../templates';
import {addTrackingNumberStockCorrection} from '../../../../features/stockCorrectionSlice';

const trackingScanKey = 'tracking-number_stock-correction_select';

const StockCorrectionTrackingNumberSelect = ({
  style,
  product,
  stockCorrection,
  visible = false,
  handleTrackingSelect = () => {},
}: {
  style?: any;
  product: any;
  stockCorrection?: any;
  visible?: boolean;
  handleTrackingSelect?: (value: any) => void;
}) => {
  const dispatch = useDispatch();

  const handleAddTrackingNumber = useCallback(
    (item: any) => {
      dispatch(
        (addTrackingNumberStockCorrection as any)({
          stockCorrectionId: stockCorrection.id,
          stockCorrectionVersion: stockCorrection.version,
          trackingNumber: item,
        }),
      );
    },
    [dispatch, stockCorrection],
  );

  return (
    <ProductTrackingNumberSelect
      style={style}
      product={product}
      visible={visible}
      trackingScanKey={trackingScanKey}
      onAddTrackingNumber={
        stockCorrection == null ? handleTrackingSelect : handleAddTrackingNumber
      }
    />
  );
};

export default StockCorrectionTrackingNumberSelect;
