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
import {ProductTrackingNumberSelect} from '@axelor/aos-mobile-stock';
import {addTrackingNumberToConsumedProduct} from '../../../features/prodProductSlice';

const trackingScanKey = 'tracking_consumed-product-select';

const ConsumedProductTrackingNumberSelect = ({
  product,
  stockMoveLineId,
  stockMoveLineVersion,
  manufOrderId,
  manufOrderVersion,
  operationOrderId,
  operationOrderVersion,
  visible,
}) => {
  const dispatch = useDispatch();

  const handleAddTrackingNumber = useCallback(
    selectedTrackingNumber => {
      dispatch(
        addTrackingNumberToConsumedProduct({
          stockMoveLineId,
          stockMoveLineVersion,
          manufOrderId,
          manufOrderVersion,
          operationOrderId,
          operationOrderVersion,
          trackingNumber: selectedTrackingNumber,
        }),
      );
    },
    [
      dispatch,
      manufOrderId,
      manufOrderVersion,
      operationOrderId,
      operationOrderVersion,
      stockMoveLineId,
      stockMoveLineVersion,
    ],
  );

  return (
    <ProductTrackingNumberSelect
      product={product}
      visible={visible}
      trackingScanKey={trackingScanKey}
      onAddTrackingNumber={handleAddTrackingNumber}
    />
  );
};

export default ConsumedProductTrackingNumberSelect;
