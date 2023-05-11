/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

const MachineSearchBar = ({
  placeholderKey = 'Manufacturing_Machine',
  defaultValue = '',
  onChange = () => {},
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {machineList, loading, moreLoading, isListEnd} = useSelector(
    state => state.machines,
  );

  const fetchMachineAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(searchMachines({page, searchValue}));
    },
    [dispatch],
  );

  return (
    <AutoCompleteSearch
      objectList={machineList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchMachineAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
    />
  );
};

export default MachineSearchBar;
