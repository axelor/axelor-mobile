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
import {StyleSheet} from 'react-native';
import {
  ObjectCard,
  checkNullString,
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
    <ObjectCard
      onPress={onPress}
      showArrow={true}
      style={[borderStyle, style]}
      lowerTexts={{
        items: [
          {displayText: productName, isTitle: true},
          {
            displayText: `${parseFloat(currentQty.toString()).toFixed(
              2,
            )} ${unit}`,
            indicatorText: `${I18n.t('Stock_DatabaseQty')} :`,
          },
          {
            displayText: `${parseFloat(realQty.toString()).toFixed(2)} ${unit}`,
            indicatorText: `${I18n.t('Stock_PhysicalQty')} :`,
          },
          {
            displayText: locker,
            indicatorText: `${I18n.t('Stock_Locker')} :`,
            hideIf: checkNullString(locker),
            iconName: 'map-marker-alt',
          },
          {
            displayText: trackingNumber?.trackingNumberSeq,
            indicatorText: `${I18n.t('Stock_TrackingNumber')} :`,
            hideIf: trackingNumber?.trackingNumberSeq == null,
            iconName: 'qrcode',
          },
        ],
      }}
    />
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderWidth: 1.5,
      borderColor: color,
    },
  });

export default InventoryLineCard;
