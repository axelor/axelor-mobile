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

import React, {useCallback, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  ChipSelect,
  Screen,
  ScrollList,
  ToggleButton,
} from '@axelor/aos-mobile-ui';
import {
  DateInput,
  FilterContainer,
  useActiveFilter,
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {searchControlEntry} from '../../features/controlEntrySlice';
import {ControlEntryCard} from '../../components';

const ControlEntryListScreen = ({navigation, route}) => {
  const {relatedToSelect, relatedToSelectId} = route?.params ?? {};
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {ControlEntry} = useTypes();
  const {getSelectionItems} = useTypeHelpers();
  const {activeFilter} = useActiveFilter();

  const {userId} = useSelector(state => state.auth);
  const {controlEntryList, loadingControlEntryList, moreLoading, isListEnd} =
    useSelector(state => state.controlEntry);

  const [isInspectorFilter, setIsInspectorFilter] = useState(false);
  const [dateFilter, setDateFilter] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);

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
      filterDomain: activeFilter,
      relatedToSelect,
      relatedToSelectId,
    }),
    [
      activeFilter,
      dateFilter,
      isInspectorFilter,
      relatedToSelect,
      relatedToSelectId,
      selectedStatus,
      userId,
    ],
  );

  const fetchControlEntryAPI = useCallback(
    (page = 0) => {
      dispatch((searchControlEntry as any)({page, ...sliceFunctionData}));
    },
    [dispatch, sliceFunctionData],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <FilterContainer
        expandableFilter={false}
        fixedItems={
          <View style={styles.headerContainer}>
            <ToggleButton
              isActive={isInspectorFilter}
              onPress={() => setIsInspectorFilter(current => !current)}
              buttonConfig={{
                iconName: 'person-fill',
                width: '10%',
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
            width={Dimensions.get('window').width * 0.25}
            onChangeValue={setSelectedStatus}
          />
        }
      />
      <ScrollList
        loadingList={loadingControlEntryList}
        data={controlEntryList}
        renderItem={({item}) => (
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
        fetchData={fetchControlEntryAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    height: 40,
  },
  dateInput: {
    width: '85%',
  },
});

export default ControlEntryListScreen;
