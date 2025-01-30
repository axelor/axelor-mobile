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
  Badge,
  Card,
  LabelText,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface ConsumedProductCardProps {
  style?: any;
  productName: string;
  plannedQty: number;
  consumedQty?: number;
  missingQty?: number;
  availableQty?: number;
  unitName?: string;
  trackingNumber?: string;
  onPress: () => void;
  increment: {addedQty: number; incrementVisible: boolean};
}

const ConsumedProductCard = ({
  style,
  productName,
  plannedQty,
  consumedQty,
  missingQty,
  availableQty,
  unitName,
  trackingNumber = null,
  onPress = () => {},
  increment = {addedQty: 0, incrementVisible: false},
}: ConsumedProductCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    if (missingQty > 0) {
      return getBorderStyles(Colors.errorColor.background)?.border;
    } else if (
      consumedQty == null ||
      consumedQty === 0 ||
      plannedQty > consumedQty
    ) {
      return getBorderStyles(Colors.plannedColor.background)?.border;
    } else {
      return getBorderStyles(Colors.primaryColor.background)?.border;
    }
  }, [Colors, consumedQty, missingQty, plannedQty]);

  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.cardContainer, borderStyle]}>
        <View style={styles.topContainer}>
          <Text style={styles.txtImportant}>{productName}</Text>
          {increment.incrementVisible && (
            <Badge
              title={`+ ${increment.addedQty}`}
              style={styles.badge}
              color={Colors.priorityColor}
              txtStyle={styles.badgeInfos}
            />
          )}
        </View>
        <LabelText
          title={`${I18n.t('Manufacturing_PlannedQty')}:`}
          value={`${parseFloat(plannedQty.toString()).toFixed(2)} ${
            unitName != null ? unitName : ''
          }`}
        />
        <LabelText
          title={`${I18n.t('Manufacturing_ConsumedQty')}:`}
          value={`${
            consumedQty == null
              ? parseFloat('0').toFixed(2)
              : parseFloat(consumedQty.toString()).toFixed(2)
          } ${unitName != null ? unitName : ''}`}
        />
        {trackingNumber != null && (
          <LabelText
            iconName="qrcode"
            title={`${I18n.t('Manufacturing_TrackingNumber')}:`}
            value={trackingNumber}
          />
        )}
        <Badge
          color={
            availableQty > 0
              ? missingQty > 0
                ? Colors.cautionColor
                : Colors.primaryColor
              : Colors.errorColor
          }
          title={
            availableQty > 0
              ? missingQty > 0
                ? I18n.t('Stock_Partially')
                : I18n.t('Stock_Available')
              : I18n.t('Stock_Unavailable')
          }
        />
      </Card>
    </TouchableOpacity>
  );
};

const getBorderStyles = color =>
  StyleSheet.create({
    border: {borderLeftWidth: 7, borderLeftColor: color},
  });

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    margin: 2,
    elevation: 0,
    shadowOpacity: 0,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
  },
  txtImportant: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  badge: {
    height: 20,
    width: 40,
    borderRadius: 30,
  },
  badgeInfos: {
    fontWeight: 'bold',
  },
});

export default ConsumedProductCard;
