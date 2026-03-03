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
import {searchEmployee} from '../../../features/employeeSlice';

interface EmployeeSearchBarProps {
  title?: string;
  showTitle?: boolean;
  readonly?: boolean;
  required?: boolean;
  placeholderKey?: string;
  defaultValue?: string;
  onChange: (leaveReason: any) => void;
  additionnalFilters?: any;
}

const EmployeeSearchBar = ({
  title = 'Hr_Employee',
  placeholderKey = 'Hr_Employee',
  defaultValue = null,
  showTitle = true,
  onChange = () => {},
  readonly = false,
  required = false,
  additionnalFilters,
}: EmployeeSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {
    loadingEmployees,
    moreLoadingEmployee,
    isListEndEmployee,
    employeeList,
  } = useSelector(state => state.employee);

  const fetchEmployeeAPI = useCallback(
    ({searchValue, page = 0}) => {
      dispatch(
        (searchEmployee as any)({
          searchValue,
          page,
          payCompany: user.activeCompany?.id,
          ...(additionnalFilters ?? {}),
        }),
      );
    },
    [additionnalFilters, dispatch, user.activeCompany?.id],
  );

  return (
    <AutoCompleteSearch
      title={showTitle && I18n.t(title)}
      objectList={employeeList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={fetchEmployeeAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(placeholderKey)}
      oneFilter={false}
      showDetailsPopup={true}
      loadingList={loadingEmployees}
      moreLoading={moreLoadingEmployee}
      isListEnd={isListEndEmployee}
      translator={I18n.t}
    />
  );
};

export default EmployeeSearchBar;
