/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {StyleSheet, View} from 'react-native';
import {
  checkNullString,
  Icon,
  ObjectCard,
  Text,
  useDigitFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {useStockLinesCheckQty} from '../../../../hooks';
import {useMassIndicatorChecker} from '../../../../providers';

interface InternalMoveLineCardProps {
  style?: any;
  internalMoveStatus: number;
  productName: string;
  availability: number;
  stockMoveLineId: number;
  trackingNumber: string;
  fromStockLocation: string;
  toStockLocation: string;
  locker: string;
  expectedQty: number;
  movedQty: number;
  totalNetMass?: string;
  onPress: () => void;
}

const InternalMoveLineCard = ({
  style,
  internalMoveStatus,
  productName,
  availability,
  stockMoveLineId,
  trackingNumber,
  fromStockLocation,
  toStockLocation,
  locker,
  expectedQty,
  movedQty,
  totalNetMass,
  onPress,
}: InternalMoveLineCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();
  const {StockMove} = useTypes();
  const {getItemColor} = useTypeHelpers();
  const {getMassIndicator, massUnitLabel} = useMassIndicatorChecker();

  const {stock: stockConfig} = useSelector((state: any) => state.appConfig);

  const checkQtyObject = useStockLinesCheckQty(stockMoveLineId);

  const borderColor = useMemo(() => {
    if (movedQty === 0 || movedQty == null) {
      return Colors.secondaryColor.background;
    }

    if (movedQty < expectedQty) {
      return Colors.cautionColor.background;
    }

    return Colors.successColor.background;
  }, [Colors, expectedQty, movedQty]);

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
      showArrow={true}
      style={[borderStyle, style]}
      lowerTexts={{
        items: [
          {displayText: productName, isTitle: true, fontSize: 16},
          {
            displayText: formatNumber(expectedQty),
            indicatorText: `${I18n.t('Stock_AskedQty')} :`,
          },
          {
            displayText: formatNumber(movedQty),
            indicatorText: `${I18n.t('Stock_MovedQty')} :`,
          },
          {
            hideIf: !stockConfig?.isManageStockLocationOnStockMoveLine,
            customComponent: (
              <View style={styles.locations}>
                <Text numberOfLines={1}>{fromStockLocation ?? '-'}</Text>
                <Icon name="arrow-right" size={14} style={styles.icon} />
                <Text numberOfLines={1}>{toStockLocation ?? '-'}</Text>
              </View>
            ),
          },
          {
            displayText: locker,
            indicatorText: `${I18n.t('Stock_Locker')} :`,
            hideIf: checkNullString(locker),
            iconName: 'geo-alt-fill',
          },
          {
            displayText: trackingNumber,
            indicatorText: `${I18n.t('Stock_TrackingNumber')} :`,
            hideIf: trackingNumber == null,
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
      upperBadges={{
        fixedOnRightSide: true,
        items: [
          {
            displayText: checkQtyObject?.availability,
            color: getItemColor(StockMove?.availableStatusSelect, availability),
            showIf:
              checkQtyObject?.availability &&
              availability != null &&
              availability > 0 &&
              internalMoveStatus < StockMove?.statusSelect.Realized,
          },
          {
            displayText: formatNumber(checkQtyObject?.missingQty),
            color: Colors.errorColor,
            showIf: Number(checkQtyObject?.missingQty ?? 0) !== 0,
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
      paddingRight: 5,
      marginVertical: 2,
      marginHorizontal: 2,
      paddingTop: 5,
    },
  });

const styles = StyleSheet.create({
  locations: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
  },
  icon: {
    marginHorizontal: 2,
  },
});

export default InternalMoveLineCard;
