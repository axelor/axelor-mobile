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
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  AutoCompleteSearch,
  FormInput,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {searchUser} from '../../../features/userSlice';
import {displayItemFullname} from '../../../utils/displayers';
import {Platform} from 'react-native';

const UserSearchBar = ({
  title = 'Helpdesk_User',
  defaultValue = null,
  onChange = () => {},
  style = null,
  readonly = false,
  required = false,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {userList, loadingUser, moreLoading, isListEnd} = useSelector(
    state => state.userList,
  );

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const searchUserTypeAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(searchUser({page, searchValue}));
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
          defaultValue == null && required ? styles.requiredBorder : null,
        ]}
        objectList={userList}
        value={defaultValue}
        onChangeValue={onChange}
        fetchData={searchUserTypeAPI}
        displayValue={displayItemFullname}
        placeholder={I18n.t(title)}
        showDetailsPopup={true}
        loadingList={loadingUser}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
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
      marginHorizontal: 24,
    },
    requiredBorder: {
      borderColor: Colors.errorColor.background,
    },
  });

export default UserSearchBar;
