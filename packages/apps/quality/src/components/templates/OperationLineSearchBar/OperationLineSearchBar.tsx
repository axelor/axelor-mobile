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

import React, {useCallback, useMemo} from 'react';
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
  defaultValue?: any;
  onChange: (value?: any) => void;
  objectState?: any;
  required?: boolean;
  readonly?: boolean;
}

const OperationLineSearchBarAux = ({
  style,
  title = 'Quality_OperationLine',
  defaultValue,
  onChange,
  objectState,
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
  } = useSelector(state => state.quality_operationOrder);

  const manufOrder = useMemo(
    () => objectState?.manufOrder,
    [objectState?.manufOrder],
  );

  const searchOperationLineAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch((searchOperationLine as any)({page, searchValue, manufOrder}));
    },
    [dispatch, manufOrder],
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
      fetchData={searchOperationLineAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(title)}
      showDetailsPopup
      loadingList={loadingOperationOrders}
      moreLoading={moreLoadingOperationOrder}
      isListEnd={isListEndOperationOrder}
      navigate={false}
      oneFilter={false}
    />
  );
};

const OperationLineSearchBar = (props: OperationLineSearchBarProps) => {
  return <OperationLineSearchBarAux {...props} />;
};

export default OperationLineSearchBar;
