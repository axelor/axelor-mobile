/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {formatDate, useTranslator} from '@axelor/aos-mobile-core';
import Inventory from '../../../../types/inventory';

interface InventoryCardProps {
  style?: any;
  reference: string;
  status: number;
  date: string;
  stockLocation?: string;
  onPress: () => void;
}

const InventoryCard = ({
  style,
  reference,
  status,
  date,
  stockLocation,
  onPress,
}: InventoryCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    return getStyles(Inventory.getStatusColor(status, Colors).background)
      ?.border;
  }, [Colors, status]);

  const _formatDate = useMemo(() => {
    if (date == null) {
      return null;
    }
    const _date = formatDate(date, I18n.t('Base_DateFormat'));

    if (status === Inventory.status.Planned) {
      return `${I18n.t('Base_PlannedFor')} ${_date}`;
    }

    if (status === Inventory.status.InProgress) {
      return `${I18n.t('Base_StartedOn')} ${_date}`;
    }

    if (status === Inventory.status.Completed) {
      return `${I18n.t('Base_CompletedOn')} ${_date}`;
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
          {displayText: stockLocation, style: styles.noBold, hideIfNull: true},
          {
            displayText: _formatDate,
            style: [
              styles.noBold,
              status === Inventory.status.Planned ||
              status === Inventory.status.InProgress
                ? styles.date
                : null,
            ],
            hideIfNull: true,
          },
        ],
      }}
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

export default InventoryCard;
