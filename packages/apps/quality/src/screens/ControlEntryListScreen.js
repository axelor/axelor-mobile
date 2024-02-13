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

import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  HeaderContainer,
  Screen,
  ScrollList,
  ToggleButton,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  DateInput,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {searchControlEntry} from '../features/controlEntrySlice';
import {ControlEntryCard} from '../components';

const ControlEntryListScreen = ({navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {userId} = useSelector(state => state.auth);
  const {controlEntryList, loadingControlEntryList, moreLoading, isListEnd} =
    useSelector(state => state.controlEntry);

  const [isInspectorFilter, setIsInspectorFilter] = useState(false);
  const [dateFilter, setDateFilter] = useState(null);

  const fetchControlEntryAPI = useCallback(
    (page = 0) => {
      dispatch(
        searchControlEntry({
          page: page,
          isInspector: isInspectorFilter,
          userId: userId,
          date: dateFilter,
        }),
      );
    },
    [dispatch, isInspectorFilter, userId, dateFilter],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View style={styles.headerContainer}>
            <ToggleButton
              isActive={isInspectorFilter}
              onPress={() => setIsInspectorFilter(current => !current)}
              activeColor={Colors.successColor}
              buttonConfig={{
                iconName: 'person-fill',
                width: '10%',
                style: styles.toggleButton,
              }}
            />
            <DateInput
              style={styles.dateInput}
              nullable={true}
              defaultDate={dateFilter}
              onDateChange={setDateFilter}
              mode="date"
              popup
            />
          </View>
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
              setDateFilter(null);
              setIsInspectorFilter(false);
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '-5%',
  },
  toggleButton: {
    height: 40,
    top: '16%',
  },
  dateInput: {
    width: '80%',
  },
});

export default ControlEntryListScreen;
