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
import {Dimensions, StyleSheet} from 'react-native';
import {
  ObjectCard,
  checkNullString,
  useDigitFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {useMassIndicatorChecker} from '../../../../providers';

interface SupplierArrivalLineCardProps {
  style?: any;
  productName: string;
  stockLocationName: string;
  askedQty: number;
  deliveredQty: number;
  locker?: string;
  trackingNumber?: {trackingNumberSeq: string};
  totalNetMass?: string;
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
  totalNetMass,
  onPress,
}: SupplierArrivalLineCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();
  const {getMassIndicator, massUnitLabel} = useMassIndicatorChecker();

  const {stock: stockConfig} = useSelector((state: any) => state.appConfig);

  const borderColor = useMemo(() => {
    if (deliveredQty === 0 || deliveredQty == null) {
      return Colors.secondaryColor.background;
    }

    if (deliveredQty < askedQty) {
      return Colors.cautionColor.background;
    }

    return Colors.successColor.background;
  }, [Colors, askedQty, deliveredQty]);

  const borderStyle = useMemo(() => {
    return getStyles(borderColor)?.border;
  }, [borderColor]);

  const massIndicator = useMemo(
    () => getMassIndicator(totalNetMass),
    [getMassIndicator, totalNetMass],
  );

  return (
    <ObjectCard
      onPress={onPress}
      style={[borderStyle, styles.card, style]}
      showArrow={true}
      lowerTexts={{
        items: [
          {displayText: productName, isTitle: true, fontSize: 16},
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
            iconName: 'house-up',
            style:
              Dimensions.get('window').width < 350 ? styles.textWidth : null,
            numberOfLines: 2,
          },
          {
            displayText: locker,
            indicatorText: `${I18n.t('Stock_Locker')} :`,
            hideIf: checkNullString(locker),
            iconName: 'geo-alt-fill',
          },
          {
            displayText: trackingNumber?.trackingNumberSeq,
            indicatorText: `${I18n.t('Stock_TrackingNumber')} :`,
            hideIf: trackingNumber?.trackingNumberSeq == null,
            iconName: 'qr-code',
          },
          {
            displayText: `${totalNetMass} ${massUnitLabel ?? ''}`,
            indicatorText: `${I18n.t('Stock_TotalMass')} :`,
            iconName: massIndicator?.icon ?? 'box-seam-fill',
            hideIf: totalNetMass == null,
            color: massIndicator?.color?.background,
          },
        ],
      }}
    />
  );
};

const getStyles = (color: string) =>
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
  card: {
    marginVertical: 2,
    marginHorizontal: 2,
    paddingRight: 5,
  },
});

export default SupplierArrivalLineCard;
