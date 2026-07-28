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
import {StyleSheet} from 'react-native';
import {ObjectCard} from '@axelor/aos-mobile-ui';
import {
  formatDate,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {StockMove as StockMoveType} from '../../../../types';

interface SupplierArrivalCardProps {
  style?: any;
  stockMoveSeq: string;
  statusSelect: number;
  partner: any;
  origin: string;
  [key: string]: any;
  onPress: () => void;
}

const SupplierArrivalCard = ({
  style,
  stockMoveSeq,
  statusSelect,
  partner,
  origin,
  onPress,
  ...props
}: SupplierArrivalCardProps) => {
  const I18n = useTranslator();
  const {StockMove} = useTypes();
  const {getItemColor} = useTypeHelpers();

  const _formatDate = useMemo(() => {
    const date = StockMoveType.getStockMoveDate(statusSelect, props);
    if (date == null) return undefined;
    const _date = formatDate(date, I18n.t('Base_DateFormat'));

    if (statusSelect === StockMove?.statusSelect.Planned) {
      return `${I18n.t('Base_PlannedFor')} ${_date}`;
    }

    return `${I18n.t('Base_RealizedOn')} ${_date}`;
  }, [I18n, StockMove?.statusSelect.Planned, props, statusSelect]);

  return (
    <ObjectCard
      style={style}
      onPress={onPress}
      showArrow={false}
      leftContainerFlex={2}
      borderLeftColor={
        getItemColor(StockMove?.statusSelect, statusSelect)?.background
      }
      lowerTexts={{
        items: [
          {displayText: stockMoveSeq, isTitle: true},
          {displayText: partner?.fullName, hideIfNull: true},
          {
            displayText: origin,
            iconName: 'tag-fill',
            hideIfNull: true,
          },
          {
            displayText: _formatDate,
            hideIfNull: true,
            style:
              statusSelect === StockMove?.statusSelect.Planned
                ? styles.creationDate
                : null,
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  creationDate: {
    fontStyle: 'italic',
  },
});

export default SupplierArrivalCard;
