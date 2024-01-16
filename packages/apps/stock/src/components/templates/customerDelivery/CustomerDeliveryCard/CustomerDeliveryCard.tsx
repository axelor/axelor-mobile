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
import {StyleSheet} from 'react-native';
import {useThemeColor, ObjectCard} from '@axelor/aos-mobile-ui';
import {formatDate, useTranslator} from '@axelor/aos-mobile-core';
import StockMove from '../../../../types/stock-move';

interface CustomerDeliveryCardProps {
  style?: any;
  reference: string;
  status: number;
  availability: number;
  client: string;
  origin: string;
  date: string;
  onPress: () => void;
}

const CustomerDeliveryCard = ({
  style,
  reference,
  status,
  availability,
  client,
  origin,
  date,
  onPress,
}: CustomerDeliveryCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    return getStyles(StockMove.getStatusColor(status, Colors).background)
      ?.border;
  }, [Colors, status]);

  const _formatDate = useMemo(() => {
    if (date == null) {
      return null;
    }
    const _date = formatDate(date, I18n.t('Base_DateFormat'));

    if (status === StockMove.status.Draft) {
      return `${I18n.t('Base_CreatedOn')} ${_date}`;
    }

    if (status === StockMove.status.Planned) {
      return `${I18n.t('Base_PlannedFor')} ${_date}`;
    }

    return `${I18n.t('Base_ValidatedOn')} ${_date}`;
  }, [I18n, date, status]);

  return (
    <ObjectCard
      onPress={onPress}
      showArrow={true}
      style={[borderStyle, style]}
      lowerTexts={{
        items: [
          {displayText: reference, isTitle: true},
          {displayText: client, hideIfNull: true},
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
              status !== StockMove.status.Realized ? styles.date : null,
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
                  displayText: StockMove.getAvailability(availability, I18n),
                  color: StockMove.getAvailabilityColor(availability, Colors),
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

export default CustomerDeliveryCard;
