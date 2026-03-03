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

interface InternalMoveCardProps {
  style?: any;
  name: string;
  status: number;
  availability: number;
  fromStockLocation: string;
  toStockLocation: string;
  origin: string;
  date: string;
  onPress: () => void;
}

const InternalMoveCard = ({
  style,
  name,
  status,
  availability,
  fromStockLocation,
  toStockLocation,
  origin,
  date,
  onPress,
}: InternalMoveCardProps) => {
  const I18n = useTranslator();
  const {StockMove} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const borderStyle = useMemo(() => {
    return getStyles(getItemColor(StockMove?.statusSelect, status)?.background)
      ?.border;
  }, [StockMove?.statusSelect, getItemColor, status]);

  const _formatDate = useMemo(() => {
    if (date == null) {
      return null;
    }
    const _date = formatDate(date, I18n.t('Base_DateFormat'));

    if (status === StockMove?.statusSelect.Draft) {
      return `${I18n.t('Base_CreatedOn')} ${_date}`;
    }

    if (status === StockMove?.statusSelect.Planned) {
      return `${I18n.t('Base_PlannedFor')} ${_date}`;
    }

    return `${I18n.t('Base_ValidatedOn')} ${_date}`;
  }, [I18n, StockMove?.statusSelect, date, status]);

  return (
    <ObjectCard
      onPress={onPress}
      showArrow={true}
      style={[borderStyle, style]}
      lowerTexts={{
        items: [
          {displayText: name, isTitle: true},
          {displayText: fromStockLocation, style: styles.noBold},
          {displayText: toStockLocation, style: styles.noBold},
          {
            displayText: origin,
            iconName: 'tag-fill',
            style: styles.noBold,
            hideIfNull: true,
          },
          {
            displayText: _formatDate,
            style: [
              styles.noBold,
              status !== StockMove?.statusSelect.Realized ? styles.date : null,
            ],
            hideIfNull: true,
          },
        ],
      }}
      sideBadges={
        availability == null || availability === 0
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
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  noBold: {
    fontWeight: null,
  },
  date: {
    fontStyle: 'italic',
  },
});

export default InternalMoveCard;
