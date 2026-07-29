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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  useNavigation,
  usePermitted,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {TrackingNumberSearchBar} from '../../../templates';

const trackingScanKey = 'tracking_supplier-arrival-select';

const SupplierArrivalTrackingNumberSelect = ({
  style,
  product,
  supplierArrivalLine,
  supplierArrival,
  handleTrackingNumberSelection,
}: {
  style?: any;
  product: any;
  supplierArrivalLine?: any;
  supplierArrival: any;
  handleTrackingNumberSelection: (_v?: any) => void;
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.TrackingNumber',
  });

  const handleAddTrackingNumber = () => {
    navigation.navigate('SupplierArrivalAddTrackingScreen', {
      supplierArrivalLine,
      supplierArrival,
      product,
    });
  };

  return (
    <View style={style}>
      {canCreate && (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.trackingNumberContainer}
          onPress={handleAddTrackingNumber}>
          <Text>{I18n.t('Stock_AddTrackingNumber')}</Text>
          <Icon
            name="plus-lg"
            color={Colors.primaryColor.background}
            size={20}
          />
        </TouchableOpacity>
      )}
      <TrackingNumberSearchBar
        scanKey={trackingScanKey}
        onChange={handleTrackingNumberSelection}
        isFocus
        changeScreenAfter
        product={product}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  trackingNumberContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 10,
    gap: 10,
  },
});

export default SupplierArrivalTrackingNumberSelect;
