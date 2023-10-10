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
import {
  displayItemFullname,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  AutoCompleteSearch,
  FormInput,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {fetchLeads} from '../../../features/leadSlice';
import {Platform, View} from 'react-native';
import {StyleSheet} from 'react-native';

const LeadSearchBarAux = ({
  style = null,
  readonly = false,
  title = 'Crm_Leads',
  defaultValue = '',
  onChange = () => {},
  required = false,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
  showTitle = true,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const Colors = useThemeColor();

  const {leadList, loadingLead, moreLoading, isListEnd} = useSelector(
    state => state.lead,
  );

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const fetchLeadSearchBarAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(fetchLeads({page, searchValue}));
    },
    [dispatch],
  );

  if (readonly) {
    return (
      <FormInput
        style={style}
        title={title}
        readOnly={true}
        defaultValue={defaultValue?.fullName}
      />
    );
  }

  return (
    <View style={[Platform.OS === 'ios' ? styles.container : null]}>
      {showTitle && <Text style={styles.title}>{I18n.t(title)}</Text>}
      <AutoCompleteSearch
        style={[
          defaultValue == null && required ? styles.requiredBorder : null,
        ]}
        objectList={leadList}
        value={defaultValue}
        onChangeValue={onChange}
        fetchData={fetchLeadSearchBarAPI}
        displayValue={displayItemFullname}
        placeholder={I18n.t(title)}
        showDetailsPopup={showDetailsPopup}
        loadingList={loadingLead}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        navigate={navigate}
        oneFilter={oneFilter}
        isFocus={isFocus}
      />
    </View>
  );
};

const LeadSearchBar = ({
  style = null,
  readonly = false,
  title = 'Crm_Leads',
  defaultValue = '',
  onChange = () => {},
  required = false,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
  showTitle = true,
}) => {
  return (
    <LeadSearchBarAux
      style={style}
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
      required={required}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
      showTitle={showTitle}
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

export default LeadSearchBar;
