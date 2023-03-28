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
  InventoryDetailsHeader,
  InventoryButtons,
  InventoryDescription,
} from '../../components';
import {fetchInventoryById} from '../../features/inventorySlice';

const InventoryPlannedDetailsScreen = ({route, navigation}) => {
  const {loading, inventory} = useSelector(state => state.inventory);
  const {mobileSettings} = useSelector(state => state.config);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInventoryById({inventoryId: route.params.inventoryId}));
  }, [dispatch, route.params.inventoryId]);

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
      loading={loading || inventory == null}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<InventoryDetailsHeader />}
      />
      <ScrollView>
        <InventoryLocationsMoveCard />
        <InventoryDescription />
      </ScrollView>
    </Screen>
  );
};

export default InventoryPlannedDetailsScreen;
