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
import {StyleSheet, View} from 'react-native';
import {
  displayItemName,
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
import {searchTicketType} from '../../../features/ticketSlice';
import {Platform} from 'react-native';

const TicketTypeSearchBar = ({
  title = 'Helpdesk_Type',
  defaultValue = null,
  onChange = () => {},
  style = null,
  required = false,
  readonly = false,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {
    ticketTypeList,
    loadingTicketType,
    moreLoadingTicketType,
    isListEndTicketType,
  } = useSelector(state => state.ticket);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const searchTicketTypeAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(searchTicketType({page, searchValue}));
    },
    [dispatch],
  );

  if (readonly) {
    return (
      <FormInput
        style={style}
        title={I18n.t(title)}
        readOnly={true}
        defaultValue={displayItemName(defaultValue)}
      />
    );
  }

  return (
    <View style={[Platform.OS === 'ios' ? styles.container : null]}>
      <Text style={styles.title}>{I18n.t(title)}</Text>
      <AutoCompleteSearch
        style={[
          defaultValue == null && required ? styles.requiredBorder : null,
        ]}
        objectList={ticketTypeList}
        value={defaultValue}
        onChangeValue={onChange}
        fetchData={searchTicketTypeAPI}
        displayValue={displayItemName}
        placeholder={I18n.t(title)}
        showDetailsPopup={true}
        loadingList={loadingTicketType}
        moreLoading={moreLoadingTicketType}
        isListEnd={isListEndTicketType}
        navigate={false}
        oneFilter={false}
        isFocus={false}
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
      marginHorizontal: '8%',
    },
    requiredBorder: {
      borderColor: Colors.errorColor.background,
    },
  });

export default TicketTypeSearchBar;
