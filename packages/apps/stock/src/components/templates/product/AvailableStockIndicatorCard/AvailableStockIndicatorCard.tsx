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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {ObjectCard, useDigitFormat, useThemeColor} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';

interface AvailableStockIndicatorCardProps {
  stockLocation: any;
  unit: any;
  currentQty: number;
  futureQty: number;
  reservedQty: number;
  availableStock: number;
}

const AvailableStockIndicatorCard = ({
  stockLocation,
  unit,
  currentQty,
  futureQty,
  reservedQty,
  availableStock,
}: AvailableStockIndicatorCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();

  const {supplychain: supplychainConfig} = useSelector(
    state => state.appConfig,
  );

  const borderStyle = useMemo(() => {
    const _color =
      availableStock == null
        ? Colors.secondaryColor
        : availableStock > 0
        ? Colors.successColor
        : Colors.errorColor;

    return getStyles(_color.background).container;
  }, [Colors, availableStock]);

  const formatQty = useCallback(
    (_qty, titleKey) => {
      return {
        displayText: `${formatNumber(_qty)} ${unit?.name}`,
        indicatorText: `${I18n.t(titleKey)} :`,
        hideIf: _qty == null,
      };
    },
    [I18n, formatNumber, unit?.name],
  );

  return (
    <ObjectCard
      touchable={false}
      showArrow={false}
      style={borderStyle}
      lowerTexts={{
        items: [
          {
            displayText: stockLocation?.name,
            iconName: 'house',
            style: styles.title,
          },
          {...formatQty(currentQty, 'Stock_RealQty')},
          {...formatQty(futureQty, 'Stock_FutureQty')},
          {
            ...formatQty(reservedQty, 'Stock_AllocatedQty'),
            iconName: 'user-tag',
            hideIf:
              reservedQty == null || !supplychainConfig?.manageStockReservation,
          },
        ],
      }}
      sideBadges={
        availableStock == null || availableStock > 0
          ? {
              items: [
                {
                  displayText:
                    availableStock == null
                      ? I18n.t('Stock_Calculing')
                      : `${availableStock} ${unit?.name}`,
                  color:
                    availableStock == null
                      ? Colors.secondaryColor
                      : Colors.successColor,
                },
              ],
            }
          : null
      }
    />
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    container: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
});

export default AvailableStockIndicatorCard;
