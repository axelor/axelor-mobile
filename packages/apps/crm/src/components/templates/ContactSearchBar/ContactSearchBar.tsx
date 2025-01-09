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
import {fetchContact} from '../../../features/contactSlice';
import {displayItemFullname} from '../../../utils/displayers';

interface SearchBarProps {
  style?: any;
  titleKey?: string;
  placeholderKey?: string;
  defaultValue?: string;
  onChange?: (item: any) => void;
  required?: boolean;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  showTitle?: boolean;
  onFetchDataAction?: (searchValue: string) => void;
}

const ContactSearchBar = ({
  placeholderKey = 'Crm_Contacts',
  defaultValue = null,
  onChange = () => {},
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  showTitle = true,
  style,
  titleKey = 'Crm_Contact',
  required,
  onFetchDataAction,
}: SearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {contactList, loadingContact, moreLoading, isListEnd} = useSelector(
    (state: any) => state.contact,
  );

  const fetchContactSearchBarAPI = useCallback(
    ({page = 0, searchValue}) => {
      onFetchDataAction && onFetchDataAction(searchValue);
      dispatch((fetchContact as any)({page, searchValue}));
    },
    [dispatch, onFetchDataAction],
  );

  return (
    <AutoCompleteSearch
      title={showTitle && I18n.t(titleKey)}
      objectList={contactList}
      value={defaultValue}
      required={required}
      onChangeValue={onChange}
      fetchData={fetchContactSearchBarAPI}
      displayValue={displayItemFullname}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingContact}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      navigate={navigate}
      oneFilter={oneFilter}
      style={style}
    />
  );
};

export default ContactSearchBar;
