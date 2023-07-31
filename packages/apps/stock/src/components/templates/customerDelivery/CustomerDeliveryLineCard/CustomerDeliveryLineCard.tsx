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
  checkNullString,
  ObjectCard,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import StockMove from '../../../../types/stock-move';

interface CustomerDeliveryLineCardProps {
  style?: any;
  productName: string;
  stockLocationName: string;
  askedQty: number;
  pickedQty: number;
  locker?: string;
  availability: number;
  trackingNumber?: {trackingNumberSeq: string};
  onPress: () => void;
}

const CustomerDeliveryLineCard = ({
  style,
  productName,
  stockLocationName,
  askedQty,
  pickedQty,
  locker,
  availability,
  trackingNumber,
  onPress,
}: CustomerDeliveryLineCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {stockConfig} = useSelector((state: any) => state.stockAppConfig);

  const borderColor = useMemo(() => {
    if (pickedQty === 0 || pickedQty == null) {
      return Colors.secondaryColor.background;
    }

    if (pickedQty < askedQty) {
      return Colors.cautionColor.background;
    }

    return Colors.primaryColor.background;
  }, [Colors, askedQty, pickedQty]);

  const borderStyle = useMemo(() => {
    return getStyles(borderColor)?.border;
  }, [borderColor]);

  return (
    <ObjectCard
      onPress={onPress}
      showArrow={true}
      style={[borderStyle, style]}
      lowerTexts={{
        items: [
          {displayText: productName, isTitle: true},
          {
            displayText: parseFloat(askedQty.toString()).toFixed(2),
            indicatorText: `${I18n.t('Stock_AskedQty')} :`,
          },
          {
            displayText: parseFloat(pickedQty.toString()).toFixed(2),
            indicatorText: `${I18n.t('Stock_PickedQty')} :`,
          },
          {
            displayText: stockLocationName,
            indicatorText: `${I18n.t('Stock_FromStockLocation')} :`,
            hideIf: !stockConfig?.isManageStockLocationOnStockMoveLine,
            iconName: 'warehouse',
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
      sideBadges={
        availability == null
          ? null
          : {
              items: [
                {
                  displayText: StockMove.getAvailability(availability, I18n),
                  color: StockMove.getAvailabilityColor(availability, Colors),
                },
              ],
            }
      }
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

export default CustomerDeliveryLineCard;
