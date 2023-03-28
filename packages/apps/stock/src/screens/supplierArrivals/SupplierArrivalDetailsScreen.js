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

import React from 'react';
import {HeaderContainer, Screen, ScrollView} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useTranslator,
  HeaderOptionsMenu,
} from '@axelor/aos-mobile-core';
import {
  SupplierArrivalHeader,
  SupplierArrivalButtons,
  SupplierArrivalMovementIndicationCard,
  SupplierArrivalViewAllContainer,
} from '../../components';

const SupplierArrivalDetailsScreen = ({route, navigation}) => {
  const supplierArrival = route.params.supplierArrival;
  const I18n = useTranslator();

  const {mobileSettings} = useSelector(state => state.config);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.stock.db.StockMove"
          modelId={supplierArrival?.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnStockApp}
        />
      ),
    });
  }, [I18n, mobileSettings, navigation, supplierArrival]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <SupplierArrivalButtons
          supplierArrival={supplierArrival}
          navigation={navigation}
        />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<SupplierArrivalHeader supplierArrival={supplierArrival} />}
      />
      <ScrollView>
        <SupplierArrivalMovementIndicationCard
          supplierArrival={supplierArrival}
        />
        <SupplierArrivalViewAllContainer
          supplierArrival={supplierArrival}
          navigation={navigation}
        />
      </ScrollView>
    </Screen>
  );
};

export default SupplierArrivalDetailsScreen;
