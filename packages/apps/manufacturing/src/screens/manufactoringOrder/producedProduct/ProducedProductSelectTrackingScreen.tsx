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

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Icon,
  Screen,
  ScrollView,
  HeaderContainer,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {
  ProductCardInfo,
  TrackingNumberSearchBar,
} from '@axelor/aos-mobile-stock';
import {ManufacturingOrderHeader} from '../../../components';

const trackingNumberScanKey =
  'tracking-number_manufacturing-order-produced-product-select';

const ProducedProductSelectTrackingScreen = ({navigation, route}: any) => {
  const {manufOrder, product} = route?.params ?? {};
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const handleTrackingNumberSelection = (item: any) => {
    if (item != null) {
      navigation.navigate('ProducedProductDetailsScreen', {
        manufOrderId: manufOrder.id,
        product,
        trackingNumber: item,
      });
    }
  };

  return (
    <Screen removeSpaceOnTop>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <ManufacturingOrderHeader
            parentMO={manufOrder.parentMO}
            reference={manufOrder.manufOrderSeq}
            status={manufOrder.statusSelect}
            priority={manufOrder.prioritySelect}
          />
        }
      />
      <ScrollView>
        <ProductCardInfo product={product} />
        <View style={styles.trackingNumber}>
          <Text>{I18n.t('Stock_AddTrackingNumber')}</Text>
          <Icon
            name="plus-lg"
            color={Colors.primaryColor.background}
            size={20}
            touchable
            onPress={() => {}}
          />
        </View>
        <TrackingNumberSearchBar
          scanKey={trackingNumberScanKey}
          onChange={handleTrackingNumberSelection}
          isFocus
          changeScreenAfter
          product={product}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  trackingNumber: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 16,
    gap: 5,
  },
});

export default ProducedProductSelectTrackingScreen;
