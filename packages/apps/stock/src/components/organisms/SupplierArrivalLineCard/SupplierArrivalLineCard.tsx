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

import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Card,
  Icon,
  LabelText,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {checkNullString, useTranslator} from '@axelor/aos-mobile-core';

interface SupplierArrivalLineCardProps {
  style?: any;
  productName: string;
  askedQty: number;
  deliveredQty: number;
  locker?: string;
  trackingNumber?: {trackingNumberSeq: string};
  onPress: () => void;
}

const SupplierArrivalLineCard = ({
  style,
  productName,
  askedQty,
  deliveredQty,
  locker,
  trackingNumber,
  onPress,
}: SupplierArrivalLineCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    if (askedQty <= deliveredQty) {
      return getStyles(Colors.primaryColor.background)?.border;
    } else {
      return getStyles(Colors.cautionColor.background)?.border;
    }
  }, [Colors, askedQty, deliveredQty]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.txtImportant}>{productName}</Text>
          <LabelText
            title={`${I18n.t('Stock_AskedQty')} :`}
            value={parseFloat(askedQty.toString()).toFixed(2)}
          />
          <LabelText
            title={`${I18n.t('Stock_DeliveredQty')} :`}
            value={parseFloat(deliveredQty.toString()).toFixed(2)}
          />
          {checkNullString(locker) === false && (
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
            />
          )}
        </View>
        <View style={styles.rightContainer}>
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor.background_light}
            size={20}
          />
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
  },
  textContainer: {
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  txtImportant: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightContainer: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SupplierArrivalLineCard;
