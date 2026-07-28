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

import React, {useCallback, useEffect} from 'react';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {getFromList, Picker} from '@axelor/aos-mobile-ui';
import {fetchStockCorrectionReasons} from '../../../../features/stockCorrectionReasonSlice';

const StockCorrectionReasonPicker = ({
  status,
  reason,
  setSaveStatus,
  setReason,
  isScrollViewContainer = false,
  readonly = false,
}: {
  status?: number;
  reason: any;
  setSaveStatus?: (_v?: any) => void;
  setReason: (_v?: any) => void;
  isScrollViewContainer?: boolean;
  readonly?: boolean;
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {StockCorrection} = useTypes();

  const {stockCorrectionReasonList} = useSelector(
    state => state.stockCorrectionReason,
  );

  useEffect(() => {
    dispatch(fetchStockCorrectionReasons());
  }, [dispatch]);

  const handleReasonChange = useCallback(
    (reasonId?: number) => {
      if (reasonId === null) {
        setReason({name: '', id: null});
      } else {
        setReason(getFromList(stockCorrectionReasonList, 'id', reasonId));
      }
      setSaveStatus?.(false);
    },
    [setReason, setSaveStatus, stockCorrectionReasonList],
  );

  return (
    <Picker
      title={I18n.t('Stock_Reason')}
      onValueChange={handleReasonChange}
      defaultValue={reason?.id}
      listItems={stockCorrectionReasonList}
      labelField="name"
      valueField="id"
      required={true}
      readonly={readonly || status === StockCorrection?.statusSelect.Validated}
      isScrollViewContainer={isScrollViewContainer}
    />
  );
};

export default StockCorrectionReasonPicker;
