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
import {EditableInput} from '@axelor/aos-mobile-ui';
import {useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {updateTrackingNumber} from '../../../features/trackingNumberSlice';

interface EditableOriginInputProps {
  trackingNumber: any;
  stockMoveLineId: number;
}

const EditableOriginInput = ({
  trackingNumber,
  stockMoveLineId,
}: EditableOriginInputProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const handleTrackingNumberOrigin = useCallback(
    item => {
      if (item !== null) {
        dispatch(
          (updateTrackingNumber as any)({
            trackingNumber: trackingNumber,
            stockMoveLineId: stockMoveLineId,
            origin: item,
          }),
        );
      }
    },
    [dispatch, trackingNumber, stockMoveLineId],
  );

  return (
    <EditableInput
      placeholder={I18n.t('Stock_Origin')}
      defaultValue={trackingNumber?.origin}
      onValidate={item => handleTrackingNumberOrigin(item)}
    />
  );
};

export default EditableOriginInput;
