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

import React, {useCallback} from 'react';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchUser} from '../../../features/userSlice';
import {displayItemFullname} from '../../../utils/displayers';

const UserSearchBar = ({
  placeholderKey = 'Helpdesk_User',
  titleKey = 'Helpdesk_User',
  defaultValue = null,
  onChange = () => {},
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
  style,
  showTitle = true,
  required = false,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {userList, loadingUser, moreLoading, isListEnd} = useSelector(
    state => state.userList,
  );

  const searchUserTypeAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(searchUser({page, searchValue}));
    },
    [dispatch],
  );

  return (
    <AutoCompleteSearch
      title={showTitle && I18n.t(titleKey)}
      objectList={userList}
      value={defaultValue}
      required={required}
      onChangeValue={onChange}
      fetchData={searchUserTypeAPI}
      displayValue={displayItemFullname}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingUser}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
      style={style}
    />
  );
};

export default UserSearchBar;
