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
import {
  useDispatch,
  useSelector,
  useTranslator,
  HeaderOptionsMenu,
} from '@axelor/aos-mobile-core';
import {
  InventoryLocationsMoveCard,
  InventoryViewAllContainer,
  InventoryButtons,
  InventoryDetailsHeader,
} from '../../components';
import {fetchInventoryLines} from '../../features/inventoryLineSlice';
import {fetchInventoryById} from '../../features/inventorySlice';

const InventoryStartedDetailsScreen = ({route, navigation}) => {
  const inventoryId = route.params.inventoryId;
  const {loading, inventory} = useSelector(state => state.inventory);
  const {loadingInventoryLines} = useSelector(state => state.inventoryLine);
  const {mobileSettings} = useSelector(state => state.config);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInventoryById({inventoryId: inventoryId}));
    dispatch(fetchInventoryLines({inventoryId: inventoryId, page: 0}));
  }, [dispatch, inventoryId]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.stock.db.Inventory"
          modelId={inventory?.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnStockApp}
        />
      ),
    });
  }, [I18n, mobileSettings, navigation, inventory]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={<InventoryButtons navigation={navigation} />}
      loading={loadingInventoryLines || loading || inventory == null}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<InventoryDetailsHeader />}
      />
      <ScrollView>
        <InventoryLocationsMoveCard />
        <InventoryViewAllContainer navigation={navigation} />
      </ScrollView>
    </Screen>
  );
};

export default InventoryStartedDetailsScreen;
