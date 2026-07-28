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
import {searchWorkCenters} from '../../../features/workCentersSlice';

interface WorkCenterSearchBarProps {
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

const WorkCenterSearchBar = ({
  style,
  title = 'Manufacturing_WorkCenter',
  defaultValue,
  onChange,
  readonly = false,
  required = false,
  showTitle = false,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
}: WorkCenterSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {workCenterList, loading, moreLoading, isListEnd} = useSelector(
    state => state.workCenters,
  );

  const fetchWorkCenterAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch((searchWorkCenters as any)({page, searchValue}));
    },
    [dispatch],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      placeholder={I18n.t(title)}
      objectList={workCenterList}
      loadingList={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchWorkCenterAPI}
      displayValue={displayItemName}
      readonly={readonly}
      required={required}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

export default WorkCenterSearchBar;
