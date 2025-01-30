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

import React, {useCallback, useMemo} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchClientAndProspect} from '../../../features/partnerSlice';
import {displayItemFullname} from '../../../utils/displayers';

const ClientProspectSearchBar = ({
  placeholderKey = 'Crm_ClientProspect',
  titleKey = 'Crm_ClientProspect',
  defaultValue = null,
  onChange = () => {},
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
  style,
  styleTxt,
  showTitle = true,
  required = false,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {loading, moreLoading, isListEnd, clientAndProspectList} = useSelector(
    state => state.partner,
  );

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const searchClientAndProspectAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(fetchClientAndProspect({page, searchValue}));
    },
    [dispatch],
  );

  return (
    <View style={[Platform.OS === 'ios' ? styles.container : null, style]}>
      {showTitle && (
        <Text style={[styles.title, styleTxt]}>{I18n.t(titleKey)}</Text>
      )}
      <AutoCompleteSearch
        style={[
          defaultValue == null && required ? styles.requiredBorder : null,
        ]}
        objectList={clientAndProspectList}
        value={defaultValue}
        onChangeValue={onChange}
        fetchData={searchClientAndProspectAPI}
        displayValue={displayItemFullname}
        placeholder={I18n.t(placeholderKey)}
        showDetailsPopup={showDetailsPopup}
        loadingList={loading}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        navigate={navigate}
        oneFilter={oneFilter}
        isFocus={isFocus}
      />
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      zIndex: 41,
    },
    title: {
      marginHorizontal: 24,
    },
    requiredBorder: {
      borderColor: Colors.errorColor.background,
    },
  });

export default ClientProspectSearchBar;
