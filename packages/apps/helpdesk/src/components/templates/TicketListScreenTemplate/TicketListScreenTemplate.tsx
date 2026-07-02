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
  fetchTicketStatus,
  fetchTicketType,
} from '../../../features/ticketSlice';
import {TicketCard} from '../../molecules';

interface TicketListScreenTemplateProps {
  list: any[];
  loading: boolean;
  moreLoading: boolean;
  isListEnd: boolean;
  sliceFunction: (...args: any[]) => any;
  sliceFunctionData?: object;
  showAssigned?: boolean;
}

const displayItemTicketSeq = (item: any) => item.ticketSeq;

const TicketListScreenTemplate = ({
  list,
  loading,
  moreLoading,
  isListEnd,
  sliceFunction,
  sliceFunctionData,
  showAssigned,
}: TicketListScreenTemplateProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {Ticket} = useTypes();
  const {getCustomSelectionItems, getSelectionItems} = useTypeHelpers();

  const {ticketTypeList, ticketStatusList} = useSelector(state => state.ticket);

  const [selectedType, setSelectedType] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<any[]>(
    getSelectionItems(Ticket?.prioritySelect).filter(({value}) =>
      [Ticket?.prioritySelect.High, Ticket?.prioritySelect.Urgent].includes(
        value,
      ),
    ),
  );

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

  const fullSliceFunctionData = useMemo(
    () => ({
      ...sliceFunctionData,
      statusList: selectedStatus,
      typeList: selectedType,
      priorityList: selectedPriority,
    }),
    [sliceFunctionData, selectedStatus, selectedType, selectedPriority],
  );

  const priorityList = useMemo(
    () => getSelectionItems(Ticket?.prioritySelect, selectedPriority),
    [Ticket?.prioritySelect, getSelectionItems, selectedPriority],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        list={list}
        loading={loading}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={sliceFunction}
        sliceFunctionData={fullSliceFunctionData}
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
              style={styles.picker}
              listItems={ticketStatusListItems}
              placeholder={I18n.t('Helpdesk_Status')}
              onValueChange={setSelectedStatus}
            />
            <MultiValuePicker
              style={styles.picker}
              listItems={ticketTypeListItems}
              placeholder={I18n.t('Helpdesk_Type')}
              onValueChange={setSelectedType}
            />
          </View>
        }
        renderListItem={({item}) => (
          <TicketCard
            style={styles.item}
            {...item}
            allTicketStatus={ticketStatusList}
            allTicketType={ticketTypeList}
            showAssigned={showAssigned}
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
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 30,
    gap: 5,
  },
  picker: {
    flex: 1,
  },
});

export default TicketListScreenTemplate;
