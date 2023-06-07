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
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {fetchTickets} from '../../../features/ticketSlice';

const TicketSearchBar = ({
  placeholderKey = 'Helpdesk_ticket',
  defaultValue = '',
  onChange = () => {},
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const displayItemTicketSeq = item => item.ticketSeq;

  const {ticketList, loadingTicket, moreLoading, isListEnd} = useSelector(
    state => state.ticket,
  );
  const {userId} = useSelector(state => state.auth);

  const fetchTicketSearchBarAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        fetchTickets({page: page, searchValue: searchValue, userId: userId}),
      );
    },
    [dispatch, userId],
  );

  return (
    <AutoCompleteSearch
      objectList={ticketList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchTicketSearchBarAPI}
      displayValue={displayItemTicketSeq}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingTicket}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
    />
  );
};

export default TicketSearchBar;
