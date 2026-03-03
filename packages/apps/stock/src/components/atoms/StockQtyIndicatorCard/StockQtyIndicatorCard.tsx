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
import {
  DateDisplay,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {ObjectCard, TextUnit, useDigitFormat} from '@axelor/aos-mobile-ui';
import {StockIndicator} from '../../../types';

interface RealQtyIndicatorCardProps {
  style?: any;
  indicatorType: number;
  name: string;
  statusSelect?: number;
  stockMove: any;
  realQty: number;
  qty: number;
  reservedQty: number;
  unit: any;
  trackingNumber: any;
  onPress: () => void;
}

const RealQtyIndicatorCard = ({
  style,
  indicatorType,
  name,
  statusSelect,
  stockMove,
  realQty,
  qty,
  reservedQty,
  unit,
  trackingNumber,
  onPress,
}: RealQtyIndicatorCardProps) => {
  const I18n = useTranslator();
  const {StockMove} = useTypes();
  const {getItemTitle, getItemColor} = useTypeHelpers();
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
      return reservedQty;
    }
  }, [indicatorType, qty, realQty, reservedQty]);

  return (
    <ObjectCard
      style={style}
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
          {customComponent: <DateDisplay date={date} size={14} displayYear />},
          {
            iconName: 'house-down',
            indicatorText: stockMove?.fromStockLocation?.name,
            hideIfNull: true,
          },
          {
            iconName: 'house-up',
            indicatorText: stockMove?.toStockLocation?.name,
            hideIfNull: true,
          },
          {displayText: trackingNumber?.trackingNumberSeq, hideIfNull: true},
        ],
      }}
      sideBadges={{
        items: [
          {
            customComponent: (
              <TextUnit
                value={formatNumber(quantity)}
                unit={unit?.name}
                fontSize={18}
              />
            ),
          },
          {
            displayText: getItemTitle(StockMove.statusSelect, statusSelect),
            color: getItemColor(StockMove.statusSelect, statusSelect),
          },
        ],
      }}
    />
  );
};

export default RealQtyIndicatorCard;
