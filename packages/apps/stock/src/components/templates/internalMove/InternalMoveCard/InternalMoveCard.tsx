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

interface InternalMoveCardProps {
  style?: any;
  stockMoveSeq: string;
  statusSelect: number;
  availableStatusSelect: number;
  fromStockLocation: any;
  toStockLocation: any;
  origin: string;
  [key: string]: any;
  onPress: () => void;
}

const InternalMoveCard = ({
  style,
  stockMoveSeq,
  statusSelect,
  availableStatusSelect,
  fromStockLocation,
  toStockLocation,
  origin,
  onPress,
  ...props
}: InternalMoveCardProps) => {
  const I18n = useTranslator();
  const {StockMove} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const _formatDate = useMemo(() => {
    const date = StockMoveType.getStockMoveDate(statusSelect, props);
    if (date == null) return undefined;
    const _date = formatDate(date, I18n.t('Base_DateFormat'));

    if (statusSelect === StockMove?.statusSelect.Draft) {
      return `${I18n.t('Base_CreatedOn')} ${_date}`;
    }

    if (statusSelect === StockMove?.statusSelect.Planned) {
      return `${I18n.t('Base_PlannedFor')} ${_date}`;
    }

    return `${I18n.t('Base_ValidatedOn')} ${_date}`;
  }, [
    I18n,
    StockMove?.statusSelect.Draft,
    StockMove?.statusSelect.Planned,
    props,
    statusSelect,
  ]);

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
          {displayText: fromStockLocation?.name},
          {displayText: toStockLocation?.name},
          {
            displayText: origin,
            iconName: 'tag-fill',
            hideIfNull: true,
          },
          {
            displayText: _formatDate,
            style:
              statusSelect !== StockMove?.statusSelect.Realized
                ? styles.date
                : null,
            hideIfNull: true,
          },
        ],
      }}
      sideBadges={
        availableStatusSelect == null || availableStatusSelect === 0
          ? undefined
          : {
              style: styles.badgeContainer,
              items: [
                {
                  displayText: getItemTitle(
                    StockMove?.availableStatusSelect,
                    availableStatusSelect,
                  ),
                  color: getItemColor(
                    StockMove?.availableStatusSelect,
                    availableStatusSelect,
                  ),
                },
              ],
            }
      }
    />
  );
};

const styles = StyleSheet.create({
  date: {
    fontStyle: 'italic',
  },
  badgeContainer: {
    alignItems: 'flex-end',
  },
});

export default InternalMoveCard;
