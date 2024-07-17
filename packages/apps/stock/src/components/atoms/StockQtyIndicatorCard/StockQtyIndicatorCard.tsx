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
  DateDisplay,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  ObjectCard,
  TextUnit,
  useDigitFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {StockIndicator} from '../../../types';

interface RealQtyIndicatorCardProps {
  style?: any;
  indicatorType: number;
  name: string;
  stockMove: any;
  realQty: number;
  qty: number;
  reservedQty: number;
  unit: any;
  trackingNumber: any;
  qtyInvoiced: number;
  onPress: () => void;
}

const RealQtyIndicatorCard = ({
  style,
  indicatorType,
  name,
  stockMove,
  realQty,
  qty,
  reservedQty,
  unit,
  trackingNumber,
  qtyInvoiced,
  onPress,
}: RealQtyIndicatorCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {StockMove} = useTypes();
  const {getItemTitle} = useTypeHelpers();
  const formatNumber = useDigitFormat();

  const date = useMemo(
    () => stockMove?.realDate ?? stockMove?.estimatedDate,
    [stockMove],
  );

  const quantity = useMemo(() => {
    if (indicatorType === StockIndicator.type.RealQty) {
      return realQty;
    } else if (indicatorType === StockIndicator.type.FutureQty) {
      return qty;
    } else {
      reservedQty;
    }
  }, [indicatorType, qty, realQty, reservedQty]);

  const status = useMemo(
    () =>
      StockIndicator.getStockMoveLineInvoicedBadge(
        qtyInvoiced,
        realQty,
        I18n,
        Colors,
      ),
    [Colors, I18n, qtyInvoiced, realQty],
  );

  return (
    <View style={style}>
      <ObjectCard
        style={styles.container}
        leftContainerFlex={2}
        iconLeftMargin={5}
        onPress={onPress}
        upperTexts={{
          items: [
            {displayText: name, isTitle: true},
            {
              indicatorText: I18n.t('Stock_Type'),
              displayText: getItemTitle(
                StockMove?.typeSelect,
                stockMove?.typeSelect,
              ),
              numberOfLines: 2,
            },
            {customComponent: <DateDisplay date={date} size={14} />},
            {
              iconName: 'house-down',
              indicatorText: stockMove?.fromStockLocation,
              hideIfNull: true,
            },
            {
              iconName: 'house-up',
              indicatorText: stockMove?.toStockLocation,
              hideIfNull: true,
            },
            {displayText: trackingNumber?.trackingNumberSeq, hideIfNull: true},
          ],
        }}
        sideBadges={{
          items: [
            {
              customComponent: (
                <TextUnit value={formatNumber(quantity)} unit={unit?.name} />
              ),
            },
            {
              displayText: status?.title,
              color: status?.color,
            },
          ],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 2,
    paddingRight: 5,
  },
});

export default RealQtyIndicatorCard;
