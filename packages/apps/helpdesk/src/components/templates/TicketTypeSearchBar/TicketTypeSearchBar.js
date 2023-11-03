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

import React, {useCallback} from 'react';
import {
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchTicketType} from '../../../features/ticketSlice';

const TicketTypeSearchBar = ({
  placeholderKey = 'Helpdesk_Type',
  titleKey = 'Helpdesk_Type',
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

  const {
    ticketTypeList,
    loadingTicketType,
    moreLoadingTicketType,
    isListEndTicketType,
  } = useSelector(state => state.ticket);

  const searchTicketTypeAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(searchTicketType({page, searchValue}));
    },
    [dispatch],
  );

  return (
    <AutoCompleteSearch
      title={showTitle && I18n.t(titleKey)}
      objectList={ticketTypeList}
      value={defaultValue}
      required={required}
      onChangeValue={onChange}
      fetchData={searchTicketTypeAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingTicketType}
      moreLoading={moreLoadingTicketType}
      isListEnd={isListEndTicketType}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
      style={style}
    />
  );
};

export default TicketTypeSearchBar;
