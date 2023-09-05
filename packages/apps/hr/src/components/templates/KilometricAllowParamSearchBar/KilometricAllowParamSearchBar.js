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
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch, useThemeColor, Text} from '@axelor/aos-mobile-ui';
import {searchKilometricAllowParam} from '../../../features/expenseLineSlice';

const KilometricAllowParamSearchBar = ({
  defaultValue = null,
  onChange = console.log,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const Colors = useThemeColor();

  const {
    kilometricAllowParamList,
    loadingKilometricAllowParam,
    moreLoadingKilometricAllowParam,
    isListEndKilometricAllowParam,
  } = useSelector(state => state.expenseLine);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const searchKilometricAllowParamAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        searchKilometricAllowParam({
          page,
          searchValue,
        }),
      );
    },
    [dispatch],
  );

  console.log(kilometricAllowParamList);

  return (
    <View style={[Platform.OS === 'ios' ? styles.container : null]}>
      <Text style={styles.title}>{I18n.t('Hr_KilomectricAllowParam')}</Text>
      <AutoCompleteSearch
        style={[defaultValue == null ? styles.requiredBorder : null]}
        objectList={kilometricAllowParamList}
        value={defaultValue}
        onChangeValue={onChange}
        fetchData={searchKilometricAllowParamAPI}
        displayValue={displayItemName}
        placeholder={I18n.t('Hr_KilomectricAllowParam')}
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

const getStyles = Colors =>
  StyleSheet.create({
    searchBar: {
      width: '100%',
      marginLeft: 5,
    },
    requiredBorder: {
      borderColor: Colors.errorColor.background,
    },
    container: {
      zIndex: 41,
    },
    title: {
      marginHorizontal: 24,
    },
  });

export default KilometricAllowParamSearchBar;
