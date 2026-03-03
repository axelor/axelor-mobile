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

import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  HeaderContainer,
  Screen,
  ScrollList,
  ToggleButton,
} from '@axelor/aos-mobile-ui';
import {
  DateInput,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {searchTour} from '../../features/tourSlice';
import {TourCard} from '../../components';

const TourListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {userId} = useSelector(state => state.auth);
  const {tourList, loadingTourList, moreLoading, isListEnd} = useSelector(
    state => state.tour,
  );

  const [isSalesFilter, setIsSaleFilter] = useState(false);
  const [dateFilter, setDateFilter] = useState(null);

  const fetchTourAPI = useCallback(
    (page = 0) => {
      dispatch(
        searchTour({
          page: page,
          isSalesperson: isSalesFilter,
          userId: userId,
          date: dateFilter,
        }),
      );
    },
    [dispatch, isSalesFilter, userId, dateFilter],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View style={styles.headerContainer}>
            <ToggleButton
              isActive={isSalesFilter}
              onPress={() => setIsSaleFilter(current => !current)}
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
      />
      <ScrollList
        loadingList={loadingTourList}
        data={tourList}
        renderItem={({item}) => (
          <TourCard
            tour={item}
            onPress={() =>
              navigation.navigate('TourDetailsScreen', {
                tourId: item.id,
              })
            }
          />
        )}
        fetchData={fetchTourAPI}
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

export default TourListScreen;
