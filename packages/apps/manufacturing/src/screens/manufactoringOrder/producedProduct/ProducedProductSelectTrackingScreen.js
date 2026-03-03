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
  ClearableCard,
  Icon,
  Screen,
  ScrollView,
  HeaderContainer,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {TrackingNumberSearchBar} from '@axelor/aos-mobile-stock';
import {ManufacturingOrderHeader} from '../../../components';

const trackingNumberScanKey =
  'tracking-number_manufacturing-order-produced-product-select';

const ProducedProductSelectTrackingScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const manufOrder = route.params.manufOrder;
  const product = route.params.product;

  const handleTrackingNumberSelection = item => {
    if (item != null) {
      navigation.navigate('ProducedProductDetailsScreen', {
        manufOrderId: manufOrder.id,
        product: product,
        trackingNumber: item,
      });
    }
  };

  return (
    <Screen removeSpaceOnTop={true}>
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
        <ClearableCard valueTxt={product.name} clearable={false} />
        <View style={styles.trackingNumber}>
          <Text style={styles.text_secondary}>
            {I18n.t('Stock_AddTrackingNumber')}
          </Text>
          <Icon
            name="plus-lg"
            color={Colors.primaryColor.background}
            size={24}
            style={styles.action}
            touchable={true}
            onPress={() => {}}
          />
        </View>
        <TrackingNumberSearchBar
          scanKey={trackingNumberScanKey}
          onChange={handleTrackingNumberSelection}
          isFocus={true}
          changeScreenAfter={true}
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
    marginBottom: 5,
  },
  text_secondary: {
    fontSize: 14,
  },
  action: {
    marginLeft: 10,
  },
});

export default ProducedProductSelectTrackingScreen;
