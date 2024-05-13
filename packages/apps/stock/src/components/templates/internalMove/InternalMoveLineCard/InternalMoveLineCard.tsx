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
import {StyleSheet, View} from 'react-native';
import {
  Icon,
  ObjectCard,
  Text,
  checkNullString,
  useDigitFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';

interface InternalMoveLineCardProps {
  style?: any;
  internalMoveStatus: number;
  productName: string;
  availability: number;
  trackingNumber: string;
  fromStockLocation: string;
  toStockLocation: string;
  locker: string;
  expectedQty: number;
  movedQty: number;
  onPress: () => void;
}

const InternalMoveLineCard = ({
  style,
  internalMoveStatus,
  productName,
  availability,
  trackingNumber,
  fromStockLocation,
  toStockLocation,
  locker,
  expectedQty,
  movedQty,
  onPress,
}: InternalMoveLineCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();
  const {StockMove} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const {stock: stockConfig} = useSelector((state: any) => state.appConfig);

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

  const _internalMoveStatus = useMemo(
    () => internalMoveStatus ?? StockMove?.statusSelect.Planned,
    [StockMove?.statusSelect.Planned, internalMoveStatus],
  );

  return (
    <ObjectCard
      onPress={onPress}
      showArrow={true}
      style={[borderStyle, style]}
      lowerTexts={{
        items: [
          {displayText: productName, isTitle: true},
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
        ],
      }}
      sideBadges={
        availability == null ||
        availability === 0 ||
        _internalMoveStatus === StockMove?.statusSelect.Realized
          ? null
          : {
              items: [
                {
                  displayText: getItemTitle(
                    StockMove?.availableStatusSelect,
                    availability,
                  ),
                  color: getItemColor(
                    StockMove?.availableStatusSelect,
                    availability,
                  ),
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
