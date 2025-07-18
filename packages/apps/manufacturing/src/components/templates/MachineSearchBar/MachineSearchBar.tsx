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
import {searchMachines} from '../../../features/machinesSlice';

interface MachineSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange: (value: any) => void;
  readonly?: boolean;
  required?: boolean;
  showTitle?: boolean;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
}

const MachineSearchBar = ({
  style,
  title = 'Manufacturing_Machine',
  defaultValue,
  onChange,
  readonly = false,
  required = false,
  showTitle = true,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
}: MachineSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {machineList, loading, moreLoading, isListEnd} = useSelector(
    state => state.machines,
  );

  const fetchMachineAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchMachines as any)({
          page,
          companyId: user.activeCompany?.id,
          searchValue,
        }),
      );
    },
    [dispatch, user.activeCompany?.id],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      placeholder={I18n.t(title)}
      objectList={machineList}
      loadingList={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchMachineAPI}
      displayValue={displayItemName}
      readonly={readonly}
      required={required}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

export default MachineSearchBar;
