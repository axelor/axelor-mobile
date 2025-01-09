/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Card,
  Icon,
  LabelText,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface InventoryLineCardProps {
  style?: any;
  productName: string;
  currentQty: number;
  realQty: number;
  unit: string;
  trackingNumber?: {trackingNumberSeq: string};
  locker?: string;
  onPress: () => void;
}

const InventoryLineCard = ({
  style,
  productName,
  currentQty,
  realQty,
  unit,
  trackingNumber,
  locker,
  onPress,
}: InventoryLineCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    if (realQty == null) {
      return getStyles(Colors.secondaryColor.background)?.border;
    } else if (currentQty === realQty) {
      return getStyles(Colors.primaryColor.background)?.border;
    } else {
      return getStyles(Colors.cautionColor.background)?.border;
    }
  }, [Colors, currentQty, realQty]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.txtImportant}>{productName}</Text>
          <LabelText
            title={`${I18n.t('Stock_DatabaseQty')} :`}
            value={`${parseFloat(currentQty.toString()).toFixed(2)} ${unit}`}
          />
          {realQty && (
            <LabelText
              title={`${I18n.t('Stock_PhysicalQty')} :`}
              value={`${parseFloat(realQty.toString()).toFixed(2)} ${unit}`}
            />
          )}
          {locker != null && (
            <LabelText
              title={`${I18n.t('Stock_Locker')} :`}
              value={locker}
              iconName="map-marker-alt"
            />
          )}
          {trackingNumber != null && (
            <LabelText
              title={`${I18n.t('Stock_TrackingNumber')} :`}
              value={trackingNumber?.trackingNumberSeq}
              iconName="qrcode"
              FontAwesome5={false}
            />
          )}
        </View>
        <Icon
          name="chevron-right"
          color={Colors.secondaryColor.background_light}
          size={20}
        />
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderWidth: 1.5,
      borderColor: color,
    },
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: '2%',
    paddingRight: 8,
  },
  textContainer: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  txtImportant: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InventoryLineCard;
