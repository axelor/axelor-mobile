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

import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {HeaderContainer, Screen, ScrollList, Text} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {TourDetailsHeader, TourLineCard} from '../../components';
import {fetchControlTourById} from '../../features/tourSlice';
import {searchTourLine} from '../../features/tourLineSlice';

const TourDetailsScreen = ({navigation, route}) => {
  const {tourId} = route.params;

  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {tourLineList, loadingTourLineList, moreLoading, isListEnd} =
    useSelector(state => state.tourLine);

  useEffect(() => {
    dispatch(fetchControlTourById({tourId: tourId}));
  }, [dispatch, tourId]);

  const fetchTourLineAPI = useCallback(
    (page = 0) => {
      dispatch(
        searchTourLine({
          page: page,
          tourId: tourId,
        }),
      );
    },
    [dispatch, tourId],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<TourDetailsHeader totalTourLine={tourLineList?.length} />}
      />
      <ScrollList
        loadingList={loadingTourLineList}
        data={tourLineList}
        fetchData={fetchTourLineAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
        renderItem={({item}) => (
          <TourLineCard
            name={item?.partner?.fullName}
            adress={item?.address?.fullName}
          />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default TourDetailsScreen;
