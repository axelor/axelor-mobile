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
import {StyleSheet, View} from 'react-native';
import {Screen, HeaderContainer, ScrollList} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {fetchTickets} from '../../features/ticketSlice';
import {TicketCard} from '../../components';
import {TicketSearchBar} from '../../components/templates';

const MyTicketListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {userId} = useSelector(state => state.auth);
  const {ticketList, loadingTicket, moreLoading, isListEnd} = useSelector(
    state => state.ticket,
  );

  console.log(ticketList);

  const fetchTicketsAPI = useCallback(
    (page = 0) => {
      dispatch(fetchTickets({userId: userId, page: page}));
    },
    [dispatch, userId],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={true}
        fixedItems={
          <View style={styles.headerContainer}>
            <TicketSearchBar showDetailsPopup={false} oneFilter={true} />
          </View>
        }
      />
      <ScrollList
        loadingList={loadingTicket}
        data={ticketList}
        renderItem={({item}) => (
          <TicketCard
            style={styles.item}
            ticketSeq={item.ticketSeq}
            subject={item.subject}
            progressSelect={item.progressSelect}
            ticketType={item.ticketType}
            statusSelect={item.statusSelect}
            deadlineDateT={item.deadlineDateT}
            responsibleUser={item?.responsibleUser?.fullname}
            prioritySelect={item.prioritySelect}
          />
        )}
        fetchData={fetchTicketsAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
  headerContainer: {alignItems: 'center'},
  toggleSwitchContainer: {width: '90%', height: 40},
  toggle: {width: '54%', height: 38, borderRadius: 13},
});

export default MyTicketListScreen;
