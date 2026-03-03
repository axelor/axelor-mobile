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

interface StockCorrectionCardProps {
  style?: any;
  status: number;
  productFullname: string;
  stockLocation: string;
  date: string;
  onPress: () => void;
}

const StockCorrectionCard = ({
  style,
  status,
  productFullname,
  stockLocation,
  date,
  onPress,
}: StockCorrectionCardProps) => {
  const I18n = useTranslator();
  const {StockCorrection} = useTypes();
  const {getItemColor} = useTypeHelpers();

  const borderStyle = useMemo(() => {
    return getStyles(
      getItemColor(StockCorrection?.statusSelect, status)?.background,
    )?.border;
  }, [StockCorrection?.statusSelect, getItemColor, status]);

  const _formatDate = useMemo(() => {
    if (date == null) {
      return null;
    }
    const _date = formatDate(date, I18n.t('Base_DateFormat'));

    if (status === StockCorrection?.statusSelect.Draft) {
      return `${I18n.t('Base_CreatedOn')} ${_date}`;
    }

    return `${I18n.t('Base_ValidatedOn')} ${_date}`;
  }, [I18n, StockCorrection?.statusSelect.Draft, date, status]);

  return (
    <ObjectCard
      onPress={onPress}
      showArrow={true}
      style={[borderStyle, style]}
      lowerTexts={{
        items: [
          {displayText: productFullname, isTitle: true},
          {displayText: stockLocation, style: styles.noBold},
          {
            displayText: _formatDate,
            hideIfNull: true,
            style: [
              styles.noBold,
              status === StockCorrection?.statusSelect.Draft
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
  creationDate: {
    fontStyle: 'italic',
  },
  noBold: {
    fontWeight: null,
  },
});

export default StockCorrectionCard;
