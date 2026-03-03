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
import {
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchPaymentCondition} from '../../../features/paymentConditionSlice';

interface PaymentConditionSearchBarProps {
  style?: any;
  title?: string;
  showTitle?: boolean;
  defaultValue?: string;
  onChange?: (item: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const PaymentConditionSearchBar = ({
  style,
  title = 'Sale_PaymentCondition',
  showTitle = true,
  defaultValue,
  onChange,
  readonly = false,
  required = false,
}: PaymentConditionSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loading, moreLoading, isListEnd, paymentConditionList} = useSelector(
    state => state.sale_paymentCondition,
  );

  const searchPaymentConditionAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch((searchPaymentCondition as any)({page, searchValue}));
    },
    [dispatch],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      loadingList={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      objectList={paymentConditionList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchPaymentConditionAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(title)}
      showDetailsPopup={true}
      navigate={false}
      oneFilter={false}
      translator={I18n.t}
    />
  );
};

export default PaymentConditionSearchBar;
