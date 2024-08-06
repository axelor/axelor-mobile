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

import React from 'react';
import {
  useNavigation,
  usePermitted,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import TrackingNumberSearchBar from '../../TrackingNumberSearchBar/TrackingNumberSearchBar';
import {StyleSheet, TouchableOpacity} from 'react-native';

const trackingScanKey = 'tracking_supplier-arrival-select';

const SupplierArrivalTrackingNumberSelect = ({
  product,
  supplierArrivalLine,
  supplierArrival,
  readonly,
  handleTrackingNumberSelection,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const navigation = useNavigation();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.TrackingNumber',
  });

  const handleAddTrackingNumber = () => {
    navigation.navigate('SupplierArrivalAddTrackingScreen', {
      supplierArrivalLine: supplierArrivalLine,
      supplierArrival: supplierArrival,
      product: product,
    });
  };

  return (
    <>
      {canCreate && (
        <TouchableOpacity
          style={styles.trackingNumberContainer}
          onPress={handleAddTrackingNumber}
          disabled={readonly}>
          <Text style={styles.text}>{I18n.t('Stock_AddTrackingNumber')}</Text>
          <Icon
            name="plus-lg"
            color={Colors.primaryColor.background}
            size={24}
            style={styles.action}
            touchable={true}
          />
        </TouchableOpacity>
      )}
      <TrackingNumberSearchBar
        scanKey={trackingScanKey}
        onChange={handleTrackingNumberSelection}
        isFocus={true}
        changeScreenAfter={true}
        product={product}
      />
    </>
  );
};

const styles = StyleSheet.create({
  trackingNumberContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 10,
  },
  text: {
    fontSize: 14,
  },
  action: {
    marginLeft: 10,
  },
});

export default SupplierArrivalTrackingNumberSelect;
