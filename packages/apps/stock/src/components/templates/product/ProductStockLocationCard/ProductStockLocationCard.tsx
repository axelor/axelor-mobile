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
import {StyleSheet} from 'react-native';
import {ObjectCard, useDigitFormat, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface ProductStockLocationCardProps {
  stockLocationName: string;
  unit: string;
  realQty: number;
  futureQty: number;
  reservedQty: number;
  availability: number;
}

const ProductStockLocationCard = ({
  stockLocationName,
  unit,
  realQty,
  futureQty,
  reservedQty,
  availability,
}: ProductStockLocationCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();

  const borderStyle = useMemo(() => {
    if (availability == null) {
      return getStyles(Colors.secondaryColor.background).container;
    } else if (availability > 0) {
      return getStyles(Colors.successColor.background).container;
    } else {
      return getStyles(Colors.errorColor.background).container;
    }
  }, [Colors, availability]);

  return (
    <ObjectCard
      touchable={false}
      showArrow={false}
      style={borderStyle}
      lowerTexts={{
        items: [
          {
            displayText: stockLocationName,
            iconName: 'house',
            style: styles.title,
          },
          {
            displayText: `${formatNumber(realQty)} ${unit}`,
            indicatorText: `${I18n.t('Stock_RealQty')} :`,
          },
          {
            displayText: `${formatNumber(futureQty)} ${unit}`,
            indicatorText: `${I18n.t('Stock_FutureQty')} :`,
          },
          {
            displayText: `${formatNumber(reservedQty)} ${unit}`,
            hideIf: !reservedQty,
            indicatorText: `${I18n.t('Stock_AllocatedQty')} :`,
            iconName: 'user-tag',
          },
        ],
      }}
      sideBadges={
        availability == null || availability > 0
          ? {
              items: [
                {
                  displayText:
                    availability == null
                      ? `${I18n.t('Stock_Calculing')}...`
                      : `${availability} ${unit}`,
                  color:
                    availability == null
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

const getStyles = color =>
  StyleSheet.create({
    container: {
      marginHorizontal: 11,
      marginBottom: 8,
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
});

export default ProductStockLocationCard;
