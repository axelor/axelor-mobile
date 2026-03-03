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

interface SupplierArrivalCardProps {
  style?: any;
  reference: string;
  status: number;
  client: string;
  origin: string;
  date: string;
  onPress: () => void;
}

const SupplierArrivalCard = ({
  style,
  reference,
  status,
  client,
  origin,
  date,
  onPress,
}: SupplierArrivalCardProps) => {
  const I18n = useTranslator();
  const {StockMove} = useTypes();
  const {getItemColor} = useTypeHelpers();

  const borderStyle = useMemo(() => {
    return getStyles(getItemColor(StockMove?.statusSelect, status)?.background)
      ?.border;
  }, [StockMove?.statusSelect, getItemColor, status]);

  const _formatDate = useMemo(() => {
    if (date == null) {
      return null;
    }
    const _date = formatDate(date, I18n.t('Base_DateFormat'));

    if (status === StockMove?.statusSelect.Planned) {
      return `${I18n.t('Base_PlannedFor')} ${_date}`;
    }

    return `${I18n.t('Base_RealizedOn')} ${_date}`;
  }, [I18n, StockMove?.statusSelect, date, status]);

  return (
    <ObjectCard
      onPress={onPress}
      style={[borderStyle, style]}
      showArrow={true}
      lowerTexts={{
        items: [
          {displayText: reference, isTitle: true},
          {displayText: client, style: styles.noBold},
          {
            displayText: origin,
            iconName: 'tag-fill',
            hideIfNull: true,
            style: styles.noBold,
          },
          {
            displayText: _formatDate,
            hideIfNull: true,
            style: [
              styles.noBold,
              status === StockMove?.statusSelect.Planned
                ? styles.creationDate
                : null,
            ],
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
  creationDate: {
    fontStyle: 'italic',
  },
});

export default SupplierArrivalCard;
