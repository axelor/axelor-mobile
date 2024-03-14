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
import {Screen, Text} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch} from '@axelor/aos-mobile-core';
import {searchEquipments} from '../../features/equipmentsSlice';

const CustomerParkScreen = ({}) => {
  const dispatch = useDispatch();

  const {loadingList, moreLoading, isListEnd, equipmentList} = useSelector(
    state => state.intervention_equipments,
  );

  useEffect(() => {
    console.log('ici');
    dispatch(searchEquipments({}));
  }, [dispatch]);

  console.log(equipmentList);

  return (
    <Screen removeSpaceOnTop={true}>
      <Text>Test</Text>
    </Screen>
  );
};

export default CustomerParkScreen;
