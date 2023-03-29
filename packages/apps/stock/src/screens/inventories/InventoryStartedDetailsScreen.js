/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {
  InventoryLocationsMoveCard,
  InventoryViewAllContainer,
  InventoryButtons,
  InventoryDetailsHeader,
} from '../../components';
import {fetchInventoryById} from '../../features/inventorySlice';

const InventoryStartedDetailsScreen = ({route, navigation}) => {
  const inventoryId = route.params.inventoryId;
  const dispatch = useDispatch();

  const {loading, inventory} = useSelector(state => state.inventory);

  useEffect(() => {
    dispatch(fetchInventoryById({inventoryId: inventoryId}));
  }, [dispatch, inventoryId]);

  if (inventory?.id !== inventoryId) {
    return null;
  }

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={<InventoryButtons />}
      loading={loading}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<InventoryDetailsHeader />}
      />
      <ScrollView>
        <InventoryLocationsMoveCard />
        <InventoryViewAllContainer />
      </ScrollView>
    </Screen>
  );
};

export default InventoryStartedDetailsScreen;
