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
import {StyleSheet, View} from 'react-native';
import {
  useTranslator,
  useNavigation,
  usePermitted,
} from '@axelor/aos-mobile-core';
import {Text, useThemeColor, Icon} from '@axelor/aos-mobile-ui';
import TrackingNumberSearchBar from '../../TrackingNumberSearchBar/TrackingNumberSearchBar';

const trackingScanKey = 'tracking_supplier-arrival-select';

const SupplierArrivalTrackingNumberSelect = ({
  product,
  supplierArrivalLine,
  supplierArrival,
  setVisible,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
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

  const handleTrackingNumberSelection = item => {
    if (item !== null) {
      if (
        supplierArrivalLine != null &&
        item.id !== supplierArrivalLine.trackingNumber?.id
      ) {
        setVisible(true);
      } else {
        navigation.navigate('SupplierArrivalLineDetailScreen', {
          supplierArrivalLineId: supplierArrivalLine?.id,
          supplierArrival: supplierArrival,
          productId: product?.id,
          trackingNumber: item,
        });
      }
    }
  };

  return (
    <View>
      {canCreate && (
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
            onPress={handleAddTrackingNumber}
          />
        </View>
      )}
      <TrackingNumberSearchBar
        scanKey={trackingScanKey}
        onChange={handleTrackingNumberSelection}
        isFocus={true}
        changeScreenAfter={true}
        product={product}
      />
    </View>
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

export default SupplierArrivalTrackingNumberSelect;
