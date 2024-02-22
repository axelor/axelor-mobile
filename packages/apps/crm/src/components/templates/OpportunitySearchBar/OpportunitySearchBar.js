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
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {fetchOpportunities} from '../../../features/opportunitySlice';

const OpportunitySearchBar = ({
  placeholderKey = 'Crm_Opportunity',
  defaultValue = '',
  onChange = () => {},
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
  onFetchDataAction,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {opportunityList, loading, moreLoading, isListEnd} = useSelector(
    state => state.opportunity,
  );

  const fetchOpportunitiesSearchBarAPI = useCallback(
    ({page = 0, searchValue}) => {
      onFetchDataAction && onFetchDataAction(searchValue);
      dispatch(fetchOpportunities({page, searchValue}));
    },
    [dispatch, onFetchDataAction],
  );

  return (
    <AutoCompleteSearch
      objectList={opportunityList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchOpportunitiesSearchBarAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
    />
  );
};

export default OpportunitySearchBar;
