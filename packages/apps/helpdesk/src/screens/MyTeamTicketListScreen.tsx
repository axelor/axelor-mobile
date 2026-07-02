/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {useMemo} from 'react';
import {useSelector} from '@axelor/aos-mobile-core';
import {fetchMyTeamTickets} from '../features/ticketSlice';
import {TicketListScreenTemplate} from '../components';

const MyTeamTicketListScreen = () => {
  const {user} = useSelector(state => state.user);
  const {
    myTeamTicketList,
    loadingMyTeamTicket,
    moreMoadingMyTeamTicket,
    isListEndMyTeamTicket,
  } = useSelector(state => state.ticket);

  const sliceFunctionData = useMemo(
    () => ({userTeam: user.activeTeam}),
    [user.activeTeam],
  );

  return (
    <TicketListScreenTemplate
      list={myTeamTicketList}
      loading={loadingMyTeamTicket}
      moreLoading={moreMoadingMyTeamTicket}
      isListEnd={isListEndMyTeamTicket}
      sliceFunction={fetchMyTeamTickets}
      sliceFunctionData={sliceFunctionData}
      showAssigned
    />
  );
};

export default MyTeamTicketListScreen;
