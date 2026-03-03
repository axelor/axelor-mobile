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
import {searchWorkCenters} from '../../../features/workCentersSlice';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';

const WorkCenterSearchBar = ({
  placeholderKey = 'Manufacturing_WorkCenter',
  defaultValue = '',
  onChange = () => {},
  scanKey,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {workCenterList, loading, moreLoading, isListEnd} = useSelector(
    state => state.workCenters,
  );

  const fetchWorkCenterAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(searchWorkCenters({page, searchValue}));
    },
    [dispatch],
  );

  return (
    <AutoCompleteSearch
      objectList={workCenterList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchWorkCenterAPI}
      displayValue={displayItemName}
      scanKeySearch={scanKey}
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

export default WorkCenterSearchBar;
