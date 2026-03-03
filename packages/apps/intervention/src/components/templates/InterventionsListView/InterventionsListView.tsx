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
import {
  DateInput,
  filterChip,
  SearchListView,
  useNavigation,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {ChipSelect, ToggleButton} from '@axelor/aos-mobile-ui';
import {InterventionDetailCard} from '../../molecules';
import {fetchIntervention} from '../../../features/interventionSlice';

interface InterventionsListViewProps {
  statusList: number[];
  defaultDate?: Date;
}

const InterventionsListView = ({
  statusList,
  defaultDate,
}: InterventionsListViewProps) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const {Intervention} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {loading, moreLoading, isListEnd, interventionList} = useSelector(
    (state: any) => state.intervention_intervention,
  );
  const {user} = useSelector(state => state.user);

  const [filteredList, setFilteredList] = useState(interventionList);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [isAssignedToMe, setIsAssignedToMe] = useState(true);

  useEffect(
    () =>
      setFilteredList(
        filterChip(interventionList, selectedStatus, 'statusSelect'),
      ),
    [interventionList, selectedStatus],
  );

  const sliceFunctionData = useMemo(
    () => ({
      userId: isAssignedToMe ? user.id : null,
      date: selectedDate,
      statusList: statusList,
      companyId: user.activeCompany?.id,
    }),
    [isAssignedToMe, selectedDate, statusList, user],
  );

  const interventionStatusList = useMemo(
    () =>
      getSelectionItems(Intervention?.statusSelect, selectedStatus).filter(
        ({value}) => statusList.includes(value as number),
      ),
    [Intervention?.statusSelect, getSelectionItems, selectedStatus, statusList],
  );

  const handleItemPress = item => {
    item &&
      navigation.navigate('InterventionDetailsScreen', {
        interventionId: item.id,
      });
  };

  return (
    <SearchListView
      list={filteredList}
      loading={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      sliceFunction={fetchIntervention}
      sliceFunctionData={sliceFunctionData}
      onChangeSearchValue={handleItemPress}
      searchPlaceholder={I18n.t('Base_Search')}
      headerChildren={
        <View style={styles.headerContainer}>
          <ToggleButton
            isActive={isAssignedToMe}
            onPress={() => setIsAssignedToMe(current => !current)}
            buttonConfig={{
              iconName: 'person-fill',
              width: '10%',
              style: styles.toggleButton,
            }}
          />
          <DateInput
            style={styles.dateInput}
            mode="date"
            popup
            nullable={true}
            defaultDate={selectedDate}
            onDateChange={date => setSelectedDate(date)}
          />
        </View>
      }
      chipComponent={
        <ChipSelect
          mode="multi"
          onChangeValue={setSelectedStatus}
          selectionItems={interventionStatusList}
        />
      }
      renderListItem={({item}) => (
        <InterventionDetailCard
          intervention={item}
          onPress={() => handleItemPress(item)}
        />
      )}
    />
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

export default InterventionsListView;
