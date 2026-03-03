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

import React, {useCallback, useEffect} from 'react';
import {
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchKilometricAllowParam} from '../../../features/kilometricAllowParamSlice';

const KilometricAllowParamSearchBarAux = ({
  style = null,
  title = 'Hr_KilometricAllowParam',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    kilometricAllowParamList,
    loadingKilometricAllowParam,
    moreLoadingKilometricAllowParam,
    isListEndKilometricAllowParam,
    expenseDate,
  } = useSelector(state => state.kilometricAllowParam);
  const {user} = useSelector(state => state.user);

  const searchKilometricAllowParamAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        searchKilometricAllowParam({
          page,
          searchValue,
          idList: user.employee?.employeeVehicleList.map(_vehicle => {
            if (expenseDate != null) {
              const _expenseDate = new Date(expenseDate);

              const _endDate = _vehicle.endDate
                ? new Date(_vehicle.endDate)
                : null;

              if (_vehicle.startDate == null) {
                if (_vehicle.endDate == null) {
                  // Vehicle has no period, always valid
                  return _vehicle.kilometricAllowParam.id;
                } else if (_expenseDate <= _endDate) {
                  // Vehicle has end date, expense date should be before end date
                  return _vehicle.kilometricAllowParam.id;
                }
              } else {
                const _startDate = _vehicle.startDate
                  ? new Date(_vehicle.startDate)
                  : null;

                if (_vehicle.endDate == null) {
                  if (_expenseDate >= _startDate) {
                    // Vehicle has start date, expense date should be after start date
                    return _vehicle.kilometricAllowParam.id;
                  }
                } else if (
                  _expenseDate >= _startDate &&
                  _expenseDate <= _endDate
                ) {
                  // Vehicle has a period, expense date should be after start date and before end date
                  return _vehicle.kilometricAllowParam.id;
                }
              }
            }
          }),
        }),
      );
    },
    [dispatch, user, expenseDate],
  );

  useEffect(() => {
    if (
      Array.isArray(kilometricAllowParamList) &&
      kilometricAllowParamList.length === 1
    ) {
      onChange(kilometricAllowParamList[0]);
    }
  }, [kilometricAllowParamList, onChange]);

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      objectList={kilometricAllowParamList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchKilometricAllowParamAPI}
      displayValue={displayItemName}
      placeholder={title}
      showDetailsPopup={true}
      loadingList={loadingKilometricAllowParam}
      moreLoading={moreLoadingKilometricAllowParam}
      isListEnd={isListEndKilometricAllowParam}
      navigate={false}
      oneFilter={false}
      isFocus={false}
    />
  );
};

const KilometricAllowParamSearchBar = ({
  style = null,
  title = 'Hr_KilometricAllowParam',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}) => {
  return (
    <KilometricAllowParamSearchBarAux
      style={style}
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
      required={required}
    />
  );
};

export default KilometricAllowParamSearchBar;
