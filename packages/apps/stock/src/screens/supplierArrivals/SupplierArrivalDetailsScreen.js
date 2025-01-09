/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {HeaderContainer, Screen, ScrollView} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch} from '@axelor/aos-mobile-core';
import {
  SupplierArrivalHeader,
  SupplierArrivalButtons,
  SupplierArrivalMovementIndicationCard,
  SupplierArrivalSearchLineContainer,
} from '../../components';
import {fetchSupplierArrival} from '../../features/supplierArrivalSlice';

const SupplierArrivalDetailsScreen = ({route, navigation}) => {
  const supplierArrivalId = route.params.supplierArrivalId;
  const dispatch = useDispatch();

  const {supplierArrival} = useSelector(state => state.supplierArrival);

  useEffect(() => {
    dispatch(fetchSupplierArrival({supplierArrivalId: supplierArrivalId}));
  }, [supplierArrivalId, dispatch]);

  if (supplierArrival?.id !== supplierArrivalId) {
    return null;
  }

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={<SupplierArrivalButtons supplierArrival={supplierArrival} />}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<SupplierArrivalHeader supplierArrival={supplierArrival} />}
      />
      <ScrollView>
        <SupplierArrivalMovementIndicationCard
          supplierArrival={supplierArrival}
        />
        <SupplierArrivalSearchLineContainer />
      </ScrollView>
    </Screen>
  );
};

export default SupplierArrivalDetailsScreen;
