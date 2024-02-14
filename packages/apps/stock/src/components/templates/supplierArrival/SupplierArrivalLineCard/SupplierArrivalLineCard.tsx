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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  ObjectCard,
  checkNullString,
  useDigitFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {Dimensions} from 'react-native';

interface SupplierArrivalLineCardProps {
  style?: any;
  productName: string;
  stockLocationName: string;
  askedQty: number;
  deliveredQty: number;
  locker?: string;
  trackingNumber?: {trackingNumberSeq: string};
  onPress: () => void;
}

const SupplierArrivalLineCard = ({
  style,
  productName,
  stockLocationName,
  askedQty,
  deliveredQty,
  locker,
  trackingNumber,
  onPress,
}: SupplierArrivalLineCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();

  const {stock: stockConfig} = useSelector((state: any) => state.appConfig);

  const borderColor = useMemo(() => {
    if (deliveredQty === 0 || deliveredQty == null) {
      return Colors.secondaryColor.background;
    }

    if (deliveredQty < askedQty) {
      return Colors.cautionColor.background;
    }

    return Colors.primaryColor.background;
  }, [Colors, askedQty, deliveredQty]);

  const borderStyle = useMemo(() => {
    return getStyles(borderColor)?.border;
  }, [borderColor]);

  return (
    <ObjectCard
      onPress={onPress}
      style={[borderStyle, style]}
      showArrow={true}
      lowerTexts={{
        items: [
          {displayText: productName, isTitle: true},
          {
            displayText: formatNumber(askedQty),
            indicatorText: `${I18n.t('Stock_AskedQty')} :`,
          },
          {
            displayText: formatNumber(deliveredQty),
            indicatorText: `${I18n.t('Stock_DeliveredQty')} :`,
          },
          {
            displayText: stockLocationName,
            indicatorText: `${I18n.t('Stock_ToStockLocation')} :`,
            hideIf: !stockConfig?.isManageStockLocationOnStockMoveLine,
            iconName: 'warehouse',
            style:
              Dimensions.get('window').width < 350 ? styles.textWidth : null,
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

const styles = StyleSheet.create({
  textWidth: {
    width: '72%',
  },
});

export default SupplierArrivalLineCard;
