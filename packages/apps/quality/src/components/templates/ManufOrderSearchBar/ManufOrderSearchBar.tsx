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

const displayItemSeq = item => item.manufOrderSeq;

interface ManufOrderSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange: (value: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const ManufOrderSearchBarAux = ({
  style,
  title = 'Quality_ManufOrder',
  defaultValue,
  onChange,
  readonly = false,
  required = false,
}: ManufOrderSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {manufOrderList, loadingManufOrder, moreLoading, isListEnd} =
    useSelector((state: any) => state.quality_manufOrder);
  const {user} = useSelector((state: any) => state.user);

  const searchManufOrderAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchManufOrder as any)({
          page,
          searchValue,
          companyId: user?.activeCompany?.id,
        }),
      );
    },
    [dispatch, user?.activeCompany?.id],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      placeholder={I18n.t(title)}
      objectList={manufOrderList}
      loadingList={loadingManufOrder}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={searchManufOrderAPI}
      displayValue={displayItemSeq}
      required={required}
      readonly={readonly}
      showDetailsPopup={true}
      navigate={false}
      oneFilter={false}
    />
  );
};

const ManufOrderSearchBar = (props: ManufOrderSearchBarProps) => {
  return <ManufOrderSearchBarAux {...props} />;
};

export default ManufOrderSearchBar;
