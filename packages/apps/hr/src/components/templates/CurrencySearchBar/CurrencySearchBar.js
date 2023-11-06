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
import {
  AutoCompleteSearch,
  useThemeColor,
  Text,
  FormInput,
} from '@axelor/aos-mobile-ui';
import {searchCurrencies} from '../../../features/currencySlice';

const CurrencySearchBarAux = ({
  style = null,
  title = 'Hr_Currency',
  defaultValue = null,
  onChange = () => {},
  required = false,
  readonly = false,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const Colors = useThemeColor();

  const {
    loadingCurrencies,
    moreLoadingCurrencies,
    isListEndCurrencies,
    currencyList,
  } = useSelector(state => state.currency);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const searchCurrenciesAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        searchCurrencies({
          page,
          searchValue,
        }),
      );
    },
    [dispatch],
  );

  if (readonly) {
    return (
      <FormInput
        style={style}
        title={I18n.t(title)}
        readOnly={true}
        defaultValue={defaultValue?.name}
      />
    );
  }

  return (
    <View style={[Platform.OS === 'ios' ? styles.container : null]}>
      <Text style={styles.title}>{I18n.t(title)}</Text>
      <AutoCompleteSearch
        style={[
          required && defaultValue == null ? styles.requiredBorder : null,
        ]}
        objectList={currencyList}
        value={defaultValue}
        onChangeValue={onChange}
        fetchData={searchCurrenciesAPI}
        displayValue={displayItemName}
        placeholder={I18n.t(title)}
        showDetailsPopup={true}
        loadingList={loadingCurrencies}
        moreLoading={moreLoadingCurrencies}
        isListEnd={isListEndCurrencies}
        navigate={false}
        oneFilter={false}
        isFocus={false}
      />
    </View>
  );
};

const CurrencySearchBar = ({
  style,
  title,
  defaultValue,
  onChange,
  readonly,
  required,
}) => {
  return (
    <CurrencySearchBarAux
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
    container: {
      zIndex: 41,
    },
    title: {
      marginHorizontal: 30,
    },
    requiredBorder: {
      borderColor: Colors.errorColor.background,
    },
  });

export default CurrencySearchBar;
