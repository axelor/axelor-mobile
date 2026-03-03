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
import {searchOperationOrder} from '../../../features/manufOrderSlice';

interface OperationOrderSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const OperationOrderSearchBarAux = ({
  style = null,
  title = 'Hr_OperationOrder',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: OperationOrderSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    manufOrder,
    operationOrderList,
    loadingOperationOrder,
    moreLoadingOperationOrder,
    isListEndOperationOrder,
  } = useSelector((state: any) => state.hr_manufOrder);
  const {user} = useSelector((state: any) => state.user);

  const searchOperationOrderAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchOperationOrder as any)({
          page,
          searchValue,
          manufOrderId: manufOrder?.id,
          companyId: user.activeCompany?.id,
        }),
      );
    },
    [dispatch, manufOrder?.id, user.activeCompany?.id],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      objectList={operationOrderList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchOperationOrderAPI}
      displayValue={displayItemName}
      placeholder={title}
      showDetailsPopup={true}
      loadingList={loadingOperationOrder}
      moreLoading={moreLoadingOperationOrder}
      isListEnd={isListEndOperationOrder}
      navigate={false}
      oneFilter={false}
    />
  );
};

const OperationOrderSearchBar = ({
  style = null,
  title = 'Hr_OperationOrder',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: OperationOrderSearchBarProps) => {
  return (
    <OperationOrderSearchBarAux
      style={style}
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
      required={required}
    />
  );
};

export default OperationOrderSearchBar;
