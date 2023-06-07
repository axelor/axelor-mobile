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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  Screen,
  HeaderContainer,
  ScrollList,
  MultiValuePicker,
  useThemeColor,
  ChipSelect,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  filterChip,
} from '@axelor/aos-mobile-core';
import {fetchTickets, fetchTicketType} from '../features/ticketSlice';
import {TicketCard, TicketSearchBar} from '../components';
import {Ticket} from '../types';

const MyTicketListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const Colors = useThemeColor();

  const {userId} = useSelector(state => state.auth);
  const {ticketList, loadingTicket, moreLoading, isListEnd, ticketTypeList} =
    useSelector(state => state.ticket);

  const [selectedType, setSelectedType] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [priorityStatus, setPriorityStatus] = useState([
    {
      color: Ticket.getPriorityColor(Ticket.priority.Low, Colors),
      isActive: true,
      key: 1,
      title: I18n.t('Helpdesk_Priority_Low'),
    },
    {
      color: Ticket.getPriorityColor(Ticket.priority.Low, Colors),
      isActive: true,
      key: 2,
      title: I18n.t('Helpdesk_Priority_Normal'),
    },
  ]);

  useEffect(() => {
    dispatch(fetchTicketType());
  }, [dispatch]);

  const fetchTicketsAPI = useCallback(
    (page = 0) => {
      dispatch(fetchTickets({userId: userId, page: page}));
    },
    [dispatch, userId],
  );

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
    return Ticket.getStatusList(Colors, I18n);
  }, [Colors, I18n]);

  const filterOnType = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (selectedType.length > 0) {
          return list?.filter(item =>
            selectedType.find(status => item?.ticketType?.id === status.key),
          );
        } else {
          return list;
        }
      }
    },
    [selectedType],
  );

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (selectedStatus.length > 0) {
          return list?.filter(item =>
            selectedStatus.find(status => item?.statusSelect === status.key),
          );
        } else {
          return list;
        }
      }
    },
    [selectedStatus],
  );

  const filterOnPriority = useCallback(
    list => {
      return filterChip(list, priorityStatus, 'prioritySelect');
    },
    [priorityStatus],
  );

  const filteredList = useMemo(
    () => filterOnStatus(filterOnType(filterOnPriority(ticketList))),
    [ticketList, filterOnType, filterOnStatus, filterOnPriority],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={true}
        fixedItems={
          <View style={styles.headerContainer}>
            <TicketSearchBar
              showDetailsPopup={false}
              oneFilter={true}
              placeholderKey={I18n.t('Helpdesk_Ticket')}
            />
          </View>
        }
        chipComponent={
          <ChipSelect
            mode="multi"
            marginHorizontal={4}
            width={Dimensions.get('window').width * 0.3}
            onChangeValue={chiplist => setPriorityStatus(chiplist)}
            selectionItems={Ticket.getPriorityList(Colors, I18n)}
          />
        }>
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
      </HeaderContainer>
      <ScrollList
        loadingList={loadingTicket}
        data={filteredList}
        renderItem={({item}) => (
          <TicketCard
            style={styles.item}
            ticketSeq={item.ticketSeq}
            subject={item.subject}
            progressSelect={item.progressSelect}
            ticketType={item.ticketType}
            statusSelect={item.statusSelect}
            deadlineDateT={item.deadlineDateT}
            responsibleUser={item?.responsibleUser?.fullName}
            prioritySelect={item.prioritySelect}
            duration={item.duration}
            allTicketType={ticketTypeList}
            onPress={() =>
              navigation.navigate('TicketDetailsScreen', {
                idTicket: item.id,
                versionTicket: item.version,
                colorIndex: ticketTypeList?.findIndex(
                  type => type.id === item?.ticketType?.id,
                ),
              })
            }
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
