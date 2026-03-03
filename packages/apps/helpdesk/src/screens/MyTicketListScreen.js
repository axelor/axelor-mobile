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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ChipSelect, MultiValuePicker, Screen} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useDispatch,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  fetchMyTickets,
  fetchTicketStatus,
  fetchTicketType,
} from '../features/ticketSlice';
import {TicketCard} from '../components';

const MyTicketListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {Ticket} = useTypes();
  const {getCustomSelectionItems, getSelectionItems} = useTypeHelpers();

  const {userId} = useSelector(state => state.auth);
  const {
    ticketList,
    loadingTicketList,
    moreLoading,
    isListEnd,
    ticketTypeList,
    ticketStatusList,
  } = useSelector(state => state.ticket);

  const [selectedType, setSelectedType] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState(
    getSelectionItems(Ticket?.prioritySelect).filter(({value}) =>
      [Ticket?.prioritySelect.High, Ticket?.prioritySelect.Urgent].includes(
        value,
      ),
    ),
  );

  const displayItemTicketSeq = item => item.ticketSeq;

  useEffect(() => {
    dispatch(fetchTicketType());
    dispatch(fetchTicketStatus());
  }, [dispatch]);

  const ticketTypeListItems = useMemo(
    () => getCustomSelectionItems(ticketTypeList, 'name'),
    [getCustomSelectionItems, ticketTypeList],
  );

  const ticketStatusListItems = useMemo(
    () => getCustomSelectionItems(ticketStatusList, 'name'),
    [getCustomSelectionItems, ticketStatusList],
  );

  const sliceFunctionData = useMemo(
    () => ({
      userId,
      statusList: selectedStatus,
      typeList: selectedType,
      priorityList: selectedPriority,
    }),
    [selectedPriority, selectedStatus, selectedType, userId],
  );

  const priorityList = useMemo(
    () => getSelectionItems(Ticket?.prioritySelect, selectedPriority),
    [Ticket?.prioritySelect, getSelectionItems, selectedPriority],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        list={ticketList}
        loading={loadingTicketList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchMyTickets}
        sliceFunctionData={sliceFunctionData}
        displaySearchValue={displayItemTicketSeq}
        searchPlaceholder={I18n.t('Helpdesk_Ticket')}
        chipComponent={
          <ChipSelect
            mode="multi"
            onChangeValue={setSelectedPriority}
            selectionItems={priorityList}
          />
        }
        headerChildren={
          <View style={styles.headerContainer}>
            <MultiValuePicker
              listItems={ticketStatusListItems}
              title={I18n.t('Helpdesk_Status')}
              onValueChange={statusList => setSelectedStatus(statusList)}
            />
            <MultiValuePicker
              listItems={ticketTypeListItems}
              title={I18n.t('Helpdesk_Type')}
              onValueChange={typeList => setSelectedType(typeList)}
            />
          </View>
        }
        renderListItem={({item}) => (
          <TicketCard
            style={styles.item}
            ticketSeq={item.ticketSeq}
            subject={item.subject}
            progressSelect={item.progressSelect}
            ticketType={item.ticketType}
            allTicketStatus={ticketStatusList}
            ticketStatus={item.ticketStatus}
            deadlineDateT={item.deadlineDateT}
            responsibleUser={item?.responsibleUser?.fullName}
            prioritySelect={item.prioritySelect}
            duration={item.duration}
            allTicketType={ticketTypeList}
            onPress={() =>
              navigation.navigate('TicketDetailsScreen', {
                idTicket: item.id,
              })
            }
          />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
  headerContainer: {
    alignItems: 'center',
    zIndex: 30,
  },
});

export default MyTicketListScreen;
