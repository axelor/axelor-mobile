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
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchOperationLine} from '../../../features/operationOrderSlice';

interface OperationLineSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const OperationLineSearchBarAux = ({
  style = null,
  title = 'Quality_OperationLine',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: OperationLineSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    loadingOperationOrders,
    moreLoadingOperationOrder,
    isListEndOperationOrder,
    operationOrderList,
  } = useSelector((state: any) => state.quality_operationOrder);

  const {manufOrderForm} = useSelector(
    (state: any) => state.quality_manufOrder,
  );

  const searchOerationLineAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchOperationLine as any)({
          page,
          searchValue,
          manufOrder: manufOrderForm,
        }),
      );
    },
    [dispatch, manufOrderForm],
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
      fetchData={searchOerationLineAPI}
      displayValue={displayItemName}
      placeholder={title}
      showDetailsPopup={true}
      loadingList={loadingOperationOrders}
      moreLoading={moreLoadingOperationOrder}
      isListEnd={isListEndOperationOrder}
      navigate={false}
      oneFilter={false}
    />
  );
};

const OperationLineSearchBar = ({
  style = null,
  title = 'Quality_OperationLine',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: OperationLineSearchBarProps) => {
  return (
    <OperationLineSearchBarAux
      style={style}
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
      required={required}
    />
  );
};

export default OperationLineSearchBar;
