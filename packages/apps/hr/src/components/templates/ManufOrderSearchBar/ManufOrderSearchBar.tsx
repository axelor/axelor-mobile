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
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchManufOrder} from '../../../features/manufOrderSlice';

interface ManufOrderSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const ManufOrderSearchBarAux = ({
  style = null,
  title = 'Hr_ManufOrder',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: ManufOrderSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {manufOrderList, loadingManufOrder, moreLoading, isListEnd} =
    useSelector((state: any) => state.hr_manufOrder);
  const {user} = useSelector((state: any) => state.user);

  const searchManufOrderAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchManufOrder as any)({
          page,
          searchValue,
          activeCompanyId: user?.activeCompany?.id,
        }),
      );
    },
    [dispatch, user?.activeCompany?.id],
  );

  const displayItemSeq = item => item.manufOrderSeq;

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      objectList={manufOrderList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchManufOrderAPI}
      displayValue={displayItemSeq}
      placeholder={title}
      showDetailsPopup={true}
      loadingList={loadingManufOrder}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      navigate={false}
      oneFilter={false}
    />
  );
};

const ManufOrderSearchBar = ({
  style = null,
  title = 'Hr_ManufOrder',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: ManufOrderSearchBarProps) => {
  return (
    <ManufOrderSearchBarAux
      style={style}
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
      required={required}
    />
  );
};

export default ManufOrderSearchBar;
