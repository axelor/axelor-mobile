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

import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {HeaderContainer, Screen, Text} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {TourDetailsHeader} from '../../components';
import {fetchControlTourById} from '../../features/tourSlice';

const TourDetailsScreen = ({navigation, route}) => {
  const {tourId} = route.params;
  const dispatch = useDispatch();

  const {tour} = useSelector(state => state.tour);

  console.log('tour', tour);

  useEffect(() => {
    dispatch(fetchControlTourById({tourId: tourId}));
  }, [dispatch, tourId]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<TourDetailsHeader />}
      />
      <Text>Test</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default TourDetailsScreen;
