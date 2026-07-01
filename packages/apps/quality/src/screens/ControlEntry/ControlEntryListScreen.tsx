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

import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ChipSelect, Screen, ToggleButton} from '@axelor/aos-mobile-ui';
import {
  DateInput,
  useSelector,
  useTypes,
  useTypeHelpers,
  SearchListView,
} from '@axelor/aos-mobile-core';
import {searchControlEntry} from '../../features/controlEntrySlice';
import {ControlEntryCard} from '../../components';

const ControlEntryListScreen = ({navigation, route}: any) => {
  const {relatedToSelect, relatedToSelectId} = route?.params ?? {};
  const {ControlEntry} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {userId} = useSelector(state => state.auth);
  const {controlEntryList, loadingControlEntryList, moreLoading, isListEnd} =
    useSelector(state => state.controlEntry);

  const [isInspectorFilter, setIsInspectorFilter] = useState<boolean>(true);
  const [dateFilter, setDateFilter] = useState<Date | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);

  const statusListItems = useMemo(
    () => getSelectionItems(ControlEntry?.statusSelect, selectedStatus),
    [ControlEntry?.statusSelect, getSelectionItems, selectedStatus],
  );

  const sliceFunctionData = useMemo(
    () => ({
      isInspector: isInspectorFilter,
      userId,
      date: dateFilter,
      selectedStatus,
      relatedToSelect,
      relatedToSelectId,
    }),
    [
      dateFilter,
      isInspectorFilter,
      relatedToSelect,
      relatedToSelectId,
      selectedStatus,
      userId,
    ],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        expandableFilter={false}
        list={controlEntryList}
        loading={loadingControlEntryList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={searchControlEntry}
        sliceFunctionData={sliceFunctionData}
        displaySearchBar={false}
        topFixedItems={
          <View style={styles.headerContainer}>
            <ToggleButton
              isActive={isInspectorFilter}
              onPress={() => setIsInspectorFilter(current => !current)}
              buttonConfig={{
                iconName: 'person-fill',
                width: 30,
                style: styles.toggleButton,
              }}
            />
            <DateInput
              style={styles.dateInput}
              nullable={true}
              onDateChange={setDateFilter}
              mode="date"
              popup
            />
          </View>
        }
        chipComponent={
          <ChipSelect
            mode="multi"
            selectionItems={statusListItems}
            onChangeValue={setSelectedStatus}
          />
        }
        renderListItem={({item}) => (
          <ControlEntryCard
            sampleCount={item.sampleCount}
            entryDateTime={item.entryDateTime}
            statusSelect={item.statusSelect}
            name={item.name}
            controlEntryId={item.id}
            onPress={() => {
              navigation.navigate('ControlEntryDetailsScreen', {
                controlEntryId: item.id,
              });
            }}
          />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  toggleButton: {
    height: 40,
  },
  dateInput: {
    flex: 1,
  },
});

export default ControlEntryListScreen;
