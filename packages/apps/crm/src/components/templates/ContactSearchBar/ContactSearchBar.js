/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
  displayItemFullname,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {fetchContact} from '../../../features/contactSlice';

const ContactSearchBarAux = ({
  style = null,
  title = 'Crm_Contacts',
  defaultValue = null,
  onChange = () => {},
  required = false,
  readonly = false,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
  showTitle = false,
  onFetchDataAction,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {contactList, loadingContact, moreLoading, isListEnd} = useSelector(
    state => state.contact,
  );

  const fetchContactSearchBarAPI = useCallback(
    ({page = 0, searchValue}) => {
      onFetchDataAction && onFetchDataAction(searchValue);
      dispatch(fetchContact({page, searchValue}));
    },
    [dispatch, onFetchDataAction],
  );

  return (
    <AutoCompleteSearch
      title={showTitle && I18n.t(title)}
      objectList={contactList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={fetchContactSearchBarAPI}
      displayValue={displayItemFullname}
      placeholder={I18n.t(title)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingContact}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
      style={style}
    />
  );
};

const ContactSearchBar = ({
  style = null,
  title = 'Crm_Contacts',
  defaultValue = null,
  onChange = () => {},
  required = false,
  readonly = false,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
  showTitle = false,
  onFetchDataAction = () => {},
}) => {
  return (
    <ContactSearchBarAux
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
      onFetchDataAction={onFetchDataAction}
    />
  );
};

export default ContactSearchBar;
