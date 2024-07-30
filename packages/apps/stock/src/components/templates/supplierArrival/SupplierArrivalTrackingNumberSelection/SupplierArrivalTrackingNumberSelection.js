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
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import TrackingNumberSearchBar from '../../TrackingNumberSearchBar/TrackingNumberSearchBar';

const SupplierArrivalTrackingNumberSelection = ({
  onSelectTrackingNumber,
  onAddTrackingNumber,
  product,
  readonly,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const trackingScanKey = 'tracking_supplier-arrival-select';

  return (
    <>
      <TouchableOpacity
        style={styles.trackingNumberContainer}
        onPress={onAddTrackingNumber}
        disabled={readonly}>
        <Text style={styles.text_secondary}>
          {I18n.t('Stock_AddTrackingNumber')}
        </Text>
        <Icon
          name="plus-lg"
          color={Colors.primaryColor.background}
          size={24}
          style={styles.action}
          touchable={true}
          onPress={onAddTrackingNumber}
        />
      </TouchableOpacity>
      <TrackingNumberSearchBar
        scanKey={trackingScanKey}
        onChange={onSelectTrackingNumber}
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
    marginHorizontal: 24,
    marginTop: 10,
  },
  text_secondary: {
    fontSize: 14,
  },
  action: {
    marginLeft: 10,
  },
});

export default SupplierArrivalTrackingNumberSelection;
