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
import {fetchLeads} from '../../../features/leadSlice';

const LeadSearchBarAux = ({
  style,
  title,
  defaultValue,
  onChange,
  readonly,
  required,
  showDetailsPopup,
  navigate,
  oneFilter,
  showTitle,
  onFetchDataAction,
}: SearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {leadList, loadingLead, moreLoading, isListEnd} = useSelector(
    (state: any) => state.lead,
  );

  const fetchLeadSearchBarAPI = useCallback(
    ({page = 0, searchValue}) => {
      onFetchDataAction && onFetchDataAction(searchValue);
      dispatch((fetchLeads as any)({page, searchValue}));
    },
    [dispatch, onFetchDataAction],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
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
      required={required}
      readonly={readonly}
    />
  );
};

interface SearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (item: any) => void;
  readonly?: boolean;
  required?: boolean;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  showTitle?: boolean;
  onFetchDataAction?: (searchValue: string) => void;
}

const LeadSearchBar = ({
  style = null,
  title = 'Crm_Leads',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  showTitle = false,
  onFetchDataAction,
}: SearchBarProps) => {
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
      showTitle={showTitle}
      onFetchDataAction={onFetchDataAction}
    />
  );
};

export default LeadSearchBar;
