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

import React, {useCallback, useMemo} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  displayItemName,
  useDispatch,
  useSelector,
} from '@axelor/aos-mobile-core';
import {
  AutoCompleteSearch,
  useThemeColor,
  Text,
  FormInput,
} from '@axelor/aos-mobile-ui';
import {searchKilometricAllowParam} from '../../../features/kilometricAllowParamSlice';

const KilometricAllowParamSearchBarAux = ({
  style = null,
  title = 'Hr_KilometricAllowParam',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {
    kilometricAllowParamList,
    loadingKilometricAllowParam,
    moreLoadingKilometricAllowParam,
    isListEndKilometricAllowParam,
    expenseDate,
  } = useSelector(state => state.kilometricAllowParam);
  const {user} = useSelector(state => state.user);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const searchKilometricAllowParamAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        searchKilometricAllowParam({
          page,
          searchValue,
          idList: user.employee?.employeeVehicleList.map(element => {
            if (expenseDate != null) {
              if (
                new Date(expenseDate) >= new Date(element.startDate) &&
                new Date(expenseDate) <= new Date(element.endDate)
              ) {
                return element.kilometricAllowParam?.id;
              }
            }
          }),
        }),
      );
    },
    [dispatch, user, expenseDate],
  );

  const defaultKap = useMemo(() => {
    if (kilometricAllowParamList?.length === 1) {
      return kilometricAllowParamList[0];
    } else {
      return defaultValue;
    }
  }, [defaultValue, kilometricAllowParamList]);

  if (readonly) {
    return (
      <FormInput
        style={style}
        title={title}
        readOnly={true}
        defaultValue={defaultValue}
      />
    );
  }

  return (
    <View style={[Platform.OS === 'ios' ? styles.container : null]}>
      <Text style={styles.title}>{title}</Text>
      <AutoCompleteSearch
        style={[
          required && defaultValue == null ? styles.requiredBorder : null,
        ]}
        objectList={kilometricAllowParamList}
        value={defaultKap}
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
    </View>
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

const getStyles = Colors =>
  StyleSheet.create({
    requiredBorder: {
      borderColor: Colors.errorColor.background,
    },
    container: {
      zIndex: 41,
    },
    title: {
      marginHorizontal: 30,
    },
  });

export default KilometricAllowParamSearchBar;
