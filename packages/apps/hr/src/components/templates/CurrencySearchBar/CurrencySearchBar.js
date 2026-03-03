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

  const {
    loadingCurrencies,
    moreLoadingCurrencies,
    isListEndCurrencies,
    currencyList,
  } = useSelector(state => state.currency);

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

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      objectList={currencyList}
      value={defaultValue}
      required={required}
      readonly={readonly}
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

export default CurrencySearchBar;
