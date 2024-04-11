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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  ChipSelect,
  MultiValuePicker,
  Screen,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  fetchMyTickets,
  fetchTicketStatus,
  fetchTicketType,
} from '../features/ticketSlice';
import {TicketCard} from '../components';
import {Ticket} from '../types';

const MyTicketListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const Colors = useThemeColor();

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
    Ticket.getPriorityList(Colors, I18n).filter(e => e.isActive === true),
  );

  const displayItemTicketSeq = item => item.ticketSeq;

  useEffect(() => {
    dispatch(fetchTicketType());
    dispatch(fetchTicketStatus());
  }, [dispatch]);

  const ticketTypeListItems = useMemo(() => {
    return ticketTypeList
      ? ticketTypeList.map((type, index) => {
          return {
            title: type.name,
            color: Ticket.getTypeColor(index, Colors),
            key: type.id,
          };
        })
      : [];
  }, [ticketTypeList, Colors]);

  const ticketStatusListItems = useMemo(() => {
    return ticketStatusList
      ? ticketStatusList.map((status, index) => {
          return {
            title: status.name,
            color: Ticket.getStatusColor(index, Colors),
            key: status.id,
          };
        })
      : [];
  }, [ticketStatusList, Colors]);

  const sliceFunctionData = useMemo(
    () => ({
      userId,
      statusList: selectedStatus,
      typeList: selectedType,
      priorityList: selectedPriority,
    }),
    [selectedPriority, selectedStatus, selectedType, userId],
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
            onChangeValue={chiplist => setSelectedPriority(chiplist)}
            selectionItems={Ticket.getPriorityList(Colors, I18n)}
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
