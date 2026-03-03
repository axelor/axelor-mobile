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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';
import {ObjectCard, useDigitFormat, useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchStockMoveStatus} from '../../../api';

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
  stockMoveLineId: number;
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
  stockMoveLineId,
}: ConsumedProductCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();
  const {StockMove} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const [stockMoveStatus, setStockMoveStatus] = useState(null);

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
      return getBorderStyles(Colors.successColor.background)?.border;
    }
  }, [Colors, consumedQty, missingQty, plannedQty]);

  useEffect(() => {
    (async () => {
      const res = await fetchStockMoveStatus({stockMoveLineId});
      setStockMoveStatus(res.data.data[0]?.stockMove?.statusSelect);
    })();
  }, [stockMoveLineId]);

  return (
    <View style={style}>
      <ObjectCard
        onPress={onPress}
        style={borderStyle}
        showArrow={false}
        upperTexts={{
          items: [
            {isTitle: true, displayText: productName},
            {
              indicatorText: `${I18n.t('Manufacturing_PlannedQty')}:`,
              displayText: `${formatNumber(plannedQty)} ${
                unitName != null ? unitName : ''
              }`,
            },
            {
              indicatorText: `${I18n.t('Manufacturing_ConsumedQty')}:`,
              displayText: `${formatNumber(consumedQty)} ${
                unitName != null ? unitName : ''
              }`,
            },
            {
              indicatorText: `${I18n.t('Stock_AvailableQty')}`,
              displayText: `${formatNumber(availableQty)} ${
                unitName != null ? unitName : ''
              }`,
              iconName: 'house-gear-fill',
            },
            {
              iconName: 'qr-code',
              displayText: trackingNumber,
              indicatorText: `${I18n.t('Manufacturing_TrackingNumber')}:`,
              hideIf: trackingNumber == null,
            },
          ],
        }}
        lowerBadges={{
          items: [
            {
              showIf: increment.incrementVisible,
              displayText: `+ ${increment.addedQty}`,
              color: Colors.priorityColor,
            },
            {
              displayText:
                availableQty > 0
                  ? missingQty > 0
                    ? I18n.t('Stock_Partially')
                    : I18n.t('Stock_Available')
                  : I18n.t('Stock_Unavailable'),
              color:
                availableQty > 0
                  ? missingQty > 0
                    ? Colors.cautionColor
                    : Colors.successColor
                  : Colors.errorColor,
            },
            {
              displayText: getItemTitle(
                StockMove?.statusSelect,
                stockMoveStatus,
              ),
              color: getItemColor(StockMove?.statusSelect, stockMoveStatus),
            },
          ],
        }}
      />
    </View>
  );
};

const getBorderStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
      marginHorizontal: 2,
      marginVertical: 2,
    },
  });

export default ConsumedProductCard;
