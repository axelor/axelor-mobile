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

interface LogisticalFormCardProps {
  style?: any;
  reference?: string;
  status?: number;
  carrier?: string;
  stockLocation?: string;
  collectionDate?: string;
  onPress?: () => void;
}

const LogisticalFormCard = ({
  style,
  reference,
  status,
  carrier,
  stockLocation,
  collectionDate,
  onPress,
}: LogisticalFormCardProps) => {
  const I18n = useTranslator();
  const {LogisticalForm} = useTypes();
  const {getItemColor} = useTypeHelpers();

  const borderStyle = useMemo(() => {
    if (status == null) {
      return null;
    }

    const color = getItemColor(
      LogisticalForm?.statusSelect,
      status,
    )?.background;
    return color ? getStyles(color).border : null;
  }, [LogisticalForm?.statusSelect, getItemColor, status]);

  const formattedDate = useMemo(() => {
    if (!collectionDate) return null;

    return formatDate(collectionDate, I18n.t('Base_DateFormat'));
  }, [I18n, collectionDate]);

  return (
    <ObjectCard
      onPress={onPress}
      style={[borderStyle, style]}
      lowerTexts={{
        items: [
          {displayText: reference, isTitle: true},
          {
            displayText: carrier,
            iconName: 'truck',
            hideIf: carrier == null,
            indicatorText: I18n.t('Stock_Carrier'),
          },
          {
            displayText: stockLocation,
            iconName: 'geo-alt-fill',
            hideIf: stockLocation == null,
            indicatorText: I18n.t('Stock_StockLocation'),
          },
          {
            displayText: formattedDate,
            hideIf: formattedDate == null,
            iconName: 'calendar-event',
            indicatorText: `${I18n.t('Stock_CollectionDate')} :`,
          },
        ],
      }}
    />
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

export default LogisticalFormCard;
