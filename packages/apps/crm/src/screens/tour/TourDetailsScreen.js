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

import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  TourValidateButton,
  TourDetailsHeader,
  TourItineraryButton,
  TourLineActionCard,
} from '../../components';
import {fetchTourById} from '../../features/tourSlice';
import {searchTourLine} from '../../features/tourLineSlice';
import {TourLine} from '../../types';

const TourDetailsScreen = ({route}) => {
  const {tourId} = route.params;

  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {tour} = useSelector(state => state.tour);
  const {tourLineList, loadingTourLineList, moreLoading, isListEnd} =
    useSelector(state => state.tourLine);

  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    dispatch(fetchTourById({tourId: tourId}));
  }, [dispatch, tourId]);

  const fetchTourLineAPI = useCallback(
    (page = 0) => {
      dispatch(
        searchTourLine({
          page: page,
          tourId: tour?.id,
          isValidated: selectedStatus[0]?.key,
        }),
      );
    },
    [dispatch, selectedStatus, tour],
  );

  if (tour?.id !== tourId) {
    return null;
  }

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={<TourValidateButton tourId={tourId} />}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<TourDetailsHeader />}
        chipComponent={
          <View style={styles.chipContainer}>
            <ChipSelect
              style={styles.chipSelect}
              width={Dimensions.get('window').width * 0.4}
              mode="switch"
              onChangeValue={setSelectedStatus}
              selectionItems={TourLine.getStatusList(Colors, I18n)}
            />
            <TourItineraryButton />
          </View>
        }
      />
      <ScrollList
        loadingList={loadingTourLineList}
        data={tourLineList}
        fetchData={fetchTourLineAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
        renderItem={({item}) => (
          <TourLineActionCard
            partner={item?.partner}
            address={item?.address?.fullName}
            isValidated={item?.isValidated}
            eventId={item?.event?.id}
            id={item.id}
            version={item.version}
            tourId={tourId}
            selectedStatus={selectedStatus[0]?.key}
          />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
  },
  chipSelect: {
    marginHorizontal: 0,
  },
});

export default TourDetailsScreen;
